import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) message.error('Chỉ hỗ trợ file JPG/PNG!');
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) message.error('Ảnh phải nhỏ hơn 2MB!');
  return isJpgOrPng && isLt2M;
};

export default function AvatarUpload() {
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange = (info: any) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageUrl(reader.result as string));
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      // action="upload-api-url" nếu có API upload
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%',  }} /> : <PlusOutlined />}
    </Upload>
  );
}
