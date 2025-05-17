import { useEffect, useState } from 'react';
import { message } from 'antd';
import request from 'umi-request'; // hoặc axios
import { LinkItem } from '@/services/ManagementLink/typing';
import axios from 'axios';
import { createShortLink } from '@/services/ManagementLink';

export const useLinkManager = () => {
  const [data, setData] = useState<LinkItem[]>([]);
  const [searchTerm, setSearch] = useState<string>('');

  const fetchLinks = async () => {
    try {
      const response = await axios.get('http://localhost:3111/shorten-link'); // <-- API thật của bạn
      const list = response?.data.data.data || [];
      const mapped: LinkItem[] = list.map((item: any) => ({
        id: item._id,
        originalUrl: item.original_link,
        shortUrl: item.shorten_link,
        createdAt: new Date(item.created_at).toLocaleDateString(),
        visible: item.status === 'active',
      }));

      console.log(mapped)

      setData(mapped);
    } catch (error) {
      message.error('Không thể tải dữ liệu link');
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Search filter
  const filteredData = data.filter((item) =>
    item.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Actions
  const deleteLink = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    message.success('Đã xoá link!');
  };

  const deleteAll = () => {
    setData([]);
    message.success('Đã xoá tất cả link!');
  };

  const toggleVisibility = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const hideAll = () => {
    setData((prev) => prev.map((item) => ({ ...item, visible: false })));
  };

  const showAll = () => {
    setData((prev) => prev.map((item) => ({ ...item, visible: true })));
  };

  const createLink = async (originalUrl: string) => {
    try {
      const newLink = await createShortLink(originalUrl);
      setData((prev) => [...prev, newLink]);
      message.success('Đã tạo link mới!');
    } catch (error) {
      message.error('Không thể tạo link mới');
    }
  };

  return {
    data: filteredData,
    setSearch,
    createLink,
    deleteLink,
    deleteAll,
    toggleVisibility,
    hideAll,
    showAll,
  };
};
