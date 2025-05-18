// src/components/ConnectSection.tsx
import { Row, Col, Typography } from 'antd';
import './style.less';

const { Title, Paragraph, Link } = Typography;

const ConnectSection = () => {
  return (
    <div className="connect-section" id='connect'>
      <div className="connect-header">
        <Link href="" target="_blank" className="community-link">
          Cộng đồng Link4M.com
        </Link>
        <Title level={2} className="title">
          Kết nối với <span className="gradient-text">Chúng tôi</span>
        </Title>
      </div>

      <div className="connect-box">
        <Row gutter={0}>
          <Col xs={24} md={8} className="connect-item">
            <img src="https://cdn.pixabay.com/photo/2021/06/15/12/51/facebook-6338509_1280.png" alt="Facebook" className="icon" />
            <Title level={4}>Facebook</Title>
            <Paragraph>Fanpage chính thức</Paragraph>
          </Col>

          <Col xs={24} md={8} className="connect-item border-x">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_dbOUeCrOBe-mkfGD-fEjQNECJrkromWTYg&s" alt="Telegram" className="icon" />
            <Title level={4}>Telegram</Title>
            <Paragraph>Chanel thông báo</Paragraph>
          </Col>

          <Col xs={24} md={8} className="connect-item">
            <img src="https://kb.pavietnam.vn/wp-content/uploads/2021/08/email-la-gi.jpg" alt="Email" className="icon" />
            <Title level={4}>Email</Title>
            <Paragraph>info@link4m.com</Paragraph>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ConnectSection;
