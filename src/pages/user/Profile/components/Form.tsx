import { Card, Col, Form, Row, Input, Radio, Table, Button, message } from 'antd';
import React, { useEffect } from 'react';
import rules from '@/utils/rules';
import AvatarUpload from './Upload';
import { getProfile, updateProfile } from '@/services/User'; // Giả sử bạn có một hàm updateProfile trong services
import { useModel } from 'umi';



const withdrawMethods = [
	{ label: 'Paypal', value: 'paypal' },
	{ label: 'Bank Transfer', value: 'bank' },
	{ label: 'Momo', value: 'momo' },
	{ label: 'Payeer', value: 'payeer' },
];

const minAmountData = [
	{ key: '1', method: 'PayPal', amount: '$20' },
	{ key: '2', method: 'Chuyển khoản Ngân hàng', amount: '$20' },
	{ key: '3', method: 'Momo', amount: '$20' },
];

const ProfileForm: React.FC = () => {
	const [form] = Form.useForm();
	const { profile, getProfile } = useModel('profile'); // Giả sử bạn có một hàm getProfile trong services

useEffect(() => {
  const fetch = async () => {
    const data = await getProfile(); // getProfile có return data
    if (data) {
      form.setFieldsValue(data); // Gán dữ liệu vào form
    }
  };
  fetch();
}, []);



	const onFinish = async (values:any) => {
		try {
			await updateProfile({
				avatar: values.avatar,
				full_name: values.full_name,
				name: values.name,
				address: values.address,
				phone: values.phone,
				country: values.country,
				method_withdraw: values.method_withdraw,
				info_withdraw: values.info_withdraw,
			});
			message.success('Profile updated successfully');
		} catch (error) {
			console.error('Failed to update profile:', error);
		}
	};

	return (
		<Card>
			<h2>Hồ sơ cá nhân</h2>
			<Form layout='vertical' onFinish={onFinish} form={form}>
				<Row gutter={20}>
					<Col>
						<Form.Item label='Ảnh đại diện' name='avatar'>
							<AvatarUpload />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item label='Họ tên' name='name' rules={[...rules.ten, ...rules.required]}>
							<Input placeholder='Họ tên' value={profile.name} />
						</Form.Item>
						<Form.Item label='Họ tên' name='full_name' rules={[...rules.ten, ...rules.required]}>
							<Input placeholder='Họ tên' />
						</Form.Item>
						<Form.Item label='Địa chỉ' name='address' >
							<Input placeholder='Địa chỉ' value={profile.address}/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='Số điện thoại' name='phone' rules={[...rules.soDienThoai, ...rules.required]}>
							<Input placeholder='Số điện thoại' />
						</Form.Item>
						<Form.Item label='Quốc gia' name='country'>
							<Input placeholder='Quốc gia' />
						</Form.Item>
					</Col>
				</Row>
				<h2>Địa chỉ Thanh toán </h2>
				<Row gutter={20}>
					<Col span={12}>
						{/* <Form.Item label='Nguồn lưu lượng' name='traffic_source'>
							<Input.TextArea rows={4} />
						</Form.Item> */}

						<Form.Item label='Withdrawl Method' name='method_withdraw'>
							<Radio.Group options={withdrawMethods} optionType='button' />
						</Form.Item>

						<Form.Item label='Paypal Email' name='info_withdraw'>
							<Input />
						</Form.Item>

						<ul style={{ paddingLeft: 20 }}>
							<li>Để nhận tiền qua Paypal, Payza, Skrill và Perfect Money, hãy điền Email của tài khoản đó.</li>
							<li>Để nhận tiền qua Bitcoin, hãy điền địa chỉ wallet của bạn.</li>
							<li>Để nhận tiền qua WebMoney, hãy điền Ví WMZ của bạn.</li>
							<li>Để nhận tiền qua Payeer, hãy điền Email hoặc Số điện thoại đăng ký Payeer.</li>
							<li>
								Để nhận tiền qua Ngân hàng, hãy điền Số tài khoản, Tên chủ tài khoản, Tên ngân hàng, Chi nhánh của ngân
								hàng, Số điện thoại liên hệ.
							</li>
						</ul>

						<Button type='primary' htmlType='submit' >
							Submit
						</Button>
					</Col>

					<Col span={12}>
						<Table
							pagination={false}
							dataSource={minAmountData}
							columns={[
								{
									title: 'Phương thức rút tiền',
									dataIndex: 'method',
									key: 'method',
								},
								{
									title: 'Minimum Withdrawal Amount',
									dataIndex: 'amount',
									key: 'amount',
								},
							]}
							bordered
							size='small'
						/>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default ProfileForm;
