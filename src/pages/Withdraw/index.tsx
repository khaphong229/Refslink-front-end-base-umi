import React from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import './style.less';
import ClientLayout from '@/layouts/ClientLayout';
import { useModel } from 'umi';

const { Title, Text, Paragraph } = Typography;

const WithdrawsPage: React.FC = () => {
	const { initialState } = useModel('@@initialState');
	return (
		<ClientLayout title='Rút tiền'>
			<div className='withdraws-container'>
				<Row gutter={30} className='stats-row'>
					<Col span={8}>
						<Card className='stat-card available'>
							<Title level={1} style={{ color: '#fff' }}>
								{initialState?.currentUser?.balance}$
							</Title>
							<Text strong>Số dư hiện có</Text>
						</Card>
					</Col>
					<Col span={8}>
						<Card className='stat-card processing'>
							<Title level={1} style={{ color: '#fff' }}>
								{initialState?.currentUser?.being_paid}$
							</Title>
							<Text strong>Đang thanh toán</Text>
						</Card>
					</Col>
					<Col span={8}>
						<Card className='stat-card total'>
							<Title level={1} style={{ color: '#fff' }}>
								{initialState?.currentUser?.total_payment}$
							</Title>
							<Text strong>Tổng thanh toán</Text>
						</Card>
					</Col>
				</Row>

				<div className='withdraw-button-wrapper'>
					<Button type='primary'>Rút tiền</Button>
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
			</div>
		</ClientLayout>
	);
};

export default WithdrawsPage;
