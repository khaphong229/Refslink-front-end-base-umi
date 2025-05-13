import { layout } from "@/app";
import component from "@/locales/en-US/component";

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
				path:'/register',
				layout:false,
				name:'register',
				component:'./user/Register'
			},
			{
				path:'/auth/verify-email/:token',
				layout:false,
				name:"authentication",
				component:'./user/Auth'
			}
			,
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
		name: 'Rút gọn link mới',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
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
