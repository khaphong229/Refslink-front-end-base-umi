import React from 'react';
import rules from '@/utils/rules';
import { Form, Input, Row, Col, Select, message, Button, Card } from 'antd';

const ChangePassForm: React.FC = () => {
	return (
		<Card>
			<h2>Đổi mật khẩu</h2>
			<Form layout="vertical">
                <Col>
                    <Form.Item label='Mật khẩu hiện tại' name='password'>
					    <Input placeholder='Mật khẩu hiện tại' />
				    </Form.Item>
                    <Form.Item label="Mật khẩu mới" name="new-pass">
                        <Input placeholder='Mật khẩu mới'/>
                    </Form.Item>
                    <Form.Item label="Nhập lại mật khẩu" >
                        <Input placeholder='Nhập lại mật khẩu mới'/>
                    </Form.Item>
                </Col>

                <Form.Item>
                    <Button type="primary" htmlType='submit'>
                        Đổi mật khẩu
                    </Button>
                </Form.Item>
			</Form>
		</Card>
	);
};

export default ChangePassForm;
