export const ROUTER = {
	API_WEB: 'API Trang rút gọn',
};

export const ROUTER_CLIENT = {
	LOGIN: '/user/login',
	REGISTER: '/user/register',
	DASHBOARD: '/dashboard',
};

export const ROUTER_ADMIN = {
	LOGIN: '/admin/login',
	DASHBOARD: '/admin/dashboard',
};

export const PUBLIC_PATHS = [ROUTER_CLIENT.LOGIN, ROUTER_CLIENT.REGISTER, ROUTER_ADMIN.LOGIN, '/support', '/about'];

export const isPublicPath = (path: string) => {
	return PUBLIC_PATHS.some((publicPath) => path.startsWith(publicPath));
};
