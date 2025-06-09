import React from 'react';
import { history, useModel } from 'umi';
import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';
export type SiderTheme = 'light' | 'dark';
import { Button, Typography } from 'antd';
import { useLinkManager } from '@/models/link/link';
import CreateLinkForm from '@/pages/LinkManagement/components/Form';

const { Paragraph } = Typography;

const GlobalHeaderRight: React.FC = () => {
	const { initialState } = useModel('@@initialState');
	const { createLink, isModalOpen, setIsModalOpen } = useLinkManager();

	if (!initialState || !initialState.currentUser) {
		return null;
	}
	const isAdminRoute = history.location.pathname.includes('admin');

	return (
		<div className={styles.right}>
			{!isAdminRoute && (
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Button type='primary' style={styles.btnCreate} onClick={() => setIsModalOpen(true)}>
						Tạo Link rút gọn
					</Button>
					<Paragraph strong style={{ margin: '0 10px' }}>
						Số dư: {initialState.currentUser.balance}$
					</Paragraph>
				</div>
			)}
			{/* <ModuleSwitch /> */}
			{/* <NoticeIconView /> */}

			{/* <Tooltip title='Giới thiệu chung' placement='bottom'>
				<a onClick={() => history.push('/gioi-thieu')}>
					<InfoCircleOutlined />
				</a>
			</Tooltip> */}

			<AvatarDropdown menu />

			{/* Thêm CreateLinkForm component để render modal */}
			{!isAdminRoute && (
				<CreateLinkForm onCreate={createLink} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
			)}
		</div>
	);
};

export default GlobalHeaderRight;
