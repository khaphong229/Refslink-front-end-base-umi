import React from 'react';
import { Input, Button, Typography, Card } from 'antd';
import './style.less';
import ClientLayout from '@/layouts/ClientLayout';
import { useModel } from 'umi';

const { TextArea } = Input;
const { Paragraph } = Typography;

const MassShrinker: React.FC = () => {
	const { urls, handleSubmit, setUrls, res, isLoading } = useModel('mass_shrinker');

	const shortenedLinks = res && Array.isArray(res) ? res.map((item) => item.data.shorten_link).join('\n') : '';

	return (
		<ClientLayout title='Mass Shrinker'>
			<Card className='mass-shrinker-card'>
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
				<Button type='primary' className='submit-button' onClick={handleSubmit} loading={isLoading}>
					Rút gọn
				</Button>
			</Card>

			{res && Array.isArray(res) && res.length > 0 && (
				<Card style={{ marginTop: '10px' }} title='Kết quả rút gọn'>
					<div className='result-section'>
						<TextArea rows={8} value={shortenedLinks} readOnly placeholder='Các link rút gọn sẽ hiển thị ở đây...' />
					</div>
				</Card>
			)}
		</ClientLayout>
	);
};

export default MassShrinker;
