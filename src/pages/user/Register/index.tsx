import Footer from '@/components/Footer';
import { getUserInfo } from '@/services/base/api';
import { GoogleOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Tabs, message } from 'antd';
import React, { useState } from 'react';
import { history, useIntl, useModel } from 'umi';
import styles from '../Login/index.less';

import { clientRegister } from '@/services/Auth';
import rules from '@/utils/rules';
import { ROUTER_CLIENT } from '@/constants/router';

const Register: React.FC = () => {
	const [submitting, setSubmitting] = useState(false);
	const [type, setType] = useState<string>('accountEmail');
	const { initialState, setInitialState } = useModel('@@initialState');
	const intl = useIntl();
	const [form] = Form.useForm();

	/**
	 * Xử lý token, get info sau khi đăng nhập
	 */
	const handleRole = async (role: { access_token: string }) => {
		localStorage.setItem('token', role?.access_token);

		const info = await getUserInfo();
		console.log(info, 'in4');

		setInitialState({
			...initialState,
			currentUser: info?.data?.data,
		});

		const defaultloginSuccessMessage = intl.formatMessage({
			id: 'pages.login.success',
			defaultMessage: 'success',
		});
		message.success(defaultloginSuccessMessage);
		history.push('/dashboard');
	};

	const handleSubmit = async (values: {
		agreement: string;
		confirmPassword: string;
		email: string;
		name: string;
		password: string;
	}) => {
		try {
			setSubmitting(true);

			const payload = {
				name: values.name,
				email: values.email,
				password: values.password,
			};

			const res = await clientRegister(payload);

			if (res.status === 200) {
				message.success('Đăng ký tài khoản thành công! Vui lòng kiểm tra email để xác thực.');
				history.push(ROUTER_CLIENT.LOGIN);
			} else {
				message.error(res.data.message || 'Đăng ký thất bại. Vui lòng thử lại sau.');
			}
		} catch (error: any) {
			message.error(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại sau.');
		} finally {
			setSubmitting(false);
		}
	};

	const handleLoginClick = () => {
		history.push(ROUTER_CLIENT.LOGIN);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.top}>
					<div className={styles.header}>
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<img alt='logo' className={styles.logo} src='/logo-full.svg' />
						</div>
					</div>
				</div>

				<div className={styles.main}>
					<Tabs activeKey={type} onChange={setType}>
						<Tabs.TabPane
							key='accountEmail'
							tab={intl.formatMessage({
								id: 'pages.register.accountRegister.emailTab',
								defaultMessage: 'Đăng ký tài khoản Refslink',
							})}
						/>
					</Tabs>

					{type === 'accountEmail' ? (
						<Form form={form} onFinish={handleSubmit} layout='vertical'>
							<Form.Item name='name' rules={[...rules.required, ...rules.username]}>
								<Input
									prefix={<UserOutlined className={styles.prefixIcon} />}
									placeholder='Nhập tên tài khoản'
									size='large'
								/>
							</Form.Item>

							<Form.Item name='email' rules={[...rules.required, ...rules.email]}>
								<Input
									placeholder={intl.formatMessage({
										id: 'pages.register.email.placeholder',
										defaultMessage: 'Nhập E-mail',
									})}
									prefix={<MailOutlined className={styles.prefixIcon} />}
									size='large'
								/>
							</Form.Item>

							<Form.Item name='password' rules={[...rules.required, ...rules.password]} hasFeedback>
								<Input.Password
									placeholder={intl.formatMessage({
										id: 'pages.register.password.placeholder',
										defaultMessage: 'Nhập mật khẩu',
									})}
									prefix={<LockOutlined className={styles.prefixIcon} />}
									size='large'
								/>
							</Form.Item>

							<Form.Item
								name='confirmPassword'
								dependencies={['password']}
								hasFeedback
								rules={[
									{ required: true, message: 'Vui lòng xác nhận mật khẩu!' },
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve();
											}
											return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
										},
									}),
								]}
							>
								<Input.Password
									prefix={<LockOutlined className={styles.prefixIcon} />}
									placeholder='Xác nhận mật khẩu'
									size='large'
								/>
							</Form.Item>

							<Form.Item>
								<Form.Item
									name='agreement'
									valuePropName='checked'
									noStyle
									rules={[
										{
											validator: (_, value) =>
												value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý điều khoản sử dụng!')),
										},
									]}
								>
									<Checkbox>
										Tôi đã đọc và đồng ý với <a href='#'>điều khoản sử dụng</a>
									</Checkbox>
								</Form.Item>
							</Form.Item>

							<Button type='primary' htmlType='submit' block size='large' loading={submitting}>
								{intl.formatMessage({
									id: 'pages.register.submit',
									defaultMessage: 'Đăng ký',
								})}
							</Button>
						</Form>
					) : null}

					<br />
					<div style={{ textAlign: 'center' }}>
						<div>
							Đã có tài khoản?{' '}
							<Button type='link' onClick={handleLoginClick}>
								Đăng nhập ngay!
							</Button>
						</div>
					</div>

					<div className='register-social'>
						<p className='register-social-divider' style={{ textAlign: 'center', margin: '15px 0' }}>
							<span>Hoặc đăng ký với</span>
						</p>

						<Form.Item>
							<Button
								type='default'
								style={{
									marginTop: 8,
									width: '100%',
								}}
								size='large'
								icon={<GoogleOutlined />}
							>
								Đăng ký bằng Google
							</Button>
						</Form.Item>
					</div>
				</div>
			</div>

			<div className='login-footer'>
				<Footer />
			</div>
		</div>
	);
};

export default Register;