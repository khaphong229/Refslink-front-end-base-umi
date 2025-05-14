import React from 'react';
import { Card, Form, Input, message, Button } from 'antd';

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
				<Form.Item name='full_name' label='Họ và tên' rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
					<Input placeholder='Nguyễn Văn A' />
				</Form.Item>

				<Form.Item
					name='email'
					label='Email'
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập email',
						},
						{
							type: 'email',
							message: 'Email không đúng định dạng',
						},
					]}
				>
					<Input placeholder='nguyenvana@gmail.com'></Input>
				</Form.Item>

				<Form.Item
					label='Chủ đề '
					name='subject'
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập tiêu đề vấn đề ',
						},
					]}
				>
					<Input placeholder='Ví dụ: Không thể rút gọn link' />
				</Form.Item>

				<Form.Item
					label='Mô tả chi tiết'
					name='description'
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập mô tả chi tiết',
						},
					]}
				>
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
