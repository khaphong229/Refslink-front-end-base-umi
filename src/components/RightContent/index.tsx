import React from 'react';
import { useModel } from 'umi';
import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';
export type SiderTheme = 'light' | 'dark';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const GlobalHeaderRight: React.FC = () => {
	const { initialState } = useModel('@@initialState');

	if (!initialState || !initialState.currentUser) {
		return null;
	}

	return (
		<div className={styles.right}>
			{/* <ModuleSwitch /> */}
			<Button type='primary'>
				Tạo Link
			</Button>
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
