import React, { useEffect } from 'react';
import { Card, Typography, Input, Space } from 'antd';
import './style.less';

import { history, useModel } from 'umi';

import ClientLayout from '@/layouts/ClientLayout';
import { primaryColor, tenTruongVietTatTiengAnh } from '@/services/base/constant';
import { ipRoot } from '@/utils/ip';

const { Paragraph } = Typography;

const QuickLink: React.FC = () => {
	const { apiToken, getToken } = useModel('api_token');
	const pathName = history.location.pathname;

	useEffect(() => {
		getToken();
	}, []);

	return (
		<ClientLayout title={pathName === '/tools/quick' && 'Quick Link'}>
			<div className='quick-link-wrapper'>
				<Card className='token-box' style={{ backgroundColor: primaryColor }}>
					<Paragraph className='token-title'>API token của bạn:</Paragraph>
					<Space direction='vertical' style={{ width: '100%' }}>
						<Input readOnly value={apiToken} />
					</Space>
				</Card>

				<Paragraph className='instructions'>
					Mọi người đều có thể sử dụng cách ngắn nhất để rút gọn link với {tenTruongVietTatTiengAnh}.
				</Paragraph>
				<Paragraph>
					Chỉ cần sao chép các liên kết bên dưới vào thanh địa chỉ trình duyệt của bạn, thay đổi{' '}
					<code>yourdestinationlink.com</code> bằng link bạn muốn rút gọn và nhấn ENTER. {tenTruongVietTatTiengAnh} sẽ
					tự động rút gọn link. Sao chép nó bất cứ nơi nào bạn muốn chia sẻ và bạn sẽ được trả tiền từ link đó.
				</Paragraph>

				<Input readOnly value={`${ipRoot}/st?token=${apiToken}&url=yourdestinationlink.com`} />
			</div>
		</ClientLayout>
	);
};

export default QuickLink;
