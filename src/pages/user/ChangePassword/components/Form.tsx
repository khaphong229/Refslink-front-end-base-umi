import React from 'react';
import rules from '@/utils/rules';
import { Form, Input, Row, Col, Select, message, Button, Card } from 'antd';
import axios from '@/utils/axios';
import { adminlogin, clientLogin } from '@/services/auth';

const ChangePassForm: React.FC = () => {
	const [form] = Form.useForm();
	const onFinish = async (values: any) => {
		try {
			await changePassword( {
				password: values.password,
				new_password: values.new_password,
			});
			message.success('Đổi mật khẩu thành công');
			form.resetFields();
		} catch (eror: any) {
			message.error('Đổi mật khẩu thất bại!');
		}
	};

	return (
		<Card>
			<h2>Đổi mật khẩu</h2>
			<Form layout='vertical' form={form} onFinish={onFinish}  >
				<Col>
					<Form.Item label='Mật khẩu hiện tại' name='password' rules={[...rules.password, ...rules.required]}>
						<Input.Password placeholder='Mật khẩu hiện tại' />
					</Form.Item>
					<Form.Item label='Mật khẩu mới' name='new_password' rules={[...rules.password, ...rules.required]}>
						<Input.Password placeholder='Mật khẩu mới' />
					</Form.Item>
					<Form.Item
						label='Nhập lại mật khẩu mới'
						name='confirm'
						dependencies={['new_password']}
						rules={[
							...rules.required,
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('new_password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('Mật khẩu không khớp!'));
								},
							}),
						]}
					>
						<Input.Password placeholder='Nhập lại mật khẩu mới' />
					</Form.Item>
				</Col>

				<Form.Item>
					<Button type='primary' htmlType='submit' >
						Đổi mật khẩu
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default ChangePassForm;
