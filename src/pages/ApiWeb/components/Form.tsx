import TinyEditor from '@/components/TinyEditor';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import TimePicker from '@/components/TimePicker';
import dayjs from 'dayjs';

interface FormValues extends Omit<WebApi.Record, 'max_view' | 'priority'> {
	max_view: number;
	priority: number;
	time_range?: [dayjs.Dayjs, dayjs.Dayjs];
}

const FormApiWeb = (props: any) => {
	const [form] = Form.useForm();
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } = useModel('api_web');
	const title = props?.title ?? '';

	useEffect(() => {
		if (!visibleForm) {
			resetFieldsForm(form);
		} else if (record?._id) {
			// Convert time strings to dayjs objects if they exist
			const formData = {
				...record,
				max_view: Number(record.max_view),
				priority: Number(record.priority),
				time_range:
					record.timer_start && record.timer_end
						? [dayjs(record.timer_start, 'HH:mm:ss'), dayjs(record.timer_end, 'HH:mm:ss')]
						: undefined,
			};
			form.setFieldsValue(formData);
		}
	}, [record?._id, visibleForm]);

	const onFinish = async (values: FormValues) => {
		// Extract time range values
		const [timer_start, timer_end] = values.time_range || [];
		const formData = {
			...values,
			max_view: String(values.max_view),
			priority: String(values.priority),
			timer_start: timer_start?.format('HH:mm:ss'),
			timer_end: timer_end?.format('HH:mm:ss'),
		};
		delete formData.time_range;

		if (edit) {
			putModel(record?._id ?? '', formData)
				.then(() => setVisibleForm(false))
				.catch((er) => console.log(er));
		} else {
			postModel(formData)
				.then(() => {
					form.resetFields();
					setVisibleForm(false);
				})
				.catch((er) => console.log(er));
		}
	};

	return (
		<Card title={(edit ? 'Chỉnh sửa ' : 'Thêm mới ') + title?.toLowerCase()}>
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Form.Item name='api_url' label='API Quick link' rules={[...rules.required, ...rules.urlApiWeb]}>
					<Input placeholder='Đường dẫn API Web' />
				</Form.Item>

				<Form.Item name='max_view' label='Số view tối đa' rules={[...rules.number(99, 1)]} initialValue={10}>
					<Input type='number' placeholder='Số view tối đa' />
				</Form.Item>

				<Form.Item name='priority' label='Mức độ ưu tiên' rules={[...rules.number(99, 1)]} initialValue={1}>
					<Input type='number' placeholder='Mức độ ưu tiên' />
				</Form.Item>

				<Form.Item name='timer' label='Bật/tắt API này' initialValue='off'>
					<Select
						options={[
							{ value: 'on', label: 'Bật' },
							{ value: 'off', label: 'Tắt' },
						]}
					/>
				</Form.Item>

				<Form.Item name='time_range' label='Hẹn giờ bật/tắt API'>
					<TimePicker />
				</Form.Item>

				<Form.Item name='description' label='Mô tả'>
					<TinyEditor height={200} minHeight={140} tinyToolbar={true} />
				</Form.Item>

				<div className='form-footer'>
					<Button loading={formSubmiting} htmlType='submit' type='primary'>
						{!edit ? 'Thêm mới' : 'Lưu lại'}
					</Button>
					<Button onClick={() => setVisibleForm(false)}>Hủy</Button>
				</div>
			</Form>
		</Card>
	);
};

export default FormApiWeb;
