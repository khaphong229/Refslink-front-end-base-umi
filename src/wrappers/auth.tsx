import { ROUTER_ADMIN, ROUTER_CLIENT } from '@/constants/router';
import { getAdminInfo, getUserInfo } from '@/services/base/api';
import React, { useEffect } from 'react';
import { Redirect, useModel } from 'umi';

const AuthWrapper: React.FC = ({ children }) => {
	const { initialState, setInitialState } = useModel('@@initialState');
	const userRole = localStorage.getItem('user_role');
	const isAdminRoute = window.location.pathname.startsWith('/admin');
	const token = localStorage.getItem(userRole === 'admin' ? 'admin_token' : 'token');
	const isLoginPage = window.location.pathname === '/user/login' || window.location.pathname === '/admin/login';

	// Nếu là trang login, cho phép truy cập
	if (isLoginPage) {
		return <>{children}</>;
	}

	// Kiểm tra token ngay lập tức
	if (!token) {
		return <Redirect to={isAdminRoute ? ROUTER_ADMIN.LOGIN : ROUTER_CLIENT.LOGIN} />;
	}
	useEffect(() => {
		const fetchUserInfo = async () => {
			if (token && !initialState?.currentUser) {
				try {
					const info = isAdminRoute ? await getAdminInfo() : await getUserInfo();
					setInitialState({
						...initialState,
						currentUser: info?.data?.data,
					});
				} catch (error) {
					console.error('Error fetching user info:', error);
					// Xóa token và chuyển về trang login nếu có lỗi
					localStorage.removeItem(userRole === 'admin' ? 'admin_token' : 'token');
					localStorage.removeItem('user_role');
					window.location.href = isAdminRoute ? ROUTER_ADMIN.LOGIN : ROUTER_CLIENT.LOGIN;
				}
			}
		};
		fetchUserInfo();
	}, [token, initialState]);

	// Nếu có token nhưng chưa có user info, hiển thị loading
	if (token && !initialState?.currentUser) {
		return null; // hoặc return một component loading
	}

	return <>{children}</>;
};

export default AuthWrapper;