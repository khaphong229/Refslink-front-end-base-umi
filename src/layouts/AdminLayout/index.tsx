import React from 'react';
import { Layout, Menu } from 'antd';
import { useModel } from 'umi';
import { useAuthActions } from '@/hooks/useAuthActions';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = ({ children }) => {
	const { initialState } = useModel('@@initialState');
	const { dangXuat } = useAuthActions();

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header>
				<div className='logo' />
				<Menu theme='dark' mode='horizontal'>
					<Menu.Item key='dashboard'>Dashboard</Menu.Item>
					<Menu.Item key='users'>Quản lý người dùng</Menu.Item>
					<Menu.Item key='logout' onClick={dangXuat}>
						Đăng xuất
					</Menu.Item>
				</Menu>
			</Header>
			<Layout>
				<Sider width={200}>
					<Menu mode='inline' defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
						<Menu.Item key='1'>Tổng quan</Menu.Item>
						<Menu.Item key='2'>Quản lý người dùng</Menu.Item>
						<Menu.Item key='3'>Cài đặt</Menu.Item>
					</Menu>
				</Sider>
				<Layout style={{ padding: '24px' }}>
					<Content>{children}</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
