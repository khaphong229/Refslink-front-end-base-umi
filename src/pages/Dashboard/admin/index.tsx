import React from 'react';
import { Card, Col, Row, Table, Select } from 'antd';
import {
  EyeOutlined,
  LockOutlined,
  UserOutlined,
  RetweetOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import './style.less';
import DonutChart from '@/components/Chart/DonutChart';
import ColumnChart from '@/components/Chart/ColumnChart';
import LineChart from '@/components/Chart/LineChart';

const { Option } = Select;

const dataSource = [
  {
    key: '1',
    link: 'https://example.com/abc',
    views: 120,
    earnings: '$15',
  },
  // Thêm các dòng dữ liệu khác...
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

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Row justify="space-between" align="middle" className="header-row">
        <h2>Bảng điều khiển</h2>
        <Select defaultValue="05/2025" style={{ width: 120 }}>
          <Option value="05/2025">Tháng 05/2025</Option>
          <Option value="04/2025">Tháng 04/2025</Option>
        </Select>
      </Row>

      <Row gutter={16} className="stat-row">
              <Col span={6}>
                <Card className="stat-card orange" bordered={false}>
                  <EyeOutlined className="icon" />
                  <div className="value">0</div>
                  <div>Tổng View</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="stat-card blue" bordered={false}>
                  <UserOutlined className="icon" />
                  <div className="value">0</div>
                  <div>Số lượt người dùng</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="stat-card green" bordered={false}>
                  <RetweetOutlined className="icon" />
                  <div className="value">$0,000</div>
                  <div>Referral Earnings</div>
                </Card>
              </Col>
              <Col span={6}>
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

      <ColumnChart
        title="Thống kê người dùng"
        xAxis={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}
        yAxis={[[10, 20, 30, 200, 50, 60, 70, 30, 90, 50, 110, 120]]}
        yLabel={['Lượt xem']}
        height={300}
        type="bar"
        colors={['#FF5733']}
        formatY={(value: number) => `${value} người dùng`}
      
        />



  
    </div>
  );
};

export default Dashboard;
