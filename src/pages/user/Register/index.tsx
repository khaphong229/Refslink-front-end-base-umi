import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  message,
  Select,
  DatePicker
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
  PhoneOutlined 
} from '@ant-design/icons';
import './style.less';
import { useHistory } from 'react-router';

const { Option } = Select;

interface RegisterFormProps {
  onSuccess?: (values: any) => void;
  onLoginClick?: () => void;
  loading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onLoginClick,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const history= useHistory();

  const handleLoginClick = () =>{
    history.push("/login")
  }

  const handleSubmit = async (values: any) => {
    try {
      setSubmitting(true);
      // Here you would typically send the registration request to your API
      // const response = await registerApi(values);
      
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('Đăng ký tài khoản thành công!');
      
      if (onSuccess) {
        onSuccess(values);
      }
    } catch (error) {
      message.error('Đăng ký thất bại. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h1 className="register-title">Đăng ký tài khoản</h1>
        <p className="register-subtitle">Vui lòng điền thông tin đăng ký dưới đây</p>
        
        <Form
          form={form}
          name="register"
          className="register-form"
          initialValues={{ prefix: '84' }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Họ và tên"
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Số điện thoại"
              size="large"
              addonBefore={
                <Form.Item name="prefix" noStyle>
                  <Select style={{ width: 70 }}>
                    <Option value="84">+84</Option>
                    <Option value="86">+86</Option>
                    <Option value="1">+1</Option>
                  </Select>
                </Form.Item>
              }
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Xác nhận mật khẩu"
              size="large"
            />
          </Form.Item>
          
          <Form.Item>
            <Form.Item name="agreement" valuePropName="checked" noStyle
              rules={[
                { 
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý điều khoản sử dụng!')),
                }
              ]}
            >
              <Checkbox>
                Tôi đã đọc và đồng ý với <a href="#">điều khoản sử dụng</a>
              </Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
              loading={submitting || loading}
              size="large"
            >
              Đăng ký
            </Button>
          </Form.Item>
          
          <div className="register-form-login">
            Đã có tài khoản? 
            <Button type="link" onClick={handleLoginClick}>
              Đăng nhập ngay!
            </Button>
          </div>
          
          <div className="register-social">
            <p className="register-social-divider">
              <span>Hoặc đăng ký với</span>
            </p>
            
            <Form.Item>
              <Button
                type="primary"
                className="register-form-button register-google-button"
                size="large"
                icon={<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>}
              >
                Đăng ký với Google
              </Button>
            </Form.Item>
            
           
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;