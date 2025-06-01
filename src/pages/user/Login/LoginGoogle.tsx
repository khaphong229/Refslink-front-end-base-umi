import { useAuthActions } from '@/hooks/useAuthActions';
import { googleCallback, loginSuccess } from '@/services/Auth';
import { ipRoot } from '@/utils/ip';
import { DeleteOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useParams } from 'react-router';

const LoginGoogle = () => {
	const auth = useAuth();
	const { isLoading } = useAuthActions();

	const onClearCache = () => {
		localStorage.clear();
		sessionStorage.clear();
		auth.removeUser();
		window.location.href = '/';
		// window.location.reload();
	};

	const handleLoginGG = () => {
		window.open(`${ipRoot}/auth/google`, '_self');
	};

	if (isLoading) {
		return <div>Đang chuyển tới trang đăng nhập...</div>;
	}

	if (auth.error) {
		return (
			<div>
				Có lỗi xảy ra... <pre>{auth.error.message}</pre>
				<Button icon={<DeleteOutlined />} onClick={onClearCache} type='link'>
					Xóa bộ nhớ đệm
				</Button>
			</div>
		);
	}
	return (
		<div>
			<Button
				onClick={handleLoginGG}
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
