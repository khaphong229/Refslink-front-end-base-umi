import React, { useState } from 'react';
import { Input, Button, Card, Space, Tooltip, message, Typography, Empty, Modal, Form } from 'antd';
import {
	CopyOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
	SearchOutlined,
	DeleteOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import './style.less';
import CreateLinkModal from './components/Form';

const { Title, Text, Paragraph, Link } = Typography;
const { confirm } = Modal;

interface LinkItem {
	id: string;
	originalUrl: string;
	shortUrl: string;
	createdAt: string;
	clicks: number;
	visible: boolean;
}

const mockLinks: LinkItem[] = [
	{
		id: '1',
		originalUrl: 'https://modrinth.com/datapack/tool-trims/version/2.2.2',
		shortUrl: 'https://link4m.com/9KUeRj',
		createdAt: '10:29 18/01/2025',
		clicks: 52,
		visible: true,
	},
	{
		id: '2',
		originalUrl: 'https://anvaoday.blogspot.com/p/ealupae.html',
		shortUrl: 'https://link4m.com/jPzhIV',
		createdAt: '17:27 17/01/2025',
		clicks: 33,
		visible: true,
	},
	{
		id: '3',
		originalUrl: 'https://drive.google.com/drive/folders/abcxyz',
		shortUrl: 'https://link4m.com/6TzTi98',
		createdAt: '09:16 17/01/2025',
		clicks: 88,
		visible: false,
	},
];

const LinkSimpleManager: React.FC = () => {
	const [data, setData] = useState<LinkItem[]>(mockLinks);
	const [search, setSearch] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();

	const handleToggle = (id: string) => {
		setData((prev) => prev.map((link) => (link.id === id ? { ...link, visible: !link.visible } : link)));
	};

	const handleCopy = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => message.success('Đã sao chép link!'))
			.catch(() => message.error('Sao chép thất bại'));
	};

	const handleDelete = (id: string) => {
		confirm({
			title: 'Bạn có chắc chắn muốn xoá link này?',
			okType: 'danger',
			onOk: () => {
				setData((prev) => prev.filter((link) => link.id !== id));
				message.success('Đã xoá link');
			},
		});
	};

	const handleHideAll = () => {
		setData((prev) => prev.map((link) => ({ ...link, visible: false })));
		message.success('Đã ẩn toàn bộ link');
	};

	const handleShowAll = () => {
		setData((prev) => prev.map((link) => ({ ...link, visible: true })));
		message.success('Đã hiện toàn bộ link');
	};

	const handleCreateLink = () => {
		form.validateFields().then((values) => {
			const newLink: LinkItem = {
				id: Date.now().toString(),
				originalUrl: values.originalUrl,
				shortUrl: `https://link4m.com/${Math.random().toString(36).substring(2, 8)}`,
				createdAt: new Date().toLocaleString('vi-VN'),
				clicks: 0,
				visible: true,
			};
			setData((prev) => [newLink, ...prev]);
			form.resetFields();
			setIsModalOpen(false);
			message.success('Tạo link thành công!');
		});
	};

	const handleDeleteAll = () => {
		confirm({
			title: 'Bạn có chắc chắn muốn xoá TẤT CẢ link?',
			content: 'Hành động này không thể hoàn tác!',
			okText: 'Xoá tất cả',
			okType: 'danger',
			cancelText: 'Huỷ',
			onOk: () => {
				setData([]);
				message.success('Đã xoá toàn bộ link');
			},
		});
	};

	const filteredLinks = data.filter(
		(link) =>
			link.originalUrl.toLowerCase().includes(search.toLowerCase()) ||
			link.shortUrl.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className='link-simple-manager'>
			

			<Title level={3}>Quản lý link</Title>
			<Button type='primary' icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
				Tạo Link
			</Button>
			

			<div className='search-bar'>
				<Input
					placeholder='Alias'
					prefix={<SearchOutlined />}
					allowClear
					onChange={(e) => setSearch(e.target.value)}
					style={{ width: 300 }}
				/>
				<Button onClick={() => setSearch('')}>Đặt lại</Button>
				<Space>
					<Button icon={<EyeInvisibleOutlined />} onClick={handleHideAll}>
						Ẩn tất cả
					</Button>
					<Button icon={<EyeOutlined />} onClick={handleShowAll}>
						Hiện tất cả
					</Button>
					<Button danger icon={<DeleteOutlined />} onClick={handleDeleteAll}>
						Xoá tất cả
					</Button>
				</Space>
			</div>

			<div className='link-list'>
				{filteredLinks.length > 0 ? (
					filteredLinks.map((link) => (
						<Card key={link.id} className='link-item' bordered>
							<div className='link-header'>
								<Link href={link.originalUrl} target='_blank'>
									<Paragraph copyable={{ text: link.originalUrl }} strong>
										{link.originalUrl}
									</Paragraph>
								</Link>
							</div>
							<Text type='secondary'>Stats - 🗓 {link.createdAt}</Text>

							<div className='short-link-box'>
								<Input
									value={link.shortUrl}
									readOnly
									addonAfter={
										<Tooltip title='Sao chép'>
											<Button icon={<CopyOutlined />} onClick={() => handleCopy(link.shortUrl)} type='text' />
										</Tooltip>
									}
								/>
							</div>

							<div className='actions'>
								<Space>
									<Button type='primary' danger={!link.visible} onClick={() => handleToggle(link.id)}>
										{link.visible ? 'Ẩn' : 'Hiện'}
									</Button>
									<Button danger onClick={() => handleDelete(link.id)}>
										Xoá
									</Button>
								</Space>
							</div>
						</Card>
					))
				) : (
					<Empty description='Không có link nào' />
				)}
			</div>
      <CreateLinkModal
        visible={isModalOpen}
        onCancel={()=> setIsModalOpen(false)}
        onCreate={handleCreateLink}
      />
		</div>
	);
};

export default LinkSimpleManager;
