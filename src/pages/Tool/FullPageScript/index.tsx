import React from 'react';
import { Typography, Card, Select, Input, Button } from 'antd';
import './style.less';
import { useGenerateScriptModel } from '@/models/script_page';
import ClientLayout from '@/layouts/ClientLayout';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const FullPageScript: React.FC = () => {
	const { type, setType, domains, setDomains, handleSubmit, result, loading } = useGenerateScriptModel();
	console.log(result);

	return (
		<ClientLayout title='Full Page Script'>
			<div className='fullpage-script-wrapper'>
				<Paragraph>
					Nếu bạn có 100 hay 1000 liên kết từ website và bạn muốn rút gọn liên kết kiếm tiền với, hãy dùng mã sau trên
					website của bạn.
				</Paragraph>

				<Card>
					<Title level={4}>Trình tạo mã tập lệnh toàn trang</Title>

					<div className='form-group'>
						<label>Loại lựa chọn tên miền</label>
						<Select value={type} onChange={(value) => setType(value)} style={{ width: '100%' }}>
							<Option value='include'>Bao gồm</Option>
							<Option value='exclude'>Loại trừ</Option>
						</Select>
						<Paragraph type='secondary' style={{ marginTop: 8 }}>
							Bao gồm: Sử dụng tùy chọn này nếu bạn chỉ muốn rút ngắn các liên kết từ danh sách tên miền sau. <br />
							Loại trừ: Sử dụng tùy chọn này nếu bạn muốn rút ngắn mọi liên kết trên trang web của mình nhưng chỉ loại
							trừ các liên kết khỏi danh sách tên miền sau.
						</Paragraph>
					</div>

					<div className='form-group'>
						<label>Domains</label>
						<TextArea
							rows={5}
							value={domains}
							onChange={(e) => setDomains(e.target.value)}
							placeholder='mega.nz\n*.zippyshare.com\ndepositfiles.com'
						/>
						<Paragraph type='secondary' style={{ marginTop: 8 }}>
							Thêm từng tên miền vào một tên miền mới. Ngoài ra tên miền ký tự đại diện được cho phép. Vui lòng kiểm tra
							ví dụ sau: <br />
							mega.nz
							<br />
							*.zippyshare.com
							<br />
							depositfiles.com
						</Paragraph>
					</div>

					<Button type='primary' onClick={handleSubmit} loading={loading}>
						Phát ra
					</Button>
					{result && (
						<div className='form-group' style={{ marginTop: 24 }}>
							<label>Đoạn mã đã tạo</label>
							<TextArea rows={10} value={result.data} readOnly />
						</div>
					)}
				</Card>
			</div>
		</ClientLayout>
	);
};

export default FullPageScript;
