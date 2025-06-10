import { Form, Modal, Input, Switch } from 'antd';
import { resetFieldsForm } from '@/utils/utils';
import { useEffect } from 'react';
import { useModel } from 'umi';
import type { SettingRecord } from '@/models/setting';

interface FormValues extends Omit<SettingRecord, '_id' | 'createdAt' | 'updatedAt' | '__v'> {}

const FormSetting = (props: any) => {
	const [form] = Form.useForm();
	const { record, setVisibleForm, postModel, putModel, formSubmiting, visibleForm } = useModel('setting');
	const title = props?.title ?? 'Setting Form';

	useEffect(() => {
		if (!visibleForm) {
			resetFieldsForm(form);
		} else if (record?._id) {
			form.setFieldsValue({
				...record,
			});
		}
	}, [visibleForm, record]);

	const onFinish = async (values: FormValues) => {
		if (record?._id) {
			await putModel(record._id, values);
		} else {
			await postModel(values);
		}
		setVisibleForm(false);
		form.resetFields();
	};

	return (
		<Modal
			title={title}
			visible={visibleForm}
			onCancel={() => setVisibleForm(false)}
			confirmLoading={formSubmiting}
			onOk={() => form.submit()}
		>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item name='name' label='Key' rules={[{ required: true, message: 'Please input the key!' }]}>
					<Input />
				</Form.Item>

				<Form.Item name='value' label='Value' rules={[{ required: true, message: 'Please input the value!' }]}>
					<Input />
				</Form.Item>

				<Form.Item name='description' label='Description'>
					<Input.TextArea rows={4} />
				</Form.Item>

				<Form.Item name='is_public' label='Public' valuePropName='checked'>
					<Switch />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default FormSetting;
