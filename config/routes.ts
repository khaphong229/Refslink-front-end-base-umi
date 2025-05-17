
export default [
	// Admin
	{
		path: '/admin',
		component: '@/layouts/AdminLayout',
		wrappers: ['@/components/AdminRoute'],
		routes: [
			{
				path: '/admin/login',
				component: './admin/Login',
			},
			{
				path: '/admin/dashboard',
				component: './admin/Dashboard',
				wrappers: ['@/wrappers/auth'],
			},
		],
	},

	// Client
	{
		path: '/user',
		layout: false,
		wrappers: ['@/wrappers/auth'],
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
				layout: false,
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


	// Routes sau khi đã các thực user
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './Dashboard',
		icon: 'PieChartOutlined',
		wrappers: ['@/wrappers/auth'],

	},
	{
		path: '/links',
		name: 'Quản lý link',
		component: './LinkManagement',
		icon: 'FormOutlined',
		wrappers: ['@/wrappers/auth'],

	},
	{
		path: '/api-web',
		name: 'API Trang rút gọn',
		component: './ApiWeb',
		icon: 'GlobalOutlined',
		wrappers: ['@/wrappers/auth'],
	},

	{
		path: '/popular-link',
		name: 'Top link',
		component: './Popular',
		icon: 'BarChartOutlined',
		wrappers: ['@/wrappers/auth'],

	},
	{
		path: '/withdraws',
		name: 'Rút tiền',
		component: './Withdraw',
		icon: 'DollarOutlined',
		wrappers: ['@/wrappers/auth'],

	},
	{
		path: '/referrals',
		name: 'Referral',
		component: './Referral',
		icon: 'GlobalOutlined',
		wrappers: ['@/wrappers/auth'],

	},
	{
		path: '/settings',
		name: 'Cài đặt',
		icon: 'SettingOutlined',
		wrappers: ['@/wrappers/auth'],
		routes: [
			{
				path: 'profile',
				name: 'Hồ sơ',
				component: './user/Profile',
				exact: true,
			},
			{
				path: 'change-password',
				name: 'Đổi mật khẩu',
				component: './user/ChangePassword',
				exact: true,
			},
		],
	},
	{
		path: '/support',
		name: 'Hỗ trợ',
		component: './Support',
		icon: 'UserDeleteOutlined',
		wrappers: ['@/wrappers/auth'],

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
