import { useEffect, useState } from 'react';
import { LinkItem } from '@/services/ManagementLink/typing';
import { getLinks,createShortLink } from '@/services/ManagementLink';
import { message } from 'antd';

export const useLinkManager = () => {
  const [data, setData] = useState<LinkItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getLinks().then(setData);
  }, []);

  const toggleVisibility = (id: string) => {
    setData((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, visible: !link.visible } : link
      )
    );
  };

  const deleteLink = (id: string) => {
    setData((prev) => prev.filter((link) => link.id !== id));
  };

  const hideAll = () => {
    setData((prev) => prev.map((link) => ({ ...link, visible: false })));
    message.success('Đã ẩn toàn bộ link');
  };

  const showAll = () => {
    setData((prev) => prev.map((link) => ({ ...link, visible: true })));
    message.success('Đã hiện toàn bộ link');
  };

  const deleteAll = () => {
    setData([]);
    message.success('Đã xoá toàn bộ link');
  };

  const createLink = async (originalUrl: string) => {
    const newLink = await createShortLink(originalUrl);
    setData((prev) => [newLink, ...prev]);
    message.success('Tạo link thành công!');
  };

  const filteredLinks = data.filter(
    (link) =>
      link.originalUrl.toLowerCase().includes(search.toLowerCase()) ||
      link.shortUrl.toLowerCase().includes(search.toLowerCase())
  );

  return {
    data: filteredLinks,
    setSearch,
    toggleVisibility,
    deleteLink,
    hideAll,
    showAll,
    deleteAll,
    createLink,
  };
};
