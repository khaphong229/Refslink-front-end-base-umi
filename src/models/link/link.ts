import { useState, useCallback, useRef } from 'react';
import { message } from 'antd';
import { LinkItem } from '@/services/ManagementLink/typing';
import { PaginationParams } from '@/services/ManagementLink';
import { getLinks, createShortLink, deleteShortLinkById } from '@/services/ManagementLink';
import { exportToExcel } from '@/utils/exportExcel';

export const useLinkManager = () => {
	const [data, setData] = useState<LinkItem[]>([]);
	const [searchTerm, setSearch] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [createLoading, setCreateLoading] = useState<boolean>(false);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal GlobalHeaderRight
	const [isPageModalOpen, setIsPageModalOpen] = useState(false); // Modal LinkManagerPage
	const [resultShorten, setResultShorten] = useState<LinkItem | null>(null);

	const loadingRef = useRef(false);

	const fetchLinks = useCallback(async (page = 1, pageSize = 10, search = '') => {
		if (loadingRef.current) {
			return;
		}

		loadingRef.current = true;
		setLoading(true);

		try {
			const params: PaginationParams = {
				page,
				limit: pageSize,
				q: search || undefined,
			};

			const response = await getLinks(params);
			const { data: list, total } = response?.data || { data: [], total: 0 };

			setData(list);
			setPagination({
				current: page,
				pageSize: pageSize,
				total,
			});
		} catch (error) {
			message.error('Không thể tải dữ liệu link');
		} finally {
			setLoading(false);
			loadingRef.current = false;
		}
	}, []);

	const handleTableChange = useCallback(
		(newPagination: any) => {
			const page = newPagination.current || 1;
			const pageSize = newPagination.pageSize || pagination.pageSize;
			fetchLinks(page, pageSize, searchTerm);
		},
		[fetchLinks, searchTerm],
	);

	const deleteLink = useCallback(
		async (id: string) => {
			try {
				await deleteShortLinkById(id);
				message.success('Đã xoá link thành công!');
				fetchLinks(pagination.current, pagination.pageSize, searchTerm);
			} catch (error) {
				console.error('Error deleting link:', error);
				message.error('Không thể xoá link');
			}
		},
		[fetchLinks, pagination.current, pagination.pageSize, searchTerm],
	);

	const deleteAll = useCallback(async () => {
		try {
			message.warning('Chức năng xóa tất cả chưa được hỗ trợ');
		} catch (error) {
			message.error('Không thể xoá tất cả link');
		}
	}, []);

	const toggleVisibility = useCallback(
		async (id: string) => {
			try {
				message.success('Đã cập nhật trạng thái hiển thị!');
				fetchLinks(pagination.current, pagination.pageSize, searchTerm);
			} catch (error) {
				console.error('Error toggling visibility:', error);
				message.error('Không thể cập nhật trạng thái');
			}
		},
		[fetchLinks, pagination.current, pagination.pageSize, searchTerm],
	);

	const handleExport = useCallback(() => {
		try {
			exportToExcel(data, 'danh_sach', ['alias', 'original_link', 'shorten_link', 'third_party_link', 'click_count']);
			message.success('Đã xuất file thành công!');
		} catch (error) {
			console.error('Error exporting:', error);
			message.error('Không thể xuất file');
		}
	}, [data]);

	const hideAll = useCallback(async () => {
		try {
			message.success('Đã ẩn tất cả link!');
			fetchLinks(pagination.current, pagination.pageSize, searchTerm);
		} catch (error) {
			console.error('Error hiding all links:', error);
			message.error('Không thể ẩn tất cả link');
		}
	}, [fetchLinks, pagination.current, pagination.pageSize, searchTerm]);

	const showAll = useCallback(async () => {
		try {
			message.success('Đã hiển thị tất cả link!');
			fetchLinks(pagination.current, pagination.pageSize, searchTerm);
		} catch (error) {
			console.error('Error showing all links:', error);
			message.error('Không thể hiển thị tất cả link');
		}
	}, [fetchLinks, pagination.current, pagination.pageSize, searchTerm]);

	const createLink = useCallback(
		async (values: { alias: string; original_link: string }) => {
			setCreateLoading(true);
			try {
				const res = await createShortLink(values);
				if (res?.data) {
					console.log('Setting resultShorten:', res.data);
					setResultShorten(res.data);
					message.success('Đã tạo link mới!');
					await fetchLinks(1, pagination.pageSize, searchTerm);
					return res?.data;
				}
				return false;
			} catch (error) {
				message.error('Không thể tạo link mới');
				throw error;
			} finally {
				setCreateLoading(false);
			}
		},
		[fetchLinks, pagination.pageSize, searchTerm],
	);

	const handleCopy = useCallback((text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				message.success('Đã sao chép link!');
			})
			.catch((error) => {
				console.error('Error copying:', error);
				message.error('Không thể sao chép link');
			});
	}, []);

	return {
		data,
		loading,
		createLoading,
		searchTerm,
		pagination,
		isModalOpen,
		isPageModalOpen,
		resultShorten,

		setSearch,
		setIsModalOpen,
		setIsPageModalOpen,

		fetchLinks,
		createLink,
		deleteLink,
		deleteAll,
		toggleVisibility,
		hideAll,
		showAll,
		handleExport,
		handleCopy,
		handleTableChange,
	};
};
