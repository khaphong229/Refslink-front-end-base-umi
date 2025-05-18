import { useHistory } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import './style.less';
import { Link } from 'react-scroll';

const Header = () => {
	const history = useHistory();

	const menu = (
		<Menu>
			<Menu.Item onClick={() => history.push('/')}>Trang chủ</Menu.Item>
			<Menu.Item key='introduce'>
				<Link to='introduce' smooth={true} duration={500} offset={-64}>
					Giới thiệu
				</Link>
			</Menu.Item>
			<Menu.Item key="connect">
        <Link to="connect" smooth={true} duration={500} offset={-64}>
          Liên hệ
        </Link>
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
					<Button className='rounded-btn' type='link'>
						Trang chủ
					</Button>
					<Link to='introduce' smooth={true} duration={500} offset={-64}>
						<Button className='rounded-btn' type='link'>
							Giới thiệu
						</Button>
					</Link>
					<Link to='connect' smooth={true} duration={500} offset={-64}>
						<Button className='rounded-btn' type='link'>
							Liên hệ
						</Button>
					</Link>
				</div>
				<div className='auth-mode'>
					<Button className='rounded-btn' type='primary' onClick={() => history.push('/user/login')}>
						Đăng ký | Đăng nhập
					</Button>
					{/* Nếu bạn đã có component ModeToggle, có thể nhúng vào đây */}
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
