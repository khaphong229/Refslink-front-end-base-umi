// src/pages/VerifyEmail.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

function VerifyEmail() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    // Lấy token từ URL path thay vì query parameter
    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const token = pathParts[pathParts.length - 1]; // Lấy phần cuối cùng của URL path
    
    console.log('Token:', token);
    
    if (token && token.length > 10) { // Kiểm tra token có tồn tại và hợp lệ
      // Sử dụng port 8000 thay vì 3111
      axios.post(`http://localhost:8000/auth/verify-email/${token}`)
        .then((response) => {
          console.log('Verification success:', response);
          setStatus('active');
        })
        .catch((error) => {
          console.error('Verification error:', error);
          setStatus('inactive');
        });
    } else {
      setStatus('invalid');
    }
  }, []);

  return (
    <div className="popup">
      {status === 'loading' && <p>🔄 Đang xác minh tài khoản...</p>}
      {status === 'active' && <p>✅ Xác minh thành công! Bạn có thể đăng nhập.</p>}
      {status === 'inactive' && <p>❌ Token đã hết hạn hoặc không hợp lệ.</p>}
      {status === 'invalid' && <p>⚠️ Thiếu mã xác minh.</p>}
    </div>
  )
}

export default VerifyEmail