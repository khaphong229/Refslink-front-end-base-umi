import TinyEditor from '@/components/TinyEditor';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Form, Input, Select, Radio, TimePicker, Collapse, Switch } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import dayjs from 'dayjs';
import { STATUS } from '@/types/status';
import { COUNTRIES_USES } from '@/constants/contries';
import { isArray } from 'lodash';
import { changeStatus } from '@/services/WebApi';

interface FormValues extends Omit<WebApi.Record, 'max_view' | 'priority'> {
	max_view: number;
	priority: number;
	time_range?: [dayjs.Dayjs, dayjs.Dayjs];
	allowed_domains: string;
	blocked_domains: string;
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
		const [timer_start, timer_end] = values.time_range || [];
		console.log(values, 'val');

		const formData = {
			...values,
			max_view: String(values.max_view),
			priority: String(values.priority),
			timer_start: timer_start?.format('HH:mm:ss'),
			timer_end: timer_end?.format('HH:mm:ss'),
		};

		// Chỉ xử lý blocked_domains nếu nó tồn tại
		if (values.blocked_domains) {
			formData.blocked_domains = !isArray(values.blocked_domains)
				? values.blocked_domains.split(',')
				: values.blocked_domains;
		}

		// Chỉ xử lý allowed_domains nếu nó tồn tại
		if (values.allowed_domains) {
			formData.allowed_domains = !isArray(values.allowed_domains)
				? values.allowed_domains.split(',')
				: values.allowed_domains;
		}
		delete formData.time_range;

		console.log(formData);

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
					<Input placeholder='https://tenmien.com/st?api=XXXXX&url=' />
				</Form.Item>

				<Form.Item name='priority' label='Mức độ ưu tiên' rules={[...rules.number(99, 1)]}>
					<Input type='number' placeholder='Mức độ ưu tiên' />
				</Form.Item>

				<Form.Item name='max_view' label='Số view tối đa' rules={[...rules.number(99, 1)]}>
					<Input type='number' placeholder='Số view tối đa' />
				</Form.Item>

				<Form.Item name='timer' initialValue={false}>
					<Radio.Group>
						<Radio value={true}>Bật hẹn giờ</Radio>
						<Radio value={false}>Tắt hẹn giờ</Radio>
					</Radio.Group>
				</Form.Item>

				<Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.timer !== currentValues.timer}>
					{({ getFieldValue }) =>
						getFieldValue('timer') === true ? (
							<Form.Item name='time_range' label='Thời gian bật/tắt'>
								<TimePicker.RangePicker format='HH:mm:ss' placeholder={['Bắt đầu', 'Kết thúc']} />
							</Form.Item>
						) : null
					}
				</Form.Item>

				<Form.Item name='status' initialValue={STATUS.INACTIVE}>
					<Radio.Group>
						<Radio value={STATUS.ACTIVE}>Bật API</Radio>
						<Radio value={STATUS.INACTIVE}>Tắt API</Radio>
					</Radio.Group>
				</Form.Item>

				<Form.Item name='country_uses' label='Bao gồm quốc gia'>
					<Select
						mode='multiple'
						allowClear
						style={{ width: '100%' }}
						placeholder='Bao gồm các nước'
						defaultValue={['ALL']}
						options={COUNTRIES_USES}
					/>
				</Form.Item>

				<Collapse>
					<Collapse.Panel key='1' header='Cài đặt bảo mật'>
						<Form.Item name='allowed_domains' label='Tên miền được phép'>
							<Input.TextArea placeholder='Nhập các tên miền được phép, mỗi tên miền cách nhau dấu ,' rows={4} />
						</Form.Item>

						<Form.Item name='blocked_domains' label='Tên miền bị chặn'>
							<Input.TextArea placeholder='Nhập các tên miền bị chặn,  mỗi tên miền cách nhau dấu ,' rows={4} />
						</Form.Item>

						<Form.Item name='block_vpn' label='Chặn VPN' valuePropName='checked'>
							<Switch />
						</Form.Item>
					</Collapse.Panel>
				</Collapse>

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
