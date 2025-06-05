import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useDispatch } from 'umi';

const GoogleLogin: React.FC = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch({
      type: 'auth/googleLogin',
    });
  };

  return (
    <Button
      type="primary"
      icon={<GoogleOutlined />}
      onClick={handleGoogleLogin}
      style={{ width: '100%' }}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleLogin; 