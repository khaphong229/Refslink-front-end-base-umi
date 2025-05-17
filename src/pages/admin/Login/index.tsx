import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { adminlogin } from '@/services/Auth';
import styles from './style.less';
import { ROUTER_ADMIN } from '@/constants/router';

const AdminLogin: React.FC = () => {
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (values: { email: string; password: string }) => {
		try {
			setSubmitting(true);
			const response = await adminlogin({
				email: values.email,
				password: values.password,
			});

			if (response.status === 200 && response.data?.access_token) {
				// Lưu token admin
				localStorage.setItem('admin_token', response.data.access_token);
				// Lưu role admin
				localStorage.setItem('user_role', 'admin');

				message.success('Đăng nhập thành công');
				history.push(ROUTER_ADMIN.DASHBOARD);
			}
		} catch (error) {
			message.error('Đăng nhập thất bại');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.top}>
					<div className={styles.header}>
						<h1>Admin Login</h1>
					</div>
				</div>

				<div className={styles.main}>
					<Form onFinish={handleSubmit}>
						<Form.Item name='email' rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}>
							<Input prefix={<UserOutlined />} placeholder='Tên đăng nhập' size='large' />
						</Form.Item>

						<Form.Item name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
							<Input.Password prefix={<LockOutlined />} placeholder='Mật khẩu' size='large' />
						</Form.Item>

						<Form.Item>
							<Button type='primary' htmlType='submit' loading={submitting} block size='large'>
								Đăng nhập
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
