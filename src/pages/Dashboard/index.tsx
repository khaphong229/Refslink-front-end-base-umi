import React from 'react';
import { Card, Col, Row, Table, Select } from 'antd';
import { EyeOutlined, LockOutlined, RetweetOutlined, LineChartOutlined } from '@ant-design/icons';
import './style.less';
import ClientLayout from '@/layouts/ClientLayout';
import LineChart from '@/components/Chart/LineChart';

const { Option } = Select;

const dataSource = [
  {
    key: '1',
    link: 'https://example.com/abc',
    views: 120,
    earnings: '$15',
  },
  // Thêm dữ liệu khác nếu muốn
];

const columns = [
	{
		title: 'Link',
		dataIndex: 'link',
		key: 'link',
	},
	{
		title: 'Lượt xem',
		dataIndex: 'views',
		key: 'views',
	},
	{
		title: 'Thu nhập',
		dataIndex: 'earnings',
		key: 'earnings',
	},
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Row justify="space-between" align="middle" className="header-row">
        <h2>Bảng điều khiển</h2>
        <Select defaultValue="05/2025" style={{ width: 140 }}>
          <Option value="05/2025">Tháng 05/2025</Option>
          <Option value="04/2025">Tháng 04/2025</Option>
        </Select>
      </Row>

      <Row gutter={[16, 16]} className="stat-row">
        <Col xs={12} sm={12} md={12} lg={6}>
          <Card className="stat-card orange" bordered={false}>
            <EyeOutlined className="icon" />
            <div className="value">0</div>
            <div>Tổng View</div>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <Card className="stat-card blue" bordered={false}>
            <LockOutlined className="icon" />
            <div className="value">$0,000</div>
            <div>Total Income</div>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <Card className="stat-card green" bordered={false}>
            <RetweetOutlined className="icon" />
            <div className="value">$0,000</div>
            <div>Referral Earnings</div>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <Card className="stat-card red" bordered={false}>
            <LineChartOutlined className="icon" />
            <div className="value">0</div>
            <div>Average CPM</div>
          </Card>
        </Col>
      </Row>

     <LineChart
        title="Thống kê lượt truy cập link"
        xAxis={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}
        yAxis={[[10, 20, 30, 500, 50, 60, 70, 30, 90, 50, 110, 120]]}
        yLabel={['Lượt truy cập']}
        height={300}
        type="area"
        colors={['#1f64ed']}
        otherOptions={{
          stroke: {
            curve: 'smooth',
          },
        }}
        formatY={(value: number) => `${value} lượt`}
        />
      

      <Card title="Top 10 link trong ngày" className="top-links">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ x: '100%' }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
