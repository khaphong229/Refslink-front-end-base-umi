import React from 'react';
import { Form, Input, Button, message} from 'antd';
import rules from '@/utils/rules';
import { useModel } from 'umi';

// interface FormValues extends Support.Record {}

const { TextArea } = Input;

const SupportForm: React.FC = (props:any) => {
	const [form] = Form.useForm();
	const { postModel } = useModel('support.user');

	

	const handleSubmit = async(values: any) => {
		try {
			await postModel(values)
			form.resetFields();
			message.success('Gửi yêu cầu thành công');
		}	catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
			<Form form={form} style={{maxWidth:800}}   layout='vertical' onFinish={handleSubmit} >
				<Form.Item  name='full_name' label='Họ và tên' rules={[...rules.required, ...rules.ten]}>
					<Input placeholder='Nguyễn Văn A' />
				</Form.Item>

				<Form.Item name='email' label='Email' rules={[...rules.email, ...rules.text, ...rules.required]}>
					<Input placeholder='nguyenvana@gmail.com'></Input>
				</Form.Item>

				<Form.Item label='Chủ đề' name='subject' rules={[...rules.required, ...rules.text]}>
					<Input placeholder='Ví dụ: Không thể rút gọn link' />
				</Form.Item>

				<Form.Item label='Mô tả chi tiết' name='description' rules={[...rules.required, ...rules.description]}>
					<TextArea rows={4} placeholder='Mô tả chi tiết vấn đề của bạn' />
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Gửi yêu cầu
					</Button>
				</Form.Item>
			</Form>
	);
};

export default SupportForm;
