import React from 'react';
import { Card, Form, Input, message, Button } from 'antd';
import rules from '@/utils/rules';

const { TextArea } = Input;

const SupportForm: React.FC = () => {
	const [form] = Form.useForm();

	const handleSubmit = (values: any) => {
		// call api
		message.success('Gửi yêu cầu hỗ trợ thành công');
		form.resetFields();
	};

	return (
		<Card title='Gửi yêu cầu hỗ trợ'>
			<Form form={form} layout='vertical' onFinish={handleSubmit}>
				<Form.Item name='full_name' label='Họ và tên' rules={[...rules.required, ...rules.ten]}>
					<Input placeholder='Nguyễn Văn A' />
				</Form.Item>

				<Form.Item name='email' label='Email' rules={[...rules.email, ...rules.text, ...rules.required]}>
					<Input placeholder='nguyenvana@gmail.com'></Input>
				</Form.Item>

				<Form.Item label='Chủ đề ' name='subject' rules={[...rules.required, ...rules.text]}>
					<Input placeholder='Ví dụ: Không thể rút gọn link' />
				</Form.Item>

				<Form.Item label='Mô tả chi tiết' name='description' rules={[...rules.required, ...rules.description]}>
					<TextArea rows={4} placeholder='Mô tả chi tiết vấn đề của bạn' />
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Gửi yêu cầu
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default SupportForm;
