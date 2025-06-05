import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { googleLogin } from '@/services/Auth';

const LoginGoogle: React.FC = () => {
	const handleGoogleLogin = async () => {
		try {
			const response = await googleLogin();
			if (response.success && response.data?.redirectUrl) {
				window.location.replace(response.data.redirectUrl);
			} else {
				console.error('No redirect URL received');
			}
		} catch (error) {
			console.error('Google login error:', error);
		}
	};

	return (
		<div>
			<Button
				onClick={handleGoogleLogin}
				type='primary'
				style={{
					marginTop: 8,
					width: '100%',
				}}
				size='large'
				icon={<GoogleOutlined />}
			>
				Đăng nhập bằng Google
			</Button>
		</div>
	);
};

export default LoginGoogle;
