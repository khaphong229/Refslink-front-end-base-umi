import React, { useEffect, useRef, useCallback } from 'react';
import { Input, Space, Button, Empty, Modal, message, Spin, Pagination } from 'antd';
import { DeleteOutlined, SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { useLinkManager } from '@/models/link/link';
import type { LinkItem } from '@/services/ManagementLink/typing';
import './style.less';
import ClientLayout from '@/layouts/ClientLayout';
import CardLink from '@/pages/LinkManagement/components/Card';
import CreateLinkForm from '@/pages/LinkManagement/components/Form';

const { confirm } = Modal;

const LinkManagerPage: React.FC = () => {
	const {
		data,
		loading,
		createLoading,
		searchTerm,
		pagination,
		isPageModalOpen,
		setSearch,
		setIsPageModalOpen,
		deleteAll,
		handleExport,
		fetchLinks,
		createLink,
		handleTableChange,
	} = useLinkManager();

	// Refs để quản lý việc gọi API
	const isMounted = useRef(false);
	const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isInitialLoad = useRef(true);

	const loadInitialData = useCallback(() => {
		if (isInitialLoad.current) {
			isInitialLoad.current = false;
			fetchLinks(1, 10, '');
		}
	}, [fetchLinks]);

	const handleSearchWithDebounce = useCallback(
		(searchValue: string) => {
			if (searchTimeoutRef.current) {
				clearTimeout(searchTimeoutRef.current);
			}

			if (!isInitialLoad.current) {
				searchTimeoutRef.current = setTimeout(() => {
					fetchLinks(1, pagination.pageSize, searchValue);
				}, 500);
			}
		},
		[fetchLinks, pagination.pageSize],
	);

	useEffect(() => {
		loadInitialData();
	}, [loadInitialData]);

	useEffect(() => {
		handleSearchWithDebounce(searchTerm);

		return () => {
			if (searchTimeoutRef.current) {
				clearTimeout(searchTimeoutRef.current);
			}
		};
	}, [searchTerm, handleSearchWithDebounce]);

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
			if (searchTimeoutRef.current) {
				clearTimeout(searchTimeoutRef.current);
			}
		};
	}, []);

	const handleDeleteAll = () => {
		if (data.length === 0) {
			message.warning('Không có link nào để xóa');
			return;
		}

		confirm({
			title: 'Xác nhận xoá toàn bộ?',
			content: `Bạn có chắc chắn muốn xoá tất cả ${data.length} link?`,
			onOk: deleteAll,
			okType: 'danger',
		});
	};

	const handleRefresh = () => {
		fetchLinks(pagination.current, pagination.pageSize, searchTerm);
	};

	// Handler cho phân trang
	const handlePaginationChange = (page: number, pageSize?: number) => {
		const newPagination = {
			current: page,
			pageSize: pageSize || pagination.pageSize,
		};
		handleTableChange(newPagination);
	};

	// Handler cho việc thay đổi số items per page
	const handleShowSizeChange = (current: number, size: number) => {
		const newPagination = {
			current: 1, // Reset về trang 1 khi thay đổi page size
			pageSize: size,
		};
		handleTableChange(newPagination);
	};
	const handleCreateLink = async (values: { alias: string; original_link: string }) => {
		try {
			await createLink(values);
			return true; // Trả về true khi thành công
		} catch (error) {
			return false; // Trả về false khi thất bại
		}
	};

	return (
		<ClientLayout title='Quản lý link'>
			<div className='search-bar'>
				<Input
					placeholder='Tìm kiếm theo link gốc hoặc bí danh'
					prefix={<SearchOutlined />}
					allowClear
					value={searchTerm}
					onChange={(e) => setSearch(e.target.value)}
					style={{ width: 300 }}
				/>
				<Space style={{ display: 'flex' }}>
					<Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
						Làm mới
					</Button>
					<Button icon={<DeleteOutlined />} danger onClick={handleDeleteAll} disabled={data.length === 0}>
						Xoá tất cả ({data.length})
					</Button>
					<Button onClick={handleExport} type='default' disabled={data.length === 0}>
						Xuất file Excel
					</Button>
				</Space>
			</div>

			<div className='link-list'>
				<Spin spinning={loading}>
					{data.length > 0 ? (
						data.map((link: LinkItem) => <CardLink key={link._id} link={link} />)
					) : (
						<Empty description={loading ? 'Đang tải...' : 'Không có link nào'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
					)}
				</Spin>
			</div>

			{/* Phân trang */}
			{data.length > 0 && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<Pagination
						current={pagination.current}
						total={pagination.total}
						pageSize={pagination.pageSize}
						showSizeChanger
						showQuickJumper
						showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} link`}
						pageSizeOptions={['10', '20', '50', '100']}
						onChange={handlePaginationChange}
						onShowSizeChange={handleShowSizeChange}
						disabled={loading}
						size='default'
					/>
				</div>
			)}

			{/* Modal tạo link mới */}
			<CreateLinkForm
				onCreate={handleCreateLink}
				isModalOpen={isPageModalOpen}
				setIsModalOpen={setIsPageModalOpen}
				loading={createLoading}
			/>
		</ClientLayout>
	);
};

export default LinkManagerPage;
