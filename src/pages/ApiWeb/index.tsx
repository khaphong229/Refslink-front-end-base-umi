import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { useModel } from 'umi';
import Form from './components/Form';
import { ROUTER } from '@/constants/router';
import type ApiWeb from '@/services/WebApi/typings';

const ApiWebPage = () => {
	const { getModel, page, limit, deleteModel, handleEdit } = useModel('api_web');

	const columns: IColumn<ApiWeb.Record>[] = [
		{
			title: 'Api',
			dataIndex: 'name_api',
			width: 150,
		},
		{
			title: 'Số view tối đa',
			dataIndex: 'max_view',
			width: 120,
			sortable: true,
		},
		{
			title: 'Ưu tiên',
			dataIndex: 'priority',
			align: 'center',
			width: 120,
			sortable: true,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			width: 120,
			filterType: 'select',
			filterData: [
				{
					label: 'Bật',
					value: 'active',
				},
				{
					label: 'Tắt',
					value: 'inactive',
				},
			],
		},
		{
			title: 'Tự động bật',
			dataIndex: 'timer_start',
			width: 120,
		},
		{
			title: 'Tự động tắt',
			dataIndex: 'timer_end',
			width: 120,
		},
		{
			title: 'Quốc gia',
			dataIndex: 'country_uses',
			width: 120,
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 90,
			fixed: 'right',
			render: (record: ApiWeb.Record) => (
				<>
					<Tooltip title='Bật/tắt'>
						<Button onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
					</Tooltip>
					<Tooltip title='Chỉnh sửa'>
						<Button onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
					</Tooltip>
					<Tooltip title='Xóa'>
						<Popconfirm
							onConfirm={() => deleteModel(record._id, getModel)}
							title='Bạn có chắc chắn muốn xóa api web này?'
							placement='topLeft'
						>
							<Button danger type='link' icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</>
			),
		},
	];

	return (
		<TableBase
			columns={columns}
			widthDrawer={800}
			dependencies={[page, limit]}
			modelName='api_web'
			// title={ROUTER.API_WEB}
			Form={Form}
			buttons={{ import: true }}
		/>
	);
};

export default ApiWebPage;
