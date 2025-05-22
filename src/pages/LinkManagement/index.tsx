import React, { useState } from 'react';
import { Typography, Input, Space, Button, Empty, Card, Tooltip, Modal, message } from 'antd';
import { CopyOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useLinkManager } from '@/models/link/link';
import CreateLinkModal from './components/Form';
import { LinkItem } from '@/services/ManagementLink/typing';
import './style.less';
import dayjs from 'dayjs';
import ClientLayout from '@/layouts/ClientLayout';

const { Paragraph, Text } = Typography;
const { confirm } = Modal;

const LinkManagerPage: React.FC = () => {
	const {
		data,
		setSearch,
		createLink,
		deleteAll,
		deleteLink,
		handleExport,
		handleCopy,
		isPageModalOpen,
		setIsPageModalOpen, // Sử dụng state riêng cho page modal
	} = useLinkManager();

	return (
		<ClientLayout title='Quản lý link'>
			<div className='search-bar'>
				<Input
					placeholder='Tìm kiếm link'
					prefix={<SearchOutlined />}
					allowClear
					onChange={(e) => setSearch(e.target.value)}
					style={{ width: 300 }}
				/>
				<Space>
					<Button
						danger
						icon={<DeleteOutlined />}
						onClick={() =>
							confirm({
								title: 'Xác nhận xoá toàn bộ?',
								onOk: deleteAll,
								okType: 'danger',
							})
						}
					>
						Xoá tất cả
					</Button>
				</Space>
				<Button onClick={handleExport} type='primary'>
					Xuất file
				</Button>
			</div>

			<div className='link-list'>
				{data.length > 0 ? (
					data.map((link: LinkItem) => (
						<Card key={link._id} className='link-item'>
							<Paragraph copyable={{ text: link.original_link }}>{link.original_link}</Paragraph>
							<Text type='secondary'>{dayjs(link.created_at).format('DD/MM/YYYY HH:mm:ss')}</Text>
							<Input
								value={link.shorten_link}
								readOnly
								addonAfter={
									<Tooltip title='Sao chép'>
										<Button icon={<CopyOutlined />} onClick={() => handleCopy(link.shorten_link)} type='text' />
									</Tooltip>
								}
							/>
							<Space>
								<Button danger onClick={() => deleteLink(link._id)}>
									Xoá
								</Button>
							</Space>
						</Card>
					))
				) : (
					<Empty description='Không có link nào' />
				)}
			</div>

			{/* Modal riêng cho page */}
			<CreateLinkModal onCreate={createLink} isModalOpen={isPageModalOpen} setIsModalOpen={setIsPageModalOpen} />
		</ClientLayout>
	);
};

export default LinkManagerPage;
