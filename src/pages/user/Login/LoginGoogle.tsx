import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { googleLogin } from '@/services/Auth';

const LoginGoogle: React.FC = () => {
	const handleGoogleLogin = async () => {
		window.location.href = `${APP_CONFIG_IP_ROOT}/auth/google`;
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
