import { useHistory } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import './style.less';

const Header = () => {
	const history = useHistory();

	// Hàm cuộn mượt đến section
	const scrollToSection = (id: string) => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	const menu = (
		<Menu>
			<Menu.Item onClick={() => history.push('/')}>Trang chủ</Menu.Item>
			<Menu.Item key='introduce'>
				<Button type='text' onClick={() => scrollToSection('introduce')}>
					Giới thiệu
				</Button>
			</Menu.Item>
			<Menu.Item key='connect'>
				<Button type='text' onClick={() => scrollToSection('connect')}>
					Liên hệ
				</Button>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item onClick={() => history.push('/user/login')}>Đăng nhập</Menu.Item>
			<Menu.Item key='mode'>Chế độ sáng/tối</Menu.Item> {/* Có thể gắn toggle ở đây */}
		</Menu>
	);

	return (
		<header className='custom-header'>
			<div className='header-container'>
				<div className='logo' onClick={() => history.push('/')}>
					<span>Ref</span>
					<span className='text-gradient'>slink</span>
				</div>

				<div className='nav-links'>
					<Button className='rounded-btn' type='link' onClick={() => history.push('/')}>
						Trang chủ
					</Button>
					<Button className='rounded-btn' type='link' onClick={() => scrollToSection('introduce')}>
						Giới thiệu
					</Button>
					<Button className='rounded-btn' type='link' onClick={() => scrollToSection('connect')}>
						Liên hệ
					</Button>
				</div>

				<div className='auth-mode'>
					<Button className='rounded-btn' type='primary' onClick={() => history.push('/user/login')}>
						Đăng ký | Đăng nhập
					</Button>
					{/* <ModeToggle /> */}
				</div>

				<div className='menu-mobile'>
					<Dropdown overlay={menu} placement='bottomRight' trigger={['click']}>
						<Button className='rounded-btn' icon={<MenuOutlined />} />
					</Dropdown>
				</div>
			</div>
		</header>
	);
};

export default Header;
