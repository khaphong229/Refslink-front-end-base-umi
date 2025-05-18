import React from 'react';
import { Typography, Card } from 'antd';
import './style.less';

const { Title, Paragraph } = Typography;

const FullPageScript: React.FC = () => {
  const script1 = `<script type="text/javascript">
  var link4m_url = 'https://link4m.co/';
  var link4m_api_token = '677c9f2b90099e0e4532a53c';
  var link4m_advert = 2;
  var link4m_domains = ['depositfiles.com', 'uploading.com', 'uploadable.ch'];
</script>
<script src='//link4m.co/js/full-script.js'></script>`;

  const script2 = `<script type="text/javascript">
  var link4m_url = 'https://link4m.co/';
  var link4m_api_token = '677c9f2b90099e0e4532a53c';
  var link4m_advert = 2;
  var link4m_exclude_domains = ['example.com', 'yoursite.com'];
</script>
<script src='//link4m.co/js/full-script.js'></script>`;

  return (
    <div className="fullpage-wrapper">
      <Title level={3}>Full Page Script</Title>

      <Paragraph>
        If you have a website with 100's or 1000's of links you want to change over to Link4m,
        then please use the script below.
      </Paragraph>
      <Paragraph>
        Simply copy-and-paste the code below on to your webpage or blog and the links will be
        updated automatically!
      </Paragraph>
      <Paragraph>
        You can add or remove any domains for the code that you use on your website.
      </Paragraph>

      <Card className="code-block">
        <pre>{script1}</pre>
      </Card>

      <Paragraph>
        Or if you wish to change every link to Link4m on your website (without stating exactly which
        domains), please use the following code.
      </Paragraph>

      <Card className="code-block">
        <pre>{script2}</pre>
      </Card>
    </div>
  );
};

export default FullPageScript;
