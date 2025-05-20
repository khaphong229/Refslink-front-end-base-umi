import path from 'path';

export default [
	// Admin Routes
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
			// Thêm các route admin khác ở đây
		],
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

	//Public


	// Protected Client Routes
	// {
	// 	path: '/',
	// 	// component: '@/layouts/BasicLayout',
	// 	layout: true,
	// 	wrappers: ['@/wrappers/auth'], // Thêm wrapper auth cho toàn bộ route client
	// 	routes: [
	// 		{
	// 			path: '/dashboard',
	// 			name: 'Dashboard',
	// 			component: './ThongKe',
	// 			icon: 'PieChartOutlined',
	// 		},
	// 		{
	// 			path: '/api-web',
	// 			name: 'API Trang rút gọn',
	// 			component: './ApiWeb',
	// 			icon: 'GlobalOutlined',
	// 		},
	// 		// Danh mục hệ thống
	// 		{
	// 			name: 'DanhMuc',
	// 			path: '/danh-muc',
	// 			icon: 'copy',
	// 			routes: [
	// 				{
	// 					name: 'ChucVu',
	// 					path: 'chuc-vu',
	// 					component: './DanhMuc/ChucVu',
	// 				},
	// 			],
	// 		},
	// 	],
	// },

	{
		path: '/dashboard',
		name: 'Thống kê',
		component: './Dashboard',
		icon: 'PieChartOutlined',
		wrappers: ['@/wrappers/auth'],
	},
	{
		path: '/api-web',
		name: 'Quản lý API',
		component: './ApiWeb',
		icon: 'GlobalOutlined',
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
		path: '/popular-link',
		name: 'Top link',
		component: './Popular',
		icon: 'BarChartOutlined',
		wrappers: ['@/wrappers/auth'],
	},
	{
		path: '/tools',
		name: 'Công cụ API',
		icon: 'BarsOutlined',
		wrappers: ['@/wrappers/auth'],
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
		icon: 'GlobalOutlined',
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
		icon: 'UsergroupDeleteOutlined',
	},

	// Public Routes (Không cần xác thực)
	{
		path: '/',
		component: './Home',
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
		path:'/:id',
		component: './exception/404',
		layout:false,
	},
		{
		path: '/:id',
		// name: 'Vượt Link',
		component: './TrungGian',
		layout: false
	},
];

// export default [
// 	// Admin
// 	{
// 		path: '/admin',
// 		component: '@/layouts/AdminLayout',
// 		wrappers: ['@/components/AdminRoute'],
// 		routes: [
// 			{
// 				path: '/admin/login',
// 				component: './admin/Login',
// 			},
// 			{
// 				path: '/admin/dashboard',
// 				component: './admin/Dashboard',
// 				wrappers: ['@/wrappers/auth'],
// 			},
// 		],
// 	},

// 	// Client
// 	{
// 		path: '/user',
// 		layout: false,
// 		routes: [
// 			{
// 				path: '/user/login',
// 				name: 'Đăng nhập',
// 				component: './user/Login',
// 			},
// 			{
// 				path: '/user/register',
// 				name: 'Đăng ký',
// 				component: './user/Register',
// 			},
// 			{
// 				path: '/user/verify-email/:token',
// 				name: 'Xác minh Email',
// 				component: './user/EmailVerification',
// 			},
// 			{
// 				path: '/user',
// 				redirect: '/user/login',
// 			},
// 		],
// 	},

// 	///////////////////////////////////
// 	// DEFAULT MENU
// 	{
// 		path: '/dashboard',
// 		name: 'Dashboard',
// 		component: './ThongKe',
// 		icon: 'PieChartOutlined',
// 		wrappers: ['@/wrappers/auth'],
// 	},
// 	{
// 		path: '/api-web',
// 		name: 'API Trang rút gọn',
// 		component: './ApiWeb',
// 		icon: 'GlobalOutlined',
// 		wrappers: ['@/wrappers/auth'],
// 	},

// 	// DANH MUC HE THONG
// 	{
// 		name: 'DanhMuc',
// 		path: '/danh-muc',
// 		icon: 'copy',
// 		routes: [
// 			{
// 				name: 'ChucVu',
// 				path: 'chuc-vu',
// 				component: './DanhMuc/ChucVu',
// 			},
// 		],
// 	},

// 	{
// 		path: '/notification',
// 		routes: [
// 			{
// 				path: './subscribe',
// 				exact: true,
// 				component: './ThongBao/Subscribe',
// 			},
// 			{
// 				path: './check',
// 				exact: true,
// 				component: './ThongBao/Check',
// 			},
// 			{
// 				path: './',
// 				exact: true,
// 				component: './ThongBao/NotifOneSignal',
// 			},
// 		],
// 		layout: false,
// 		hideInMenu: true,
// 	},
// 	{
// 		path: '/',
// 		component: './TrangChu',
// 	},
// 	{
// 		path: '/403',
// 		component: './exception/403/403Page',
// 		layout: false,
// 	},
// 	{
// 		path: '/hold-on',
// 		component: './exception/DangCapNhat',
// 		layout: false,
// 	},
// 	{
// 		component: './exception/404',
// 	},
// ];
