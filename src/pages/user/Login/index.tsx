import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less';

interface LoginFormProps {
  onSuccess?: (values: any) => void;
  onRegisterClick?: () => void;
  onForgotPassword?: () => void;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onRegisterClick,
  onForgotPassword,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setSubmitting(true);
      // Here you would typically send the login request to your API
      // const response = await loginApi(values.username, values.password);
      
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('Đăng nhập thành công!');
      
      if (onSuccess) {
        onSuccess(values);
      }
    } catch (error) {
      message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">Đăng nhập</h1>
        <p className="login-subtitle">Vui lòng nhập thông tin đăng nhập của bạn</p>
        
        <Form
          form={form}
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Tên đăng nhập" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>
          
          <Form.Item>
            <div className="login-form-options">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              
              <Button 
                type="link" 
                className="login-form-forgot" 
                onClick={onForgotPassword}
              >
                Quên mật khẩu?
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={submitting || loading}
              size="large"
            >
              Đăng nhập
            </Button>
          </Form.Item>
          
          <div className="login-form-register">
            Chưa có tài khoản? 
            <Button type="link" onClick={onRegisterClick}>
              Đăng ký ngay!
            </Button>
          </div>

		    <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={submitting || loading}
              size="small"
            >
              Đăng nhập với Google
            </Button>
          </Form.Item>
		  
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;