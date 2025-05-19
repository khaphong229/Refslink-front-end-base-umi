import React from 'react';
import { Card, Typography, Input, Button, Table, message, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './style.less';

const { Title, Text } = Typography;

interface ReferralHistoryItem {
  key: string;
  referredUser: string;
  date: string;
  earnings: string;
}

const referralData: ReferralHistoryItem[] = [
  {
    key: '1',
    referredUser: 'nguyenvana',
    date: '2025-05-01',
    earnings: '$2.00',
  },
  {
    key: '2',
    referredUser: 'lethib',
    date: '2025-05-10',
    earnings: '$1.50',
  },
];

const ReferralPage: React.FC = () => {
  const referralCode = 'ABC123';
  const referralLink = `https://yourdomain.com/register?ref=${referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      message.success('Đã sao chép link giới thiệu!');
    } catch (err) {
      message.error('Không thể sao chép liên kết');
    }
  };

  const columns = [
    {
      title: 'Người được giới thiệu',
      dataIndex: 'referredUser',
      key: 'referredUser',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Hoa hồng',
      dataIndex: 'earnings',
      key: 'earnings',
    },
  ];

  return (
    <div className="referral-page">
      <Title level={3}>Chương trình Giới thiệu</Title>
      <Card className="referral-card">
        <Text strong>Mã giới thiệu của bạn:</Text>
        <Input value={referralCode} readOnly className="referral-code" />

        <Text strong className="referral-link-label">Link chia sẻ nhanh:</Text>
        <Space>
          <Input value={referralLink} readOnly style={{ width: 400 }} />
          <Button icon={<CopyOutlined />} onClick={copyToClipboard}>
            Sao chép
          </Button>
        </Space>
      </Card>

      <Card title="Lịch sử giới thiệu" className="referral-history">
        <Table
          columns={columns}
          dataSource={referralData}
          pagination={false}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default ReferralPage;
