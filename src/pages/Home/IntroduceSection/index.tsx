// src/components/IntroSection.tsx
import { Row, Col, Typography, Card, Button } from 'antd';
import { CodeOutlined, DollarCircleOutlined, LinkOutlined } from '@ant-design/icons';
import './style.less';

const { Title, Paragraph } = Typography;

const IntroSection = () => {
  return (
    <div className="intro-section" id="introduce">
      <div className="container">
        <Title level={2} className="title">Tại sao chọn nền tảng rút gọn link của chúng tôi?</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card className="intro-card" bordered={false}>
              <LinkOutlined className="icon" />
              <Title level={4}>Rút gọn link siêu nhanh</Title>
              <Paragraph>Biến những đường dẫn dài dòng thành các liên kết ngắn gọn, dễ nhớ trong tích tắc.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="intro-card" bordered={false}>
              <CodeOutlined className="icon" />
              <Title level={4}>Developer API</Title>
              <Paragraph>API RESTful mạnh mẽ, giúp bạn tích hợp chức năng rút gọn link vào ứng dụng chỉ với vài dòng code.</Paragraph>
              <Button type="link" href="/docs/api" target="_blank">Xem tài liệu API →</Button>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="intro-card" bordered={false}>
              <DollarCircleOutlined className="icon" />
              <Title level={4}>Kiếm tiền từ link</Title>
              <Paragraph>Chia sẻ link và nhận hoa hồng từ lượt click – càng chia sẻ nhiều, thu nhập càng cao.</Paragraph>
              <Button type="link" href="/kiem-tien" target="_blank">Tìm hiểu thêm →</Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default IntroSection;
