import React, { useState } from 'react';
import { Typography, Card, Button, Input, Space } from 'antd';
import './style.less';
import QuickLink from '../QuickLink';

const { Title, Paragraph, Text } = Typography;

const DevelopersApi: React.FC = () => {
  const [tokens, setTokens] = useState<string[]>([
    '677c9f2b90099e0e4532a53c',
    '6826a351d5679210c6398a67',
    '6826a353ed837201d5080806',
  ]);

  const handleAddToken = () => {
    const newToken = Math.random().toString(36).substring(2, 34);
    setTokens([...tokens, newToken]);
  };

  const jsonResponse = `{"status":"success","shortenedUrl":"https:\\/\\/my.link4m.com\\/xxxxxx"}`;
  const phpCode = `$long_url = urlencode('yourdestinationlink.com');
$api_token = '677c9f2b90099e0e4532a53c';
$api_url = "https://link4m.co/api-shorten/v2?api={$api_token}&url={$long_url}";
$result = @json_decode(file_get_contents($api_url), TRUE);
if($result["status"] !== 'success'){
    echo $result["message"];
} else {
    echo $result["shortenedUrl"];
}`;

  return (
    <div className="developers-api-wrapper">
        <QuickLink/>
      <Paragraph>You will get a JSON response like the following</Paragraph>

      <Card className="code-block">
        <code>{jsonResponse}</code>
      </Card>

      <Title level={4}>Using the API in PHP</Title>
      <Paragraph>
        To use the API in your PHP application, you need to send a GET request via file_get_contents or cURL. Please check the below sample examples using file_get_contents:
      </Paragraph>

      <Card className="code-block">
        <pre>{phpCode}</pre>
      </Card>
    </div>
  );
};

export default DevelopersApi;
