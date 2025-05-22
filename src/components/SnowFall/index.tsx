// SnowBackground.tsx
import React from 'react';
import Snowfall from 'react-snowfall';

const SnowBackground = () => {
  return (
    <>
      {/* Hiệu ứng tuyết phủ toàn màn hình */}
      <Snowfall
        style={{
        //   position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex:0,
          top: 0,
        }}
        snowflakeCount={80} // Số bông tuyết
        color="#ff6b61" // Màu tuyết – bạn có thể dùng #fff nếu nền tối
      />
    </>
  );
};

export default SnowBackground;
