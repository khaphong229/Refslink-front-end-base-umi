import { ROUTER_ADMIN, ROUTER_CLIENT } from '@/constants/router';
import React from 'react';
import { Redirect } from 'umi';

const RoleCheckWrapper: React.FC = ({ children }) => {
	const userRole = localStorage.getItem('user_role');
	const isAdminRoute = window.location.pathname.startsWith('/admin');
	const token = localStorage.getItem(userRole === 'admin' ? 'admin_token' : 'token');

	// Kiểm tra token và role
	if (!token || !userRole) {
		return <Redirect to={isAdminRoute ? ROUTER_ADMIN.LOGIN : ROUTER_CLIENT.LOGIN} />;
	}

	// Kiểm tra role phù hợp với route
	if (isAdminRoute && userRole !== 'admin') {
		return <Redirect to={ROUTER_CLIENT.DASHBOARD} />;
	}

	if (!isAdminRoute && userRole === 'admin') {
		return <Redirect to={ROUTER_ADMIN.DASHBOARD} />;
	}

	return <>{children}</>;
};

export default RoleCheckWrapper;
