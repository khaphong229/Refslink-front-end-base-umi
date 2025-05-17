
﻿import { layout } from '@/app';
import component from '@/locales/en-US/component';
import { icons } from 'antd/lib/image/PreviewGroup';
import path from 'path';

export default [
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
			}
			{
				path: '/dashboard',
				layout: false,
				name: 'Bảng điều khiển',
				component: './Dashboard',
			},

			{
				path: '/links',
				name: 'Quản lý link',
				component: './LinkManagement',
				layout: false,
			},
			{
				path: '/popular-link',
				name: 'Top link',
				component: './Popular',
				layout: false,
			},
			{
				path: '/support',
				name: 'Hỗ trợ',
				component: './Support',
				layout: false,
			},
			{
				path:'/referrals',
				name:'Referral',
				component:'./Referral',
				layout:false
			},
			{
				path:'/withdraws',
				name:"Rút gọn",
				component:'./Withdraw',
				layout:false
			},

			{
				path: '/settings',
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
		wrappers: ['@/wrappers/auth'],
		name: 'Thống kê',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/links',
		name: 'Quản lý link',
		component: './LinkManagement',
		icon: 'FormOutlined',
	},
	{
		path: '/api-web',
		name: 'API Trang rút gọn',
		component: './ApiWeb',
		icon: 'GlobalOutlined',
		wrappers: ['@/wrappers/auth'],
	},

	// DANH MUC HE THONG
	{
	
		path: '/popular-link',
		name: 'Top link',
		component: './Popular',
		icon: 'BarChartOutlined',
	},
	{
		path: '/withdraws',
		name: 'Rút tiền',
		component: './Withdraw',
		icon: 'DollarOutlined',
	},
	{
		path:'/referrals',
		name:'Referral',
		component:'./Referral',
		icon:'GlobalOutlined'
	},
	{
		path: '/settings',
		name: 'Cài đặt',
		component: './Setting',
		icon: 'SettingOutlined',
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
