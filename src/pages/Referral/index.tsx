import React, { useEffect } from 'react';
import { Card, Typography, Input, Button, Table, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './style.less';
import ClientLayout from '@/layouts/ClientLayout';
import { useModel } from 'umi';
import dayjs from 'dayjs';

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
			render: (amount: number) => `${amount.toLocaleString()}$`,
		},
	];

	return (
		<ClientLayout title='Giới thiệu bạn bè'>
			<div className='referral-page'>
				<Card className='referral-card'>
					<Text strong style={{ marginRight: 8 }}>
						Mã giới thiệu của bạn:
					</Text>
					<Input value={initialState?.currentUser?.ref_code} readOnly className='referral-code' />
					<Text strong className='referral-link-label'>
						Link chia sẻ nhanh:
					</Text>
					<Space>
						<Input value={referralLink} readOnly style={{ width: 400 }} />
						<Button icon={<CopyOutlined />} onClick={copyToClipboard}>
							Sao chép
						</Button>
					</Space>
				</Card>

				<Card title='Lịch sử giới thiệu' className='referral-history'>
					<Table columns={columns} dataSource={referralData} pagination={false} rowKey='_id' loading={loading} />
				</Card>
			</div>
		</ClientLayout>
	);
};

export default ReferralPage;
