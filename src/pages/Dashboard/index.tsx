import React from 'react';
import { Card, Col, Row, Table, Select } from 'antd';
import {
  EyeOutlined,
  LockOutlined,
  RetweetOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import './style.less';

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
            <div>Total View</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="stat-card blue" bordered={false}>
            <LockOutlined className="icon" />
            <div className="value">$0,000</div>
            <div>Total Income</div>
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

      <Card title="Top 10 link trong ngày" className="top-links">
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Card>
    </div>
  );
};

export default Dashboard;
