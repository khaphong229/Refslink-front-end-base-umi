// import axios from '@/utils/axios'; // dùng axios đã config sẵn token, error, v.v.
import { LinkItem } from './typing';
import axios from 'axios';

const API_URL = 'http://localhost:3111';

export const getLinks = async () => {
  const response = await axios.get(`${API_URL}/shorten_link`);
  console.log(response.data); // 👈 log ra để xem đúng không
  return response?.data?.data?.data;
};


export const createShortLink = async (originalUrl: string): Promise<LinkItem> => {
  const response = await axios.post(`${API_URL}/shorten_link`, {
    original_link: originalUrl,
  });

  const item = response?.data?.data;

  const newLink: LinkItem = {
    id: item._id,
    originalUrl: item.original_link,
    shortUrl: item.shorten_link,
    createdAt: new Date(item.created_at).toLocaleString('vi-VN'),
    clicks: item.click_count || 0,
    visible: item.status === 'active',
  };

  return newLink;
};

