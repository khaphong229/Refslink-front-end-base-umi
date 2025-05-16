import { ROUTER_ADMIN } from '@/constants/router';

import { Redirect, useModel } from 'umi';

const AdminRoute = ({ children }: any) => {
	const { initialState } = useModel('@@initialState');
	const userRole = localStorage.getItem('user_role');

	if (!initialState?.currentUser || userRole !== 'admin') {
		return <Redirect to={ROUTER_ADMIN.LOGIN} />;
	}

	return <>{children}</>;
};

export default AdminRoute;
