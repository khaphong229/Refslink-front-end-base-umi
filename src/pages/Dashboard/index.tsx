import React, { useEffect } from 'react';
import { Card, Col, Row, Table, Select } from 'antd';
import { EyeOutlined, LockOutlined, RetweetOutlined, LineChartOutlined } from '@ant-design/icons';
import './style.less';
import ClientLayout from '@/layouts/ClientLayout';
import LineChart from '@/components/Chart/LineChart';
import { useModel } from 'umi';

const { Option } = Select;

const Dashboard: React.FC = () => {
	const { data, isLoading, paramsData, setParamsData, fetchDataDashboard, updateEarnings } = useModel('dashboard');

	useEffect(() => {
		fetchDataDashboard();

		updateEarnings();

		const intervalId = setInterval(updateEarnings, 2 * 60 * 60 * 1000);

		return () => clearInterval(intervalId);
	}, [paramsData]);

	const handleMonthChange = (value: string) => {
		const [month, year] = value.split('/');
		setParamsData({
			month: parseInt(month),
			year: parseInt(year),
		});
	};

	const generateMonthOptions = () => {
		const options = [];
		const dateNow = new Date();
		const currentDate = new Date(dateNow.getFullYear(), dateNow.getMonth());

		for (let i = 0; i < 12; i++) {
			const date = new Date(currentDate);
			date.setMonth(date.getMonth() - i);

			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			const value = `${month.toString().padStart(2, '0')}/${year}`;
			const label = `Tháng ${month.toString().padStart(2, '0')}/${year}`;

			options.push(
				<Option key={value} value={value}>
					{label}
				</Option>,
			);
		}

		return options;
	};

	const columns = [
		{
			title: 'Ngày',
			dataIndex: 'date',
			key: 'date',
		},
		{
			title: 'Lượt xem',
			dataIndex: 'views',
			key: 'views',
		},
		{
			title: 'Thu nhập',
			dataIndex: 'income',
			key: 'income',
			render: (value: number) => `$${value.toFixed(2)}`,
		},
		{
			title: 'CPM',
			dataIndex: 'cpm',
			key: 'cpm',
			render: (value: number) => `$${value}`,
		},
		{
			title: 'Thu nhập giới thiệu',
			dataIndex: 'referral_earnings',
			key: 'referral_earnings',
			render: (value: number) => `$${value.toFixed(2)}`,
		},
	];

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return `${date.getDate()}/${date.getMonth() + 1}`;
	};

	return (
		<ClientLayout title='Thống kê'>
			<div className='dashboard'>
				<Row align='middle' justify='end' className='header-row'>
					<Select value={`${paramsData.month}/${paramsData.year}`} onChange={handleMonthChange} style={{ width: 140 }}>
						{generateMonthOptions()}
					</Select>
				</Row>

				<Row gutter={[16, 16]} className='stat-row'>
					<Col xs={12} sm={12} md={12} lg={6}>
						<Card className='stat-card orange' bordered={false}>
							<EyeOutlined className='icon' />
							<div className='value'>{data?.total_valid_views || 0}</div>
							<div>Tổng View</div>
						</Card>
					</Col>
					<Col xs={12} sm={12} md={12} lg={6}>
						<Card className='stat-card blue' bordered={false}>
							<LockOutlined className='icon' />
							<div className='value'>${data?.total_earned || 0}</div>
							<div>Tổng thu nhập</div>
						</Card>
					</Col>
					<Col xs={12} sm={12} md={12} lg={6}>
						<Card className='stat-card green' bordered={false}>
							<RetweetOutlined className='icon' />
							<div className='value'>${data?.total_earned_referral || 0}</div>
							<div>Tổng thu nhập giới thiệu</div>
						</Card>
					</Col>
					<Col xs={12} sm={12} md={12} lg={6}>
						<Card className='stat-card red' bordered={false}>
							<LineChartOutlined className='icon' />
							<div className='value'>${data?.rate?.cpm || 0}</div>
							<div>CPM trung bình</div>
						</Card>
					</Col>
				</Row>

				<LineChart
					title='Thống kê lượt truy cập link'
					xAxis={data?.chart_data?.map((item) => formatDate(item.date)) || []}
					yAxis={[
						data?.chart_data?.map((item) => item.views) || [],
						data?.chart_data?.map((item) => item.earned) || [],
					]}
					yLabel={['Lượt truy cập', 'Thu nhập']}
					height={300}
					type='area'
					colors={['#1f64ed', '#52c41a']}
					otherOptions={{
						stroke: {
							curve: 'smooth',
						},
					}}
					formatY={(value: number) => `${value}`}
				/>

				<Card title='Thống kê chi tiết' className='top-links'>
					<Table
						dataSource={data?.table_data?.map((item, index) => ({ ...item, key: index })) || []}
						columns={columns}
						pagination={false}
						scroll={{ x: '100%' }}
						loading={isLoading}
					/>
				</Card>
			</div>
		</ClientLayout>
	);
};

export default Dashboard;
