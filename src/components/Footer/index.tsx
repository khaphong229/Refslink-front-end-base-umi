import { Layout, Row, Col, Space } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import './style.less'

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer className="app-footer">
      <div className="container">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} lg={6}>
            <div className="footer-section">
              <div className="footer-logo">
                <LinkedinOutlined />
                <span>ShortLink</span>
              </div>
              <p>Công cụ rút gọn link hàng đầu Việt Nam</p>
              <Space size="large">
                <FacebookOutlined className="social-icon" />
                <TwitterOutlined className="social-icon" />
                <LinkedinOutlined className="social-icon" />
              </Space>
            </div>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <div className="footer-section">
              <h4>Sản phẩm</h4>
              <ul>
                <li><a href="#">Rút gọn link</a></li>
                <li><a href="#">QR Code</a></li>
                <li><a href="#">Analytics</a></li>
                <li><a href="#">API</a></li>
              </ul>
            </div>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <div className="footer-section">
              <h4>Hỗ trợ</h4>
              <ul>
                <li><a href="#">Trung tâm trợ giúp</a></li>
                <li><a href="#">Liên hệ</a></li>
                <li><a href="#">Báo cáo lỗi</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <div className="footer-section">
              <h4>Liên hệ</h4>
              <div className="contact-info">
                <div><MailOutlined /> support@shortlink.vn</div>
                <div><PhoneOutlined /> 1900 1234</div>
              </div>
            </div>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <p>&copy; 2024 ShortLink. All rights reserved.</p>
        </div>
      </div>
    </Footer>
  );
};
export default AppFooter;