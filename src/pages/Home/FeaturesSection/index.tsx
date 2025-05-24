// 1. Header/Navigation Component
import React, { useState } from 'react';
import {  Menu, Button, Avatar, Dropdown, Space, Badge } from 'antd';
import { 
  LinkOutlined, 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  MenuOutlined,
  BellOutlined
} from '@ant-design/icons';
import { Card, Form, Input, Switch, message, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { Row, Col,  } from 'antd';
import { 
  ThunderboltOutlined, 
  BarChartOutlined, 
  CheckOutlined,
  MobileOutlined,
  ApiOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Layout } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import './style.less';


const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <ThunderboltOutlined />,
      title: 'Tốc độ siêu nhanh',
      description: 'Rút gọn link trong tích tắc với công nghệ xử lý tiên tiến'
    },
    {
      icon: <BarChartOutlined />,
      title: 'Thống kê chi tiết',
      description: 'Theo dõi lượt click, vị trí địa lý và thời gian truy cập'
    },
    {
      icon: <CheckOutlined />,
      title: 'Bảo mật cao',
      description: 'Mã hóa SSL và bảo vệ khỏi spam, malware'
    },
    {
      icon: <MobileOutlined />,
      title: 'Tối ưu mobile',
      description: 'Giao diện responsive, hoạt động mượt trên mọi thiết bị'
    },
    {
      icon: <ApiOutlined />,
      title: 'API mạnh mẽ',
      description: 'Tích hợp dễ dàng với ứng dụng của bạn qua REST API'
    },
    {
      icon: <TeamOutlined />,
      title: 'Quản lý nhóm',
      description: 'Chia sẻ và quản lý link theo nhóm, phân quyền linh hoạt'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header">
          <h2>Tại sao chọn chúng tôi?</h2>
          <p>Những tính năng vượt trội giúp bạn quản lý link hiệu quả</p>
        </div>
        
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card className="feature-card" hoverable>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};


export {  FeaturesSection };