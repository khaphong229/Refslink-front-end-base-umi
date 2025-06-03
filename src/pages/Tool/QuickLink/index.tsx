import React, { useEffect, useState } from 'react';
import { Card, Button, Typography, Input, Space } from 'antd';
import './style.less';
import { getApiToken } from '@/services/APIToken';
import { useModel } from 'umi';
import { get } from 'lodash';
import ClientLayout from '@/layouts/ClientLayout';

const { Title, Paragraph } = Typography;

const QuickLink: React.FC = () => {
	const { apiToken, getToken } = useModel('api_token');

	useEffect(() => {
		getToken();
	}, []);

	return (
		<ClientLayout title='Quick link'>
			<div className='quick-link-wrapper'>
				<Card className='token-box'>
					<Paragraph className='token-title'>API token của bạn:</Paragraph>
					<Space direction='vertical' style={{ width: '100%' }}>
						<Input readOnly value={apiToken} />
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

				<Input readOnly value={`https://refslink.com/st?api=${apiToken}&url=yourdestinationlink.com`} />
			</div>
		</ClientLayout>
	);
};

export default QuickLink;
