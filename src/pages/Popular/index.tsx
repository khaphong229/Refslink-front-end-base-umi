import React, { useState } from 'react';
import { Table, Select, Typography, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import './style.less';

const { Title } = Typography;
const { Option } = Select;

interface LinkRecord {
  id: string;
  originalUrl: string;
  shortUrl: string;
  views: number;
  earnings: number;
}

const mockData: LinkRecord[] = [
  {
    id: '1',
    originalUrl: 'https://anvaoday.blogspot.com/p/ealupae.html',
    shortUrl: 'https://link4m.com/jPzhIV',
    views: 0,
    earnings: 0,
  },
  {
    id: '2',
    originalUrl: 'https://modrinth.com/data/tool-trims',
    shortUrl: 'https://link4m.com/9KUeRj',
    views: 112,
    earnings: 12000,
  },
];

const PopularLinks: React.FC = () => {
  const [month, setMonth] = useState(dayjs().format('MM/YYYY'));

  const handleChangeMonth = (value: string) => {
    setMonth(value);
    // TODO: fetch data for that month
  };

  const columns: ColumnsType<LinkRecord> = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (_text, _record, index) => index + 1,
      width: 60,
    },
    {
      title: 'Links',
      dataIndex: 'originalUrl',
      key: 'originalUrl',
      render: url => <a href={url} target="_blank" rel="noreferrer">{url}</a>,
    },
    {
      title: 'Shorten Link',
      dataIndex: 'shortUrl',
      key: 'shortUrl',
      render: url => <a href={url} target="_blank" rel="noreferrer">{url}</a>,
    },
    {
      title: 'View',
      dataIndex: 'views',
      key: 'views',
      align: 'center',
      width: 80,
    },
    {
      title: 'Link Earnings',
      dataIndex: 'earnings',
      key: 'earnings',
      align: 'right',
      render: (amount: number) => `${amount.toLocaleString('vi-VN')}`,
    },
  ];

  const generateMonthOptions = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const monthValue = dayjs().subtract(i, 'month').format('MM/YYYY');
      return (
        <Option key={monthValue} value={monthValue}>
          Tháng {monthValue}
        </Option>
      );
    });
  };

  return (
    <div className="popular-link-page">
      <div className="popular-link-header">
        <Title level={3}>Popular link</Title>
        <Select
          style={{ width: 180 }}
          value={month}
          onChange={handleChangeMonth}
        >
          {generateMonthOptions()}
        </Select>
      </div>

      <Card
        title="🔥 Top 10 Links In Month"
        bordered
        headStyle={{ borderBottom: '2px solid #52c41a' }}
      >
        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default PopularLinks;
