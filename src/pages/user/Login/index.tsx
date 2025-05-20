import Footer from '@/components/Footer';
import { getUserInfo } from '@/services/base/api';
import { keycloakAuthority } from '@/utils/ip';
import rules from '@/utils/rules';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
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

	// const verifyCallback = (response: any) => {
	// 	if (response) setIsverified(true);
	// 	else setIsverified(false);
	// };

	const handleRegisterClick = () => {
		history.push(ROUTER_CLIENT.REGISTER);
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
							</Button>
						</Form>
					) : null}

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
					</div>
				</div>
			</div>

			<div className='login-footer'>
				<Footer />
			</div>
		</div>
	);
};

export default Login;
