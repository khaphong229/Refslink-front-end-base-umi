import React, { useState } from 'react';
import { Input, Button, Typography, Card } from 'antd';
import './style.less';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const MassShrinker: React.FC = () => {
  const [urls, setUrls] = useState('');

  const handleSubmit = () => {
    const urlList = urls.split('\n').filter(line => line.trim() !== '');
    if (urlList.length > 20) {
      alert('Chỉ nhập tối đa 20 URL!');
      return;
    }
    console.log('Submit URLs:', urlList);
    // TODO: Call backend to shrink URLs
  };

  return (
      <Card className="mass-shrinker-card">
        <Title level={3}>Mass Shrinker</Title>
        <Paragraph>
          Nhập tối đa 20 URL (trên mỗi dòng) để rút gọn link và sẽ được thêm thống kê tài khoản của bạn
        </Paragraph>
        <Paragraph type="secondary">
          Lưu ý: Chức năng 'Mass Shrinker' có thể bị tắt nếu bị lạm dụng. Chỉ tạo link mà bạn sẽ thực sự sử dụng.
        </Paragraph>
        <TextArea
          rows={8}
          value={urls}
          onChange={e => setUrls(e.target.value)}
          placeholder="Dán các URL vào đây, mỗi dòng một link..."
        />
        <Button type="primary" className="submit-button" onClick={handleSubmit}>
          Submit
        </Button>
      </Card>
  );
};

export default MassShrinker;
