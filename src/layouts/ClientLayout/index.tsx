import React from 'react';
import styles from './styles.less';
import { Typography } from 'antd';
import CreateLinkForm from '@/pages/LinkManagement/components/Form';
import { useLinkManager } from '@/models/link/link';

const { Title } = Typography;

export default function ClientLayout({ title, children }: { title: string; children: React.ReactNode }) {
	const { createLink } = useLinkManager();

	return (
		<div className={styles.clientLayout}>
			<div className={styles.clientLayout__header}>
				<Title level={3}>{title}</Title>
				<div className={styles.clientLayout__create_form}>
					<CreateLinkForm onCreate={createLink} />
				</div>
			</div>
			<div className={styles.clientLayout__content}>{children}</div>
		</div>
	);
}
