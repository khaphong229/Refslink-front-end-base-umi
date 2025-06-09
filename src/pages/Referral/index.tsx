import React, { useEffect } from 'react';
import { Card, Typography, Input, Button, Table, Space, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './style.less';
import ClientLayout from '@/layouts/ClientLayout';
import { useModel } from 'umi';
import dayjs from 'dayjs';
import { primaryColor } from '@/services/base/constant';
import { useLinkManager } from '@/models/link/link';

const { Text } = Typography;

const ReferralPage: React.FC = () => {
	const { initialState } = useModel('@@initialState');
	const {
		loading,
		referralData,
		referralLink,

		fetchReferralData,
		copyToClipboard,
	} = useModel('referal');

	const { handleCopy } = useLinkManager();

	useEffect(() => {
		fetchReferralData();
	}, []);

	const columns = [
		{
			title: 'Người được giới thiệu',
			dataIndex: 'name',
			key: 'name',
			render: (name: string) => <span style={{ fontWeight: 'bold' }}>{name}</span>,
		},
		{
			title: 'Ngày',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
		},
		{
			title: 'Hoa hồng',
			dataIndex: 'total_earned',
			key: 'total_earned',
			render: (amount: number) => `$${amount.toLocaleString()}`,
		},
	];

	return (
		<ClientLayout title='Giới thiệu bạn bè'>
			<div className='referral-page'>
				<Card className='referral-card'>
					<Input
						value={initialState?.currentUser?.ref_code}
						readOnly
						style={{ marginBottom: 8 }}
						addonBefore={'Mã giới thiệu của bạn'}
						className='referral-code'
						addonAfter={
							<Tooltip title='Sao chép'>
								<Button
									icon={<CopyOutlined style={{ color: primaryColor }} />}
									onClick={() => handleCopy(initialState?.currentUser?.ref_code)}
									type='text'
									size='small'
								/>
							</Tooltip>
						}
					/>
					<Input
						value={referralLink}
						readOnly
						style={{ marginBottom: 8 }}
						addonBefore={'Link chia sẻ nhanh'}
						className='referral-code'
						addonAfter={
							<Tooltip title='Sao chép'>
								<Button
									icon={<CopyOutlined style={{ color: primaryColor }} />}
									onClick={() => handleCopy(referralLink)}
									type='text'
									size='small'
								/>
							</Tooltip>
						}
					/>
				</Card>

				<Card title='Lịch sử giới thiệu' className='referral-history'>
					<Table columns={columns} dataSource={referralData} pagination={false} rowKey='_id' loading={loading} />
				</Card>
			</div>
		</ClientLayout>
	);
};

export default ReferralPage;
