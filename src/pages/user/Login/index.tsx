<<<<<<< HEAD
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less';
import { useHistory } from 'react-router-dom';
import { loginApi } from '@/services/Auth';

interface LoginFormProps {
	onSuccess?: (values: any) => void;
	onRegisterClick?: () => {};
	onForgotPassword?: () => void;
	loading?: boolean;
}


const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onRegisterClick, onForgotPassword, loading = false }) => {
	const [form] = Form.useForm();
	const history = useHistory();
	const [submitting, setSubmitting] = useState(false);
	const handleRegisterClick = () => {
		history.push('/register');
	};

	const handleSubmit = async (values: any) => {
		try {
			setSubmitting(true);
			// Here you would typically send the login request to your API
			// const response = await loginApi(values.username, values.password);
=======
import Footer from '@/components/Footer';
import LoginWithKeycloak from '@/pages/user/Login/KeycloakLogin';
import { adminlogin, getUserInfo } from '@/services/base/api';
import { keycloakAuthority } from '@/utils/ip';
import rules from '@/utils/rules';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Tabs, message } from 'antd';
import React, { useState } from 'react';
// import Recaptcha from 'react-recaptcha';
import { history, useIntl, useModel } from 'umi';
import styles from './index.less';
import LoginGoogle from '@/pages/user/Login/LoginGoogle';
import { clientLogin } from '@/services/Auth';
import { ROUTER_CLIENT } from '@/constants/router';

const Login: React.FC = () => {
	const [count, setCount] = useState<number>(Number(localStorage?.getItem('failed')) || 0);
	const [submitting, setSubmitting] = useState(false);
	const [type, setType] = useState<string>('accountEmail');
	const { initialState, setInitialState } = useModel('@@initialState');
	const [isVerified, setIsverified] = useState<boolean>(true);
	const [visibleCaptcha, setVisibleCaptcha] = useState<boolean>(false);
	// const [visibleCaptcha2, setVisibleCaptcha2] = useState<boolean>(false);
	// const recaptchaRef = useRef(null);
	const intl = useIntl();
	const [form] = Form.useForm();

	/**
	 * Xử lý token, get info sau khi đăng nhập
	 */
	const handleRole = async (role: { access_token: string }) => {
		localStorage.setItem('token', role?.access_token);

		// const decoded = jwt_decode(role?.access_token) as any;
		const info = await getUserInfo();
		console.log(info, 'in4');

		setInitialState({
			...initialState,
			currentUser: info?.data?.data,
			// authorizedPermissions: decoded?.authorization?.permissions,
		});

		const defaultloginSuccessMessage = intl.formatMessage({
			id: 'pages.login.success',
			defaultMessage: 'success',
		});
		message.success(defaultloginSuccessMessage);
		history.push(ROUTER_CLIENT.DASHBOARD);
	};

	const handleSubmit = async (values: { email: string; password: string; remember: string }) => {
		const { remember, ...payloadLogin } = values;
		try {
			// if (!isVerified) {
			// 	message.error('Vui lòng xác thực Captcha');
			// 	return;
			// }
			setSubmitting(true);

			const msg = await clientLogin({ ...payloadLogin });

			if (msg.status === 200 && msg?.data?.access_token) {
				localStorage.setItem('user_role', 'client');
				handleRole(msg?.data);
				localStorage.removeItem('failed');
			}
		} catch (error) {
			console.error('Login error:', error);
			if (count >= 4) {
				setIsverified(false);
				setVisibleCaptcha(!visibleCaptcha);
				// setVisibleCaptcha2(true);
			}
			setCount(count + 1);
			localStorage.setItem('failed', (count + 1).toString());
			const defaultloginFailureMessage = intl.formatMessage({
				id: 'pages.login.failure',
				defaultMessage: 'failure',
			});
			message.error(defaultloginFailureMessage);
		}
		setSubmitting(false);
	};
>>>>>>> df2f521e7cd032aef8b90d95c08a9a0895a9ed0f

			const response = await loginApi({
				email:values.email,
				password: values.password
			})


			localStorage.setItem('access_token',response.access_token)


			// Simulating API call with timeout
			await new Promise((resolve) => setTimeout(resolve, 1000));

			message.success('Đăng nhập thành công!');

			if (onSuccess) {
				onSuccess(values);
			}
			history.push('/dashboard')
		} catch (error) {
			message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
		} finally {
			setSubmitting(false);
		}
	};

	const handleRegisterClick = () => {
		history.push(ROUTER_CLIENT.REGISTER);
	};

	return (
		<div className='login-container'>
			<div className='login-form-wrapper'>
				<h1 className='login-title'>Đăng nhập</h1>
				<p className='login-subtitle'>Vui lòng nhập thông tin đăng nhập của bạn</p>

<<<<<<< HEAD
				<Form
					form={form}
					name='login'
					className='login-form'
					initialValues={{ remember: true }}
					onFinish={handleSubmit}
				>
					<Form.Item name='email' rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}>
						<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email đăng nhập' size='large' />
					</Form.Item>

					<Form.Item name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
						<Input.Password
							prefix={<LockOutlined className='site-form-item-icon' />}
							placeholder='Mật khẩu'
							size='large'
						/>
					</Form.Item>

					<Form.Item>
						<div className='login-form-options'>
							<Form.Item name='remember' valuePropName='checked' noStyle>
								<Checkbox>Ghi nhớ đăng nhập</Checkbox>
							</Form.Item>

							<Button type='link' className='login-form-forgot' onClick={onForgotPassword}>
								Quên mật khẩu?
=======
				<div className={styles.main}>
					<Tabs activeKey={type} onChange={setType}>
						<Tabs.TabPane
							key='accountEmail'
							tab={intl.formatMessage({
								id: 'pages.lggin.accountLogin.emailTab',
								defaultMessage: 'tab',
							})}
						/>
						<Tabs.TabPane
							key='accountGoogle'
							tab={intl.formatMessage({
								id: 'pages.login.accountLogin.googleTab',
								defaultMessage: 'tab',
							})}
						/>
						{/* <Tabs.TabPane
							key='accountAdmin'
							tab={intl.formatMessage({
								id: 'pages.login.accountLoginAdmin.tab',
								defaultMessage: 'tab',
							})}
						/> */}
					</Tabs>

					{type === 'accountGoogle' ? (
						<LoginGoogle />
					) : type === 'accountEmail' ? (
						<Form
							form={form}
							onFinish={async (values) => handleSubmit(values as { email: string; password: string; remember: string })}
							layout='vertical'
						>
							<Form.Item label='' name='email' rules={[...rules.required, ...rules.email]}>
								<Input
									placeholder={intl.formatMessage({
										id: 'pages.login.email.placeholder',
										defaultMessage: 'Nhập E-mail',
									})}
									prefix={<MailOutlined className={styles.prefixIcon} />}
									size='large'
								/>
							</Form.Item>
							<Form.Item label='' name='password' rules={[...rules.required]}>
								<Input.Password
									placeholder={intl.formatMessage({
										id: 'pages.login.password.placeholder',
										defaultMessage: 'Nhập mật khẩu',
									})}
									prefix={<LockOutlined className={styles.prefixIcon} />}
									size='large'
								/>
							</Form.Item>

							<Form.Item>
								<div className={styles.optionWrap}>
									<Form.Item name='remember' valuePropName='checked' noStyle>
										<Checkbox>Ghi nhớ</Checkbox>
									</Form.Item>
									<Button
										onClick={() => {
											window.open(keycloakAuthority + '/login-actions/reset-credentials');
										}}
										type='link'
									>
										Quên mật khẩu?
									</Button>
								</div>
							</Form.Item>

							<Button type='primary' htmlType='submit' block size='large' loading={submitting}>
								{intl.formatMessage({
									id: 'pages.login.submit',
									defaultMessage: 'submit',
								})}
>>>>>>> df2f521e7cd032aef8b90d95c08a9a0895a9ed0f
							</Button>
						</div>
					</Form.Item>

<<<<<<< HEAD
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
							loading={submitting || loading}
							size='large'
						>
							Đăng nhập
						</Button>
					</Form.Item>

					<div className='login-form-register'>
						Chưa có tài khoản?
						<Button type='link' onClick={handleRegisterClick}>
							Đăng ký ngay!
						</Button>
=======
					<br />
					<div style={{ textAlign: 'center' }}>
						<div>
							Chưa có tài khoản?{' '}
							<Button type='link' onClick={handleRegisterClick}>
								Đăng ký ngay!
							</Button>
						</div>
						{/* {type === 'accountAdmin' && visibleCaptcha && count >= 5 && (
              <Recaptcha
                ref={recaptchaRef}
                size="normal"
                sitekey="6LelHsEeAAAAAJmsVdeC2EPNCAVEtfRBUGSKireh"
                render="explicit"
                hl="vi"
                // onloadCallback={callback}
                verifyCallback={verifyCallback}
              />
            )}

            {type === 'accountAdmin' && !visibleCaptcha && visibleCaptcha2 && count >= 5 && (
              <Recaptcha
                ref={recaptchaRef}
                size="normal"
                sitekey="6LelHsEeAAAAAJmsVdeC2EPNCAVEtfRBUGSKireh"
                render="explicit"
                hl="vi"
                // onloadCallback={callback}
                verifyCallback={verifyCallback}
              />
            )} */}
>>>>>>> df2f521e7cd032aef8b90d95c08a9a0895a9ed0f
					</div>
					<div className='register-social'>
						<p className='register-social-divider'>
							<span>Hoặc đăng nhập với với</span>
						</p>

						<Form.Item>
							<Button
								type='primary'
								className='login-form-button login-google-button'
								size='large'
								icon={
									<svg width='20' height='20' viewBox='0 0 48 48'>
										<path
											fill='#FFC107'
											d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
										></path>
										<path
											fill='#FF3D00'
											d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
										></path>
										<path
											fill='#4CAF50'
											d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
										></path>
										<path
											fill='#1976D2'
											d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
										></path>
									</svg>
								}
							>
								Đăng nhập với Google
							</Button>
						</Form.Item>

						
					</div>
				</Form>
			</div>
		</div>
	);
};

export default LoginForm;
