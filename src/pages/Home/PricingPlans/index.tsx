// 6. Pricing Plans Component
import React from 'react';
import { Card, Button, List, Badge, Row, Col, Switch ,Avatar} from 'antd';
import { CheckOutlined, CrownOutlined, RocketOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './style.less';

const PricingPlans: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Miễn phí',
      price: 0,
      yearlyPrice: 0,
      icon: <CheckOutlined />,
      popular: false,
      features: [
        '10 link/tháng',
        'Thống kê cơ bản',
        'Link tồn tại 30 ngày',
        'Hỗ trợ email'
      ],
      buttonText: 'Bắt đầu miễn phí',
      buttonType: 'default' as const
    },
    {
      name: 'Pro',
      price: 49000,
      yearlyPrice: 490000,
      icon: <RocketOutlined />,
      popular: true,
      features: [
        'Không giới hạn link',
        'Thống kê chi tiết',
        'Link tùy chỉnh',
        'Không có quảng cáo',
        'Hỗ trợ 24/7',
        'API access'
      ],
      buttonText: 'Chọn gói Pro',
      buttonType: 'primary' as const
    },
    {
      name: 'Enterprise',
      price: 99000,
      yearlyPrice: 990000,
      icon: <CrownOutlined />,
      popular: false,
      features: [
        'Tất cả tính năng Pro',
        'White-label',
        'Quản lý nhóm',
        'SSO integration',
        'Dedicated support',
        'Custom analytics'
      ],
      buttonText: 'Liên hệ tư vấn',
      buttonType: 'default' as const
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <section className="pricing-section">
      <div className="container">
        <div className="section-header">
          <h2>Chọn gói phù hợp với bạn</h2>
          <p>Linh hoạt, minh bạch và không ràng buộc</p>
          
          <div className="billing-toggle">
            <span className={!isYearly ? 'active' : ''}>Hàng tháng</span>
            <Switch 
              checked={isYearly} 
              onChange={setIsYearly}
              className="billing-switch"
            />
            <span className={isYearly ? 'active' : ''}>
              Hàng năm 
              <Badge count="Giảm 17%" className="discount-badge" />
            </span>
          </div>
        </div>

        <Row gutter={[24, 24]} justify="center">
          {plans.map((plan, index) => (
            <Col xs={24} lg={8} key={index}>
              <Card 
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                hoverable
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <Badge.Ribbon text="Phổ biến nhất" color="red" />
                  </div>
                )}
                
                <div className="plan-header">
                  <div className="plan-icon">{plan.icon}</div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price-amount">
                      {plan.price === 0 ? 'Miễn phí' : `${formatPrice(isYearly ? plan.yearlyPrice : plan.price)}đ`}
                    </span>
                    {plan.price > 0 && (
                      <span className="price-period">
                        /{isYearly ? 'năm' : 'tháng'}
                      </span>
                    )}
                  </div>
                  {isYearly && plan.price > 0 && (
                    <div className="yearly-savings">
                      Tiết kiệm {formatPrice(plan.price * 12 - plan.yearlyPrice)}đ/năm
                    </div>
                  )}
                </div>

                <List
                  className="features-list"
                  dataSource={plan.features}
                  renderItem={(feature) => (
                    <List.Item className="feature-item">
                      <CheckOutlined className="feature-check" />
                      <span>{feature}</span>
                    </List.Item>
                  )}
                />

                <Button
                  type={plan.buttonType}
                  size="large"
                  block
                  className="plan-button"
                >
                  {plan.buttonText}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};



export { 
  PricingPlans, 
};