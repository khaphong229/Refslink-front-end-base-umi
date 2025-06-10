import { landingUrl } from '@/services/base/constant';
import {
	SettingOutlined,
	SolutionOutlined,
	LogoutOutlined,
	SwapOutlined,
	UserOutlined,
	DollarOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { type ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { useModel } from 'umi';
import { OIDCBounder } from '../OIDCBounder';
import HeaderDropdown from './HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
	menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
	const { initialState } = useModel('@@initialState');

	const loginOut = () => OIDCBounder?.getActions()?.dangXuat();

	if (!initialState || !initialState.currentUser)
		return (
			<span className={`${styles.action} ${styles.account}`}>
				<Spin size='small' style={{ marginLeft: 8, marginRight: 8 }} />
			</span>
		);

	const fullName = initialState.currentUser?.family_name
		? `${initialState.currentUser.family_name} ${initialState.currentUser?.given_name ?? ''}`
		: initialState.currentUser?.name ?? (initialState.currentUser?.preferred_username || '');
	const lastNameChar = fullName.split(' ')?.at(-1)?.[0]?.toUpperCase();

	const userRole = localStorage.getItem('user_role');

	const items: ItemType[] = [
		{
			key: 'name',
			icon: <UserOutlined />,
			label: fullName,
		},
		{ type: 'divider', key: 'divider' },
		
	];

	if (userRole === 'client'){
		items.push(
			{
			key: 'withdraw',
			icon: <DollarOutlined />,
			label: 'Rút tiền',
			onClick: () => {
				const redirect = window.location.href;
				window.location.href = `/withdraws`;
			},
		},
		{
			key: 'password',
			icon: <SettingOutlined />,
			label: 'Cài đặt',
			onClick: () => {
				const redirect = window.location.href;
				window.location.href = `/settings/profile`;
			},
		},
		{
			key: 'support',
			icon: <SolutionOutlined />,
			label: 'Hỗ trợ',
			onClick: () => {
				const redirect = window.location.href;
				window.location.href = `/support`;
			},
		},
		)
	}


	items.push(
		{ type: 'divider', key: 'divider' },
		{
			key: 'logout',
			icon: <LogoutOutlined />,
			label: 'Đăng xuất',
			onClick: loginOut,
			danger: true,
		},
	);

	return (
		<>
			<HeaderDropdown overlay={<Menu className={styles.menu} items={items} />}>
				<span className={`${styles.action} ${styles.account}`}>
					<Avatar
						className={styles.avatar}
						src={initialState.currentUser?.avatar ? <img src={initialState.currentUser?.avatar} /> : undefined}
						icon={!initialState.currentUser?.avatar ? lastNameChar ?? <UserOutlined /> : undefined}
						alt='avatar'
					/>
					<span className={`${styles.name}`}>{fullName}</span>
				</span>
			</HeaderDropdown>
		</>
	);
};

export default AvatarDropdown;
