import { ROUTER_ADMIN, ROUTER_CLIENT } from '@/constants/router';
import React from 'react';
import { Redirect, useModel } from 'umi';

const AuthWrapper: React.FC = ({ children }) => {
	const { initialState } = useModel('@@initialState');
	const userRole = localStorage.getItem('user_role');
	const isAdminRoute = window.location.pathname.startsWith('/admin');

	// Nếu chưa đăng nhập
	if (!initialState?.currentUser) {
		return <Redirect to={isAdminRoute ? ROUTER_ADMIN.LOGIN : ROUTER_CLIENT.LOGIN} />;
	}

	// Kiểm tra role phù hợp với route
	if (isAdminRoute && userRole !== 'admin') {
		return <Redirect to={ROUTER_ADMIN.LOGIN} />;
	}

	if (!isAdminRoute && userRole === 'admin') {
		return <Redirect to={ROUTER_ADMIN.DASHBOARD} />;
	}

	return <>{children}</>;
};

export default AuthWrapper;
