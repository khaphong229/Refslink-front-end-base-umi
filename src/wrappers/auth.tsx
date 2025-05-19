import { ROUTER_ADMIN, ROUTER_CLIENT } from '@/constants/router';
import { getUserInfo } from '@/services/base/api';
import React, { useEffect } from 'react';
import { Redirect, useModel } from 'umi';

const AuthWrapper: React.FC = ({ children }) => {
	const { initialState, setInitialState } = useModel('@@initialState');
	const userRole = localStorage.getItem('user_role');
	const isAdminRoute = window.location.pathname.startsWith('/admin');
	const token = localStorage.getItem(userRole === 'admin' ? 'admin_token' : 'token');
	const isLoginPage = window.location.pathname === '/user/login' || window.location.pathname === '/admin/login';

	useEffect(() => {
		const fetchUserInfo = async () => {
			if (token && !initialState?.currentUser) {
				try {
					const info = await getUserInfo();
					setInitialState({
						...initialState,
						currentUser: info?.data?.data,
					});
				} catch (error) {
					console.error('Error fetching user info:', error);
				}
			}
		};
		fetchUserInfo();
	}, [token, initialState]);

	// Nếu là trang login thì cho phép truy cập
	if (isLoginPage) {
		if (token && initialState?.currentUser) {
			if (isAdminRoute) {
				return <Redirect to={ROUTER_ADMIN.DASHBOARD} />;
			} else {
				return <Redirect to={ROUTER_CLIENT.DASHBOARD} />;
			}
		} else {
			return <>{children}</>;
		}
	}

	// Nếu chưa đăng nhập
	if (!initialState?.currentUser && !token) {
		return <Redirect to={isAdminRoute ? ROUTER_ADMIN.LOGIN : ROUTER_CLIENT.LOGIN} />;
	}

	// Kiểm tra role phù hợp với route
	if (isAdminRoute && userRole !== 'admin') {
		return <Redirect to={ROUTER_ADMIN.LOGIN} />;
	}

	if (!isAdminRoute && userRole === 'admin') {
		return <Redirect to={ROUTER_ADMIN.DASHBOARD} />;
	}

	// Nếu có token nhưng chưa có user info, chờ fetch xong
	if (token && !initialState?.currentUser) {
		return null;
	}

	// if (token && initialState?.currentUser) {
	// 	if (isAdminRoute) {
	// 		return <Redirect to={ROUTER_ADMIN.DASHBOARD} />;
	// 	} else {
	// 		return <Redirect to={ROUTER_CLIENT.DASHBOARD} />;
	// 	}
	// }

	return <>{children}</>;
};

export default AuthWrapper;
