export default [
	// Admin Routes
	{
		path: '/login/admin',
		layout: false,
		component: './user/Login',
	},
	// Protected Admin Routes
	{
		path: '/admin/dashboard',
		name: 'Thống kê',
		component: './Dashboard/admin',
		icon: 'PieChartOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessAdminRoute',
	},
	{
		path: '/admin/users',
		name: 'Quản lý người dùng',
		component: './UserManagement',
		icon: 'UserOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessAdminRoute',
	},
	{
		path: '/admin/supports',
		name: 'Quản lý hỗ trợ',
		component: './admin/Support',
		icon: 'SnippetsOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessAdminRoute',
	},
	{
		path: '/admin/settings',
		name: 'Quản lý cấu hình',
		component: './admin/Setting',
		icon: 'SettingOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessAdminRoute',
	},

	// Client Auth Routes (Login/Register)
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				name: 'Đăng nhập',
				component: './user/Login',
				wrappers: ['@/wrappers/auth'],
			},
			{
				path: '/user/register',
				name: 'Đăng ký',
				component: './user/Register',
			},
			{
				path: '/user/verify-account/:token',
				name: 'Xác minh Email',
				component: './user/EmailVerification',
				layout: false,
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	// Protected Client Routes
	{
		path: '/dashboard',
		name: 'Thống kê',
		component: './Dashboard',
		icon: 'PieChartOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessClientRoute',
	},
	{
		path: '/api-web',
		name: 'Quản lý API',
		component: './ApiWeb',
		icon: 'GlobalOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessClientRoute',
	},
	{
		path: '/links',
		name: 'Quản lý link',
		component: './LinkManagement',
		icon: 'FormOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessClientRoute',
	},
	{
		path: '/popular-link',
		name: 'Top link',
		component: './Popular',
		icon: 'BarChartOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessClientRoute',
	},
	{
		path: '/tools',
		name: 'Công cụ API',
		icon: 'BarsOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessClientRoute',
		routes: [
			{
				path: 'quick',
				name: 'Quick Link',
				component: './Tool/QuickLink',
			},
			{
				path: 'mass-shrinker',
				name: 'Mass Shrinker',
				component: './Tool/MassShrinker',
			},
			{
				path: 'full-page-cript',
				name: 'Full Page Script',
				component: './Tool/FullPageScript',
			},
			{
				path: 'developer-api',
				name: 'Developers API',
				component: './Tool/DeveloperAPI',
			},
		],
	},
	{
		path: '/referrals',
		name: 'Referral',
		component: './Referral',
		icon: 'TeamOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessClientRoute',
	},
	{
		path: '/withdraws',
		name: 'Rút tiền',
		component: './Withdraw',
		icon: 'DollarOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessClientRoute',
	},
	{
		path: '/settings',
		name: 'Cài đặt',
		icon: 'SettingOutlined',
		wrappers: ['@/wrappers/auth', '@/wrappers/roleCheck'],
		access: 'canAccessClientRoute',
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
		icon: 'SolutionOutlined',
		access: 'canAccessClientRoute',
	},

	// Public Routes (Không cần xác thực)
	{
		path: '/',
		component: './Home',
		layout: false,
	},

	{
		path: '/st/:id',
		component: './TrungGian',
		layout: false,
	},

	// Notification Routes
	{
		path: '/notification',
		layout: false,
		hideInMenu: true,
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
	},

	// Error Pages
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
		path: '/:id',
		component: './exception/404',
		layout: false,
	},
];
