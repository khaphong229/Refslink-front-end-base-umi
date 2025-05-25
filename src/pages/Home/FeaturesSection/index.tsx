import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { 
  ThunderboltOutlined, 
  BarChartOutlined, 
  CheckOutlined,
  MobileOutlined,
  ApiOutlined,
  TeamOutlined
} from '@ant-design/icons';
import './style.less';

const FeaturesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Tại sao chọn chúng tôi?</h2>
            <p>Những tính năng vượt trội giúp bạn quản lý link hiệu quả</p>
          </div>
          
          <div className="features-slider">
            <Row gutter={[24, 24]}>
              {features.map((feature, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Card 
                    className={`feature-card ${index === currentIndex ? 'active' : ''}`}
                    hoverable={index !== currentIndex}
                  >
                    <div className="feature-content">
                      <div className="feature-icon">{feature.icon}</div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="slider-controls">
              <div className="dots-container">
                {features.map((_, index) => (
                  <Button
                    key={index}
                    type={index === currentIndex ? 'primary' : 'default'}
                    shape="circle"
                    size="small"
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => handleDotClick(index)}
                  />
                ))}
              </div>
              
              {/* <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentIndex + 1) / features.length) * 100}%` }}
                />
              </div>
              
              <div className="counter">
                <span className="current">{currentIndex + 1}</span>
                <span className="separator">/</span>
                <span className="total">{features.length}</span>
              </div> */}
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export { FeaturesSection };