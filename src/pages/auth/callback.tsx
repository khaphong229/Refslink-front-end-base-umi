import React, { useEffect } from 'react';
import { useDispatch, useLocation } from 'umi';
import { Spin } from 'antd';
import { history } from 'umi';

const GoogleCallback: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      dispatch({
        type: 'auth/googleCallback',
        payload: { code },
      }).then(() => {
        history.push('/'); // Redirect to home page after successful login
      });
    } else {
      history.push('/login'); // Redirect to login if no code is present
    }
  }, [dispatch, location]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" tip="Processing login..." />
    </div>
  );
};

export default GoogleCallback; 