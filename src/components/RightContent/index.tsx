import React from 'react';
import { history, useModel } from 'umi';
import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';
export type SiderTheme = 'light' | 'dark';
import { Button } from 'antd';

const GlobalHeaderRight: React.FC = () => {
	const { initialState } = useModel('@@initialState');

	if (!initialState || !initialState.currentUser) {
		return null;
	}
	const isAdminRoute = history.location.pathname.includes('admin');

	return (
		<div className={styles.right}>
			{!isAdminRoute && (
				<Button type='primary' style={styles.btnCreate}>
					Tạo Link rút gọn
				</Button>
			)}
			{/* <ModuleSwitch /> */}
			{/* <NoticeIconView /> */}

			{/* <Tooltip title='Giới thiệu chung' placement='bottom'>
				<a onClick={() => history.push('/gioi-thieu')}>
					<InfoCircleOutlined />
				</a>
			</Tooltip> */}

			<AvatarDropdown menu />
		</div>
	);
};

export default GlobalHeaderRight;
