import { layout } from '@/app';
import component from '@/locales/en-US/component';

export default [
	{
		path: '/',
		layout: false,
		routes: [
			{
				path: '/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/register',
				layout: false,
				name: 'register',
				component: './user/Register',
			},
			{
				path: '/auth/verify-email/:token',
				layout: false,
				name: 'authentication',
				component: './user/Auth',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './ThongKe',
		icon: 'PieChartOutlined',
	},
	{
		path: '/api-web',
		name: 'API Trang rút gọn',
		component: './ApiWeb',
		icon: 'GlobalOutlined',
	},

	// DANH MUC HE THONG
	{
		name: 'DanhMuc',
		path: '/danh-muc',
		icon: 'copy',
		routes: [
			{
				name: 'ChucVu',
				path: 'chuc-vu',
				component: './DanhMuc/ChucVu',
			},
		],
	},

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
		component: './TrangChu',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
