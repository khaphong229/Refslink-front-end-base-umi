import React, { useState } from 'react';
import { Typography, Input, Space, Button, Empty, Card, Tooltip, Modal, message } from 'antd';
import {
  CopyOutlined, DeleteOutlined, EyeOutlined, EyeInvisibleOutlined, PlusOutlined, SearchOutlined,
} from '@ant-design/icons';
import { useLinkManager } from '@/models/link/link';
import CreateLinkModal from './components/Form';
import { LinkItem } from '@/services/ManagementLink/typing';
import './style.less';

const { Title, Paragraph, Text } = Typography;
const { confirm } = Modal;

const LinkManagerPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data, setSearch, createLink, deleteAll, deleteLink,
    toggleVisibility, hideAll, showAll,
  } = useLinkManager();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('Đã sao chép link!');
    });
  };

  return (
    <div className="link-simple-manager">
      <Title level={3}>Quản lý link</Title>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
        Tạo Link
      </Button>

      <div className="search-bar">
        <Input
          placeholder="Tìm kiếm link"
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Space>
          <Button icon={<EyeInvisibleOutlined />} onClick={hideAll}>Ẩn tất cả</Button>
          <Button icon={<EyeOutlined />} onClick={showAll}>Hiện tất cả</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => confirm({
            title: 'Xác nhận xoá toàn bộ?',
            onOk: deleteAll,
            okType: 'danger',
          })}>Xoá tất cả</Button>
        </Space>
      </div>

      <div className="link-list">
        {data.length > 0 ? (
          data.map((link: LinkItem) => (
            <Card key={link.id} className="link-item">
              <Paragraph copyable={{ text: link.originalUrl }}>{link.originalUrl}</Paragraph>
              <Text type="secondary">🗓 {link.createdAt}</Text>
              <Input
                value={link.shortUrl}
                readOnly
                addonAfter={
                  <Tooltip title="Sao chép">
                    <Button icon={<CopyOutlined />} onClick={() => handleCopy(link.shortUrl)} type="text" />
                  </Tooltip>
                }
              />
              <Space>
                <Button type="primary" danger={!link.visible} onClick={() => toggleVisibility(link.id)}>
                  {link.visible ? 'Ẩn' : 'Hiện'}
                </Button>
                <Button danger onClick={() => deleteLink(link.id)}>Xoá</Button>
              </Space>
            </Card>
          ))
        ) : (
          <Empty description="Không có link nào" />
        )}
      </div>

      <CreateLinkModal
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onCreate={createLink}
      />
    </div>
  );
};

export default LinkManagerPage;
