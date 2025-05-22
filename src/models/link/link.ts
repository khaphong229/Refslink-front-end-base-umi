import { useEffect, useState } from 'react';
import { message } from 'antd';
import { LinkItem } from '@/services/ManagementLink/typing';
import axios from '@/utils/axios';
import { createShortLink } from '@/services/ManagementLink';
import { exportToExcel } from '@/utils/exportExcel';

export const useLinkManager = () => {
	const [data, setData] = useState<LinkItem[]>([]);
	const [searchTerm, setSearch] = useState<string>('');
	// Tách riêng state cho modal ở header và modal ở page
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal ở GlobalHeaderRight
	const [isPageModalOpen, setIsPageModalOpen] = useState(false); // Modal ở LinkManagerPage

	const fetchLinks = async () => {
		try {
			const response = await axios.get('http://localhost:3111/shorten-link');
			const list = response?.data.data.data;
			console.log(list);
			setData(list);
		} catch (error) {
			message.error('Không thể tải dữ liệu link');
		}
	};

	useEffect(() => {
		fetchLinks();
	}, []);

	// Search filter
	const filteredData = data.filter((item) => item.original_link.toLowerCase().includes(searchTerm.toLowerCase()));

	// Actions
	const deleteLink = (id: string) => {
		setData((prev) => prev.filter((item) => item._id !== id));
		message.success('Đã xoá link!');
	};

	const deleteAll = () => {
		setData([]);
		message.success('Đã xoá tất cả link!');
	};

	const toggleVisibility = (id: string) => {
		setData((prev) => prev.map((item) => (item._id === id ? { ...item, visible: !item.visible } : item)));
	};

	const handleExport = () => {
		exportToExcel(data, 'danh_sach', ['alias', 'original_link', 'shorten_link', 'third_party_link', 'click_count']);
	};

	const hideAll = () => {
		setData((prev) => prev.map((item) => ({ ...item, visible: false })));
	};

	const showAll = () => {
		setData((prev) => prev.map((item) => ({ ...item, visible: true })));
	};

	const createLink = async (values: { alias: string; original_link: string }) => {
		try {
			const newLink = await createShortLink(values);
			console.log(newLink);

			setData((prev) => [...prev, newLink]);
			message.success('Đã tạo link mới!');
		} catch (error) {
			message.error('Không thể tạo link mới');
		}
	};

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			message.success('Đã sao chép link!');
		});
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
		handleExport,
		handleCopy,
		// Export cả 2 state modal
		isModalOpen,
		setIsModalOpen,
		isPageModalOpen,
		setIsPageModalOpen,
	};
};
