import { Input, Space, Button, Card, Tooltip, Typography, Modal } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import '../style.less';
import dayjs from 'dayjs';
import { useLinkManager } from '@/models/link/link';
import type { LinkItem } from '@/services/ManagementLink/typing';
import { primaryColor } from '@/services/base/constant';

export default function CardLink({ link }: { link: LinkItem }) {
	const { Text } = Typography;
	const { confirm } = Modal;
	const { handleCopy, deleteLink } = useLinkManager();

	const handleDeleteLink = (item: LinkItem) => {
		confirm({
			title: 'Xác nhận xoá link?',
			content: `Bạn có chắc chắn muốn xoá link: ${item.alias || item.original_link}?`,
			onOk: () => deleteLink(item._id),
			okType: 'danger',
		});
	};

	return (
		<Card key={link._id} className='link-item'>
			<div className='link-header'>
				<Text
					strong
					className='link-header__textTop'
					style={{ color: primaryColor, display: 'block' }}
				>{`${link.alias} - ${link.original_link}`}</Text>
				<Text type='secondary' style={{ fontSize: '12px' }}>
					{dayjs(link.created_at).format('HH:mm:ss - DD/MM/YYYY')}
				</Text>
			</div>

			<div className='link-content'>
				<div className='original-link'>
					<Input
						value={link.original_link}
						readOnly
						style={{ marginBottom: 8 }}
						addonBefore={'Link gốc'}
						addonAfter={
							<Tooltip title='Sao chép'>
								<Button
									icon={<CopyOutlined style={{ color: primaryColor }} />}
									onClick={() => handleCopy(link.original_link)}
									type='text'
									size='small'
								/>
							</Tooltip>
						}
					/>
				</div>

				<div className='shortened-link'>
					<Input
						value={link.shorten_link}
						readOnly
						style={{ marginBottom: 8 }}
						addonBefore={'Link rút gọn'}
						addonAfter={
							<Tooltip title='Sao chép'>
								<Button
									icon={<CopyOutlined style={{ color: primaryColor }} />}
									onClick={() => handleCopy(link.shorten_link)}
									type='text'
									size='small'
								/>
							</Tooltip>
						}
					/>
				</div>
			</div>

			<div className='link-actions' style={{ display: 'flex', justifyContent: 'space-between' }}>
				{link.click_count !== undefined && (
					<Text type='secondary' style={{ fontSize: '12px' }}>
						Số lượt click: {link.click_count}
					</Text>
				)}
				<Space>
					<Button danger size='small' onClick={() => handleDeleteLink(link)} icon={<DeleteOutlined />}>
						Xoá
					</Button>
				</Space>
			</div>
		</Card>
	);
}
