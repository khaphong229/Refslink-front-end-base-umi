import React, { useState } from 'react';
import { Input, Button, Typography, Card, message } from 'antd';
import axios from 'axios';
import './style.less';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const MassShrinker: React.FC = () => {
	const [urls, setUrls] = useState('');
	const token = 'aW2z6ogcxMjLOQCzePGbDyvzenxfQalK';

	const handleSubmit = async () => {
		const urlList = urls
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line !== '');
		if (urlList.length > 20) {
			alert('Chỉ nhập tối đa 20 URL!');
			return;
		}

		try {
			const response = await axios.post('http://localhost:3111/st/bulk', {
				token,
				urls: urlList,
			});

			console.log('Response:', response.data);
			message.success('Đã gửi thành công!');
		} catch (error) {
			console.error('Error:', error);
			message.error('Có lỗi xảy ra khi gửi URL!');
		}
	};

	return (
		<Card className='mass-shrinker-card'>
			<Title level={3}>Mass Shrinker</Title>
			<Paragraph>
				Nhập tối đa 20 URL (trên mỗi dòng) để rút gọn link và sẽ được thêm thống kê tài khoản của bạn
			</Paragraph>
			<Paragraph type='secondary'>
				Lưu ý: Chức năng 'Mass Shrinker' có thể bị tắt nếu bị lạm dụng. Chỉ tạo link mà bạn sẽ thực sự sử dụng.
			</Paragraph>
			<TextArea
				rows={8}
				value={urls}
				onChange={(e) => setUrls(e.target.value)}
				placeholder='Dán các URL vào đây, mỗi dòng một link...'
			/>
			<Button type='primary' className='submit-button' onClick={handleSubmit}>
				Submit
			</Button>
		</Card>
	);
};

export default MassShrinker;
