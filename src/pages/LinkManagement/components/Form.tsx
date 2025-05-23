import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import rules from '@/utils/rules';

interface Props {
	onCreate: (originalUrl: string) => void;
	isModalOpen?: boolean; // Optional prop
	setIsModalOpen?: (open: boolean) => void; // Optional prop
}

const CreateLinkForm: React.FC<Props> = ({ onCreate, isModalOpen, setIsModalOpen }) => {
	const [form] = Form.useForm();

	const handleSubmit = () => {
		form.validateFields().then((values) => {
			onCreate(values);
			form.resetFields();
			if (setIsModalOpen) {
				setIsModalOpen(false);
			}
		});
	};

	const handleCancel = () => {
		form.resetFields();
		if (setIsModalOpen) {
			setIsModalOpen(false);
		}
	};

	return (
		<Modal title='Tạo Link rút gọn' visible={isModalOpen} onCancel={handleCancel} footer={null}>
			<Form form={form} layout='vertical'>
				<Form.Item name='alias' label='Bí danh tùy chỉnh'>
					<Input placeholder='Ví dụ: Link1' />
				</Form.Item>

				<Form.Item name='original_link' label='Nhập link gốc' rules={[...rules.required, ...rules.httpLink]}>
					<Input placeholder='http://localhost:8000/links' />
				</Form.Item>

				<Form.Item>
					<Button type='primary' style={{ width: '100%' }} onClick={handleSubmit}>
						Tạo
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CreateLinkForm;
