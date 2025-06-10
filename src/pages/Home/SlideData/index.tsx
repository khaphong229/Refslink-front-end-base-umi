import React, { useState, useEffect } from 'react';
import { Carousel, Button, Typography, Row, Col, Card } from 'antd';
import { 
  LinkOutlined, 
  ThunderboltOutlined, 
  BarChartOutlined, 
  CheckOutlined,
  ArrowRightOutlined 
} from '@ant-design/icons';
import './style.less';

const { Title, Paragraph } = Typography;

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
}

const slideData: SlideData[] = [
  {
    id: 1,
    title: "Rút Gọn Link Chuyên Nghiệp",
    subtitle: "Tạo link ngắn gọn, dễ nhớ trong giây lát",
    description: "Công cụ rút gọn link hàng đầu Việt Nam với tốc độ xử lý siêu nhanh và độ tin cậy cao",
    icon: <LinkOutlined style={{ fontSize: '4rem', color: '#fff' }} />,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    features: ["Miễn phí", "Không giới hạn", "Tùy chỉnh link"]
  },
  {
    id: 2,
    title: "Tốc Độ Ánh Sáng",
    subtitle: "Chuyển hướng nhanh chóng, không delay",
    description: "Hệ thống CDN toàn cầu đảm bảo tốc độ truy cập nhanh nhất từ mọi nơi trên thế giới",
    icon: <ThunderboltOutlined style={{ fontSize: '4rem', color: '#fff' }} />,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    features: ["CDN Toàn Cầu", "99.9% Uptime", "Tối ưu hiệu suất"]
  },
  {
    id: 3,
    title: "Thống Kê Chi Tiết",
    subtitle: "Theo dõi hiệu quả của từng link",
    description: "Dashboard thông minh với biểu đồ trực quan, phân tích lượt click theo thời gian thực",
    icon: <BarChartOutlined style={{ fontSize: '4rem', color: '#fff' }} />,
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    features: ["Analytics Realtime", "Báo cáo chi tiết", "Export dữ liệu"]
  },
  {
    id: 4,
    title: "Bảo Mật Tuyệt Đối",
    subtitle: "An toàn và đáng tin cậy",
    description: "Mã hóa SSL 256-bit, bảo vệ khỏi spam và malware với công nghệ AI tiên tiến",
    icon: <CheckOutlined style={{ fontSize: '4rem', color: '#fff' }} />,
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    features: ["SSL 256-bit", "Anti-Spam AI", "Scan Malware"]
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isAutoPlay) {
        setCurrentSlide((prev) => (prev + 1) % slideData.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handleSlideChange = (current: number) => {
    setCurrentSlide(current);
  };

  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  return (
    <div className="hero-slider-container">
      <Carousel
        autoplay={isAutoPlay}
        autoplaySpeed={5000}
        dots={true}
        fade={true}
        afterChange={handleSlideChange}
        className="hero-carousel"
      >
        {slideData.map((slide) => (
          <div key={slide.id}>
            <div 
              className="slide-content"
              style={{ background: slide.gradient }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Row align="middle" style={{ minHeight: '70vh' }}>
                <Col xs={24} lg={12} className="slide-text">
                  <div className="slide-icon animate-bounce">
                    {slide.icon}
                  </div>
                  <Title level={1} className="slide-title">
                    {slide.title}
                  </Title>
                  <Title level={3} className="slide-subtitle">
                    {slide.subtitle}
                  </Title>
                  <Paragraph className="slide-description">
                    {slide.description}
                  </Paragraph>
                  
                  <div className="features-list">
                    {slide.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="slide-actions">
                    <Button 
                      type="primary" 
                      size="large" 
                      className="cta-button"
                      icon={<ArrowRightOutlined />}
                    >
                      Bắt Đầu Ngay
                    </Button>
                    <Button 
                      size="large" 
                      className="demo-button"
                      ghost
                    >
                      Xem Demo
                    </Button>
                  </div>
                </Col>
                
                <Col xs={24} lg={12} className="slide-visual">
                  <Card className="demo-card" hoverable>
                    <div className="url-demo">
                      <div className="url-input">
                        <span>https://example.com/very-long-url-here</span>
                      </div>
                      <div className="arrow-down">↓</div>
                      <div className="url-output">
                        <span>short.ly/abc123</span>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        ))}
      </Carousel>
      
      {/* Custom Navigation Dots */}
      <div className="custom-dots">
        {slideData.map((_, index) => (
          <div
            key={index}
            className={`custom-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;