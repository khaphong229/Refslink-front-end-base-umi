// import axios from '@/utils/axios'; // dùng axios đã config sẵn token, error, v.v.
import { LinkItem } from './typing';
import axios from '@/utils/axios';
const API_URL = 'http://localhost:3111';

export const getLinks = async () => {
  const response = await axios.get(`${API_URL}/shorten_link`);
  console.log(response.data); // 👈 log ra để xem đúng không
  return response?.data?.data?.data;
};




export const createShortLink = async (originalUrl: string) => {
  const response = await axios.post(`${API_URL}/shorten-link`, {
    original_link: originalUrl,
  });
  const item = response.data.data;
  console.log(item); // 👈 log ra để xem đúng không


  return item;
};

