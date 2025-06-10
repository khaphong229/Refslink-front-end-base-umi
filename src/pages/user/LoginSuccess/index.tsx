import React, { useEffect } from 'react';
import { history, useModel } from 'umi';
import { getUserInfo } from '@/services/base/api';
import { message } from 'antd';
import { Spin } from 'antd';
const LoginSuccess: React.FC = () => {
	const { initialState, setInitialState } = useModel('@@initialState');

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const token = searchParams.get('token');

		const handleLoginSuccess = async () => {
			if (token) {
				localStorage.setItem('token', token);
				localStorage.setItem('user_role', 'client');

				try {
					const info = await getUserInfo();
					setInitialState({
						...initialState,
						currentUser: info?.data?.data,
					});
					message.success('Đăng nhập thành công!');
					history.push('/dashboard');
				} catch (err) {
					console.error(err);
					message.error('Lỗi khi lấy thông tin người dùng!');
					history.push('/user/login');
				}
			} else {
				message.warning('Không tìm thấy token!');
				history.push('/user/login');
			}
		};

		handleLoginSuccess();
	}, []);

	return (
		<div style={{ textAlign: 'center', marginTop: '50px' }}>
    <Spin size="large" />
    <h1 style={{ marginTop: '20px' }}>Đăng nhập thành công!</h1>
    <p>Đang chuyển hướng...</p>
  </div>
	);
};

export default LoginSuccess;
