import React, { useState } from 'react';
import { Form, Input, Button, Modal, Tooltip } from 'antd';
import rules from '@/utils/rules';
import { CopyOutlined } from '@ant-design/icons';
import { primaryColor } from '@/services/base/constant';
import { useLinkManager } from '@/models/link/link';
import { LinkItem } from '@/services/ManagementLink/typing';

interface Props {
	onCreate: (values: { alias: string; original_link: string }) => Promise<boolean>;
	isModalOpen?: boolean;
	setIsModalOpen?: (open: boolean) => void;
}

const CreateLinkForm: React.FC<Props> = ({ onCreate, isModalOpen, setIsModalOpen }) => {
	const [form] = Form.useForm();
	const [statusShorten, setStatusShorten] = useState<boolean>(false);
	const [resultShorten, setResultShorten] = useState(null);
	const { handleCopy } = useLinkManager();

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			const isCreate = await onCreate(values);
			if (isCreate) {
				setStatusShorten(true);
				setResultShorten(isCreate.shorten_link);
			}
		} catch (error) {
			console.error('Error creating link:', error);
		}
	};

	const handleCancel = () => {
		form.resetFields();
		setStatusShorten(false);
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

				{statusShorten && resultShorten && (
					<Form.Item label='Link rút gọn'>
						<Input
							value={resultShorten}
							status='error'
							readOnly
							addonAfter={
								<Tooltip title='Sao chép'>
									<Button
										icon={<CopyOutlined style={{ color: primaryColor }} />}
										onClick={() => handleCopy(resultShorten)}
										type='text'
										size='small'
									/>
								</Tooltip>
							}
						/>
					</Form.Item>
				)}

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
