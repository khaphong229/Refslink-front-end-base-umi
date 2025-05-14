import { layout } from '@/app';
import component from '@/locales/en-US/component';
import { icons } from 'antd/lib/image/PreviewGroup';

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
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
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
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/popular-link',
		name: 'Top link',
		component: './Popular',
		icon:'BarChartOutlined'
	},
	{
		path :'/withdraws',
		name:'Rút tiền',
		component:'./Withdraw',
		icon:'DollarOutlined'
	},
	{
		path:'/settings',
		name:'Cài đặt',
		component:'./Setting',
		icon: 'SettingOutlined'
	},
	{
		path:'/support',
		name:'Hỗ trợ',
		component:'./Support',
		icon: 'UserDeleteOutlined'
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
