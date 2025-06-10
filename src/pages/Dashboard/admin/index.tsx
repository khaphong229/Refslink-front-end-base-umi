import React, { useEffect } from 'react';
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
import { useModel } from 'umi';
const { Option } = Select;




const Dashboard = () => {
  const {data, fetchDataDashboard,linkChart,fetchLinkStatistics,fetchUserStatistics,userChart} = useModel('dashboard_admin');

  useEffect(() => {
    fetchDataDashboard();
    fetchLinkStatistics();
    fetchUserStatistics();
  }, []);



const yAxis = [(linkChart ?? []).map((item: { _id: string; count: number }) => item.count)];

 
const useryAxis = [(userChart ?? []).map((item: { _id: string; count: number }) => item.count)];


  


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
                  <div className="value">{data?.totalView}</div>
                  <div>Tổng View</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="stat-card blue" bordered={false}>
                  <UserOutlined className="icon" />
                  <div className="value">{data?.totalUsers}</div>
                  <div>Số lượt người dùng</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="stat-card green" bordered={false}>
                  <RetweetOutlined className="icon" />
                  <div className="value">{data?.referralEarnings}</div>
                  <div>Referral Earnings</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="stat-card red" bordered={false}>
                  <LineChartOutlined className="icon" />
                  <div className="value">{data?.averageCPM}</div>
                  <div>Average CPM</div>
                </Card>
              </Col>
            </Row>
      

      <LineChart
        title="Thống kê lượt truy cập link"
        xAxis={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}
        yAxis={yAxis}
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
        yAxis={useryAxis}
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
