import { ROUTER_CLIENT } from '@/constants/router';
import { loginSuccess } from '@/services/Auth';
import { getAdminInfo, getUserInfo } from '@/services/base/api';
import { message, Spin } from 'antd';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { history, useIntl, useModel } from 'umi';

export default function LoginSuccessGoogle() {
	const { id }: { id: string } = useParams();
	const currentPath = history.location.pathname;
	const isAdminRoute = currentPath.includes('admin');
	const { initialState, setInitialState } = useModel('@@initialState');
	const intl = useIntl();

	const handleRole = async (role: { access_token: string }) => {
		localStorage.setItem(isAdminRoute ? 'admin_token' : 'token', role?.access_token);

		// const decoded = jwt_decode(role?.access_token) as any;
		const info = !isAdminRoute ? await getUserInfo() : await getAdminInfo();
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

	const checkGoogleCallback = useCallback(async () => {
		const res = await loginSuccess(id);

		if (res && res.status === 200 && res.success && res.data) {
			localStorage.setItem('user_role', !isAdminRoute ? 'client' : 'admin');
			handleRole(res?.data);
		} else {
			message.error(res?.message || 'Đăng nhập thất bại');
		}
	}, [id]);

	useEffect(() => {
		checkGoogleCallback();
	}, [checkGoogleCallback]);

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<Spin tip='Đang xử lý đăng nhập...' size='large' />
		</div>
	);
}
