// 7. Recent Links Management Component
import { Table, Tag, Tooltip, Space, Input, DatePicker,message,Card,Button } from 'antd';
import { 
  CopyOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import React, { useState } from 'react';
import './style.less';

const RecentLinks: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const mockData = [
    {
      key: '1',
      originalUrl: 'https://example.com/very-long-url-that-needs-shortening',
      shortUrl: 'short.ly/abc123',
      clicks: 156,
      createdAt: '2024-01-15',
      status: 'active',
      customAlias: 'my-link'
    },
    {
      key: '2',
      originalUrl: 'https://another-example.com/another-very-long-url',
      shortUrl: 'short.ly/def456',
      clicks: 89,
      createdAt: '2024-01-14',
      status: 'active',
      customAlias: null
    },
    {
      key: '3',
      originalUrl: 'https://third-example.com/yet-another-long-url',
      shortUrl: 'short.ly/ghi789',
      clicks: 234,
      createdAt: '2024-01-13',
      status: 'expired',
      customAlias: 'promo-2024'
    }
  ];

  const columns = [
    {
      title: 'Link gốc',
      dataIndex: 'originalUrl',
      key: 'originalUrl',
      render: (url: string) => (
        <Tooltip title={url}>
          <span className="truncate-text">
            {url.length > 50 ? `${url.substring(0, 50)}...` : url}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Link rút gọn',
      dataIndex: 'shortUrl',
      key: 'shortUrl',
      render: (shortUrl: string) => (
        <div className="short-url-cell">
          <span className="short-url-text">{shortUrl}</span>
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(`https://${shortUrl}`);
              message.success('Đã sao chép!');
            }}
          />
        </div>
      ),
    },
    {
      title: 'Lượt click',
      dataIndex: 'clicks',
      key: 'clicks',
      sorter: (a: any, b: any) => a.clicks - b.clicks,
      render: (clicks: number) => (
        <span className="clicks-count">{clicks.toLocaleString()}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status === 'active' ? 'Hoạt động' : 'Hết hạn'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (record: any) => (
        <Space size="small">
          <Tooltip title="Xem thống kê">
            <Button type="text" size="small" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button type="text" size="small" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button type="text" size="small" icon={<DeleteOutlined />} danger />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <section className="recent-links-section">
      <div className="container">
        <Card className="links-management-card">
          <div className="card-header">
            <h3>Quản lý link của bạn</h3>
            <Space>
              <Input
                placeholder="Tìm kiếm link..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
              />
              <Button icon={<FilterOutlined />}>Lọc</Button>
            </Space>
          </div>

          <Table
            columns={columns}
            dataSource={mockData}
            loading={loading}
            pagination={{
              total: mockData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} của ${total} link`,
            }}
            className="links-table"
          />
        </Card>
      </div>
    </section>
  );
};
export default RecentLinks;