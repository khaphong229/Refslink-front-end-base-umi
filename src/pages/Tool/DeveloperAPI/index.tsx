import React, { useState } from 'react';
import { Typography, Card, Button, Input, Space } from 'antd';
import './style.less';
import QuickLink from '../QuickLink';
import ClientLayout from '@/layouts/ClientLayout';
import { ipRoot } from '@/utils/ip';

const { Title, Paragraph } = Typography;

const DevelopersApi: React.FC = () => {
	const api = localStorage.getItem('apiToken');

	const jsonResponse = `{"status":"success","shortenedUrl":"${ipRoot}/xxxxxx"}`;
	const phpCode = `$long_url = urlencode('yourdestinationlink.com');
$api_token = '${api}';
$api_url = "${ipRoot}/api?api={$api_token}&url={$long_url}&alias=CustomAlias";
$result = @json_decode(file_get_contents($api_url), TRUE);
if($result["status"] !== 'success'){
    echo $result["message"];
} else {
    echo $result["shortenedUrl"];
}`;

	return (
		<ClientLayout title='Developers API'>
			<div className='developers-api-wrapper'>
				<QuickLink />
				<div style={{ marginTop: 10 }}>
					<Paragraph>
						Dành cho nhà phát triển sử dụng <strong>API</strong> sẽ trả về phản hồi trong định dạng{' '}
						<strong>JSON</strong>. Liên Kết giống mẫu bên dưới:
					</Paragraph>
					<Paragraph>Hiện tại chỉ có mộtcách mà bạn có thể dùng để rút ngắn liên kết của bạn. mẫu bên dưới:</Paragraph>
					<Paragraph>
						Tất cả những gì bạn cần làm là <strong>GỬI</strong> cầu với API và Liên Kết giống mẫu bên dưới:
					</Paragraph>

					<Card className='code-block'>
						<code>
							{`${ipRoot}/api?api=`}
							<span style={{ fontWeight: 'bold' }}>{api}</span>
							{`&url=`}
							<span style={{ fontWeight: 'bold' }}>yourdestinationlink.com</span>
							{`&alias=`}
							<span style={{ fontWeight: 'bold' }}>CustomAlias</span>
						</code>
					</Card>

					<Paragraph>Bạn sẽ nhận được phản hồi JSON như sau</Paragraph>

					<Card className='code-block'>
						<code>{jsonResponse}</code>
					</Card>

					<Title level={4}>Sử dụng API trong PHP</Title>
					<Paragraph>
						Để sử dụng API trong ứng dụng PHP của bạn, bạn cần gửi một yêu cầu GET qua file_get_contents hoặc cURL. Vui
						lòng kiểm tra ví dụ dưới đây bằng cách sử dụng file_get_contents
					</Paragraph>

					<Paragraph>Sử dụng phản hồi JSON</Paragraph>

					<Card className='code-block'>
						<code>{phpCode}</code>
					</Card>
				</div>
			</div>
		</ClientLayout>
	);
};

export default DevelopersApi;
