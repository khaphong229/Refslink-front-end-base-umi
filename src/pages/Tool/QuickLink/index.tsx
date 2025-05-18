import React, { useState } from 'react';
import { Card, Button, Typography, Input, Space } from 'antd';
import './style.less';

const { Title, Paragraph } = Typography;

const QuickLink: React.FC = () => {
  const [tokens, setTokens] = useState<string[]>([
    '677c9f2b90099e0e4532a53c',
  ]);

  const handleAddToken = () => {
    const newToken = Math.random().toString(36).substring(2, 34);
    setTokens([...tokens, newToken]);
  };

  return (
    <div className="quick-link-wrapper">
      <Title level={3}>Quick Link</Title>
      <Card className="token-box">
        <Paragraph className="token-title">API token của bạn:</Paragraph>
        <Space direction="vertical" style={{ width: '100%' }}>
          {tokens.map((token, index) => (
            <Input key={index} readOnly value={token} />
          ))}
        </Space>
      </Card>

      <Button onClick={handleAddToken} className="add-token-button">Tạo thêm token</Button>

      <Paragraph className="instructions">
        Mọi người đều có thể sử dụng cách ngắn nhất để rút gọn link với Link4M.
      </Paragraph>
      <Paragraph>
        Chỉ cần sao chép các liên kết bên dưới vào thanh địa chỉ trình duyệt của bạn, thay đổi <code>yourdestinationlink.com</code> bằng link bạn muốn rút gọn và nhấn ENTER. Link4M sẽ tự động rút gọn link. Sao chép nó bất cứ nơi nào bạn muốn chia sẻ và bạn sẽ được trả tiền từ link đó.
      </Paragraph>

      <Input
        readOnly
        value="https://link4m.co/st?api=677c9f2b90099e0e4532a53c&url=yourdestinationlink.com"
      />
    </div>
  );
};

export default QuickLink;
