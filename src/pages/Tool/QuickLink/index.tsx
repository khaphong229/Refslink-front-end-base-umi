import React, { useEffect, useState } from 'react';
import { Card, Button, Typography, Input, Space } from 'antd';
import './style.less';
import { getApiToken } from '@/services/APIToken';
import { useModel } from 'umi';

const { Title, Paragraph } = Typography;

const QuickLink: React.FC = () => {
	const [token, setToken] = useState<string>();
	const {record, getModel,danhSach} = useModel('api_token')

	useEffect(() => {
		getModel();
		setToken(record?.token);
	}, [record]);

	
	return (
		<div className='quick-link-wrapper'>
			<Title level={3}>Quick Link</Title>
			<Card className='token-box'>
				<Paragraph className='token-title'>API token của bạn:</Paragraph>
				<Space direction='vertical' style={{ width: '100%' }}>
					<Input readOnly value={token} />
				</Space>
			</Card>

			<Paragraph className='instructions'>
				Mọi người đều có thể sử dụng cách ngắn nhất để rút gọn link với Link4M.
			</Paragraph>
			<Paragraph>
				Chỉ cần sao chép các liên kết bên dưới vào thanh địa chỉ trình duyệt của bạn, thay đổi{' '}
				<code>yourdestinationlink.com</code> bằng link bạn muốn rút gọn và nhấn ENTER. Link4M sẽ tự động rút gọn link.
				Sao chép nó bất cứ nơi nào bạn muốn chia sẻ và bạn sẽ được trả tiền từ link đó.
			</Paragraph>

			<Input readOnly value={`https://link4m.co/st?api=${token}c&url=yourdestinationlink.com`} />
		</div>
	);
};

export default QuickLink;
