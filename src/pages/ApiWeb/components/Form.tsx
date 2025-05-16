import TinyEditor from '@/components/TinyEditor';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import TimePicker from '@/components/TimePicker';

const FormApiWeb = (props: any) => {
	const [form] = Form.useForm();
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } = useModel('api_web');
	const title = props?.title ?? '';

	useEffect(() => {
		if (!visibleForm) resetFieldsForm(form);
		else if (record?._id) form.setFieldsValue(record);
	}, [record?._id, visibleForm]);

	const onFinish = async (values: ApiWeb.Record) => {
		if (edit) {
			putModel(record?._id ?? '', values)
				.then()
				.catch((er) => console.log(er));
		} else
			postModel(values)
				.then(() => form.resetFields())
				.catch((er) => console.log(er));
	};

	return (
		<Card title={(edit ? 'Chỉnh sửa ' : 'Thêm mới ') + title?.toLowerCase()}>
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Form.Item name='api_url' label='Đường dẫn API Web' rules={[...rules.required, ...rules.urlApiWeb]}>
					<Input placeholder='Đường dẫn API Web' />
				</Form.Item>

				<Form.Item name='max_view' label='Số view tối đa' rules={[...rules.required, ...rules.number(99, 1)]}>
					<Input placeholder='Số view tối đa' />
				</Form.Item>

				<Form.Item name='priority' label='Mức độ ưu tiên' rules={[...rules.required, ...rules.number(99, 1)]}>
					<Input placeholder='Mức độ ưu tiên' />
				</Form.Item>

				<Form.Item name='description' label='Mô tả'>
					<TinyEditor height={200} minHeight={140} tinyToolbar={true}></TinyEditor>
				</Form.Item>

				<Form.Item name='timer' label='Tự động bật/tắt'>
					<Select
						defaultValue={'off'}
						options={[
							{ value: 'on', label: 'Bật' },
							{ value: 'off', label: 'Tắt' },
						]}
					></Select>
				</Form.Item>

				<TimePicker></TimePicker>

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
