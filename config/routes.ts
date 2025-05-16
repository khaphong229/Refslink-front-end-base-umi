export default [
	// Admin
	{
		path: '/admin',
		layout: '@/layouts/AdminLayout',
		wrappers: ['@/components/AdminRoute'],
		routes: [
			{
				path: '/admin/login',
				component: './admin/Login',
			},
			{
				path: '/admin/dashboard',
				component: './admin/Dashboard',
			},
		],
	},

	// Client
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				name: 'Đăng nhập',
				component: './user/Login',
			},
			{
				path: '/user/register',
				name: 'Đăng ký',
				component: './user/Register',
			},
			{
				path: '/user/verify-email/:token',
				name: 'Xác minh Email',
				component: './user/EmailVerification',
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
