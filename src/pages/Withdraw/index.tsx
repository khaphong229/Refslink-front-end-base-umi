import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Button, Table, message } from 'antd';
import './style.less';
import ClientLayout from '@/layouts/ClientLayout';
import { useModel } from 'umi';
import { getWithdraws, createWithdraw, withdraw, getWithdraw } from '@/services/Withdraw';
import type { WithdrawItem } from '@/services/Withdraw/typing';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const WithdrawsPage: React.FC = () => {
	const { initialState } = useModel('@@initialState');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<WithdrawItem[]>([]);
	const [withdrawLoading, setWithdrawLoading] = useState(false);

	const columns = [
		{
			title: 'ID',
			dataIndex: 'withdraw_code',
			key: 'withdraw_code',
		},
		{
			title: 'Amount',
			dataIndex: 'amount_money',
			key: 'amount_money',
			render: (amount: number) => `$${amount}`,
		},
		{
			title: 'Method',
			dataIndex: 'payment_method',
			key: 'payment_method',
		},
		{
			title: 'Create date',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
		},
		{
			title: 'Scheduled Payment',
			dataIndex: 'scheduled_payment',
			key: 'scheduled_payment',
			render: (date: string | null) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-'),
		},
		{
			title: 'Paid',
			dataIndex: 'paid_time',
			key: 'paid_time',
			render: (date: string) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-'),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (status: string) => (
				<span
					style={{
						color: status === 'completed' ? '#52c41a' : status === 'pending' ? '#faad14' : '#ff4d4f',
					}}
				>
					{status.toUpperCase()}
				</span>
			),
		},
	];

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await getWithdraw();
			setData(response.data);
		} catch (error) {
			console.error('Failed to fetch withdraws:', error);
			message.error('Không thể tải lịch sử rút tiền');
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleWithdraw = async () => {
		const currentBalance = Number(initialState?.currentUser?.balance || 0);
		if (currentBalance <= 0) {
			message.error('Số dư không đủ để rút tiền');
			return;
		}

		setWithdrawLoading(true);
		try {
			await withdraw();
			message.success('Yêu cầu rút tiền đã được gửi thành công');
			fetchData(); // Refresh the list
		} catch (error) {
			console.error('Failed to create withdraw:', error);
			message.error('Không thể gửi yêu cầu rút tiền');
		}
		setWithdrawLoading(false);
	};

	return (
		<ClientLayout title='Rút tiền'>
			<div className='withdraws-container'>
				<Row gutter={30} className='stats-row'>
					<Col span={8}>
						<Card className='stat-card available'>
							<Title level={1} style={{ color: '#fff' }}>
								${initialState?.currentUser?.balance}
							</Title>
							<Text strong>Số dư hiện có</Text>
						</Card>
					</Col>
					<Col span={8}>
						<Card className='stat-card processing'>
							<Title level={1} style={{ color: '#fff' }}>
								${initialState?.currentUser?.being_paid}
							</Title>
							<Text strong>Đang thanh toán</Text>
						</Card>
					</Col>
					<Col span={8}>
						<Card className='stat-card total'>
							<Title level={1} style={{ color: '#fff' }}>
								${initialState?.currentUser?.total_payment}
							</Title>
							<Text strong>Tổng thanh toán</Text>
						</Card>
					</Col>
				</Row>

				<div className='withdraw-button-wrapper'>
					<Button type='primary' onClick={handleWithdraw} loading={withdrawLoading}>
						Rút tiền
					</Button>
				</div>

				<Card className='info-card'>
					<Paragraph>
						Khi tài khoản của bạn đạt đến số tiền tối thiểu trở lên, bạn có thể yêu cầu rút tiền bằng cách nhấp vào nút
						ở trên. Thanh toán sau đó sẽ được gửi đến tài khoản của bạn trong các ngày làm việc,
						<Text strong> không quá ngày</Text> sau khi yêu cầu. Vui lòng không liên hệ với chúng tôi về các khoản thanh
						toán trước ngày đến hạn.
					</Paragraph>
					<Paragraph>
						Để nhận được thanh toán, bạn cần chọn phương thức thanh toán và điền thông tin{' '}
						<a href='/settings/profile'>tại đây</a>
						(nếu bạn đã làm rồi thì bỏ qua). Và bạn cũng cần phải điền vài thông tin ở phần Chi tiết tài khoản.
					</Paragraph>
				</Card>

				<Card title='Lịch sử rút tiền' style={{ marginTop: 24 }}>
					<Table columns={columns} dataSource={data} rowKey='_id' loading={loading} />
				</Card>
			</div>
		</ClientLayout>
	);
};

export default WithdrawsPage;
