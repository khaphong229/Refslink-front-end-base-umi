import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space, Switch, Tag, Tooltip } from 'antd';
import { useModel } from 'umi';
import Form from './components/Form';
import type ApiWeb from '@/services/WebApi/typings';
import { STATUS } from '@/types/status';
import moment from 'moment';
import { changeStatus } from '@/services/WebApi';
import { get } from 'lodash';
import ClientLayout from '@/layouts/ClientLayout';

const ApiWebPage = () => {
	const {getModel, page, limit, deleteModel, handleEdit } = useModel('api_web');
	const columns: IColumn<ApiWeb.Record>[] = [
		{
			title: 'Api',
			dataIndex: 'name_api',
			width: 150,
			align: 'center',
			render: (value) => {
				return <span style={{ fontWeight: 'bold' }}>{value}</span>;
			},
		},
		{
			title: 'Số view tối đa',
			dataIndex: 'max_view',
			width: 120,
			sortable: true,
			align: 'center',
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
			align: 'center',
			filterData: [
				{
					label: 'Bật',
					value: STATUS.ACTIVE,
				},
				{
					label: 'Tắt',
					value: STATUS.INACTIVE,
				},
			],
			render: (value, record) => (
				<Switch
					checked={value === STATUS.ACTIVE}
					onChange={async (checked) => {
						const res = await changeStatus(record._id, checked ? STATUS.ACTIVE : STATUS.INACTIVE);
						if (res.status === 200) {
							message.success(res.message);
							getModel();
						}
					}}
					checkedChildren='Bật'
					unCheckedChildren='Tắt'
				/>
			),
		},
		{
			title: 'Tự động bật',
			dataIndex: 'timer_start',
			width: 120,
			align: 'center',
			render: (value) => (value ? moment.utc(value).local().format('HH:mm:ss') : '-'),
		},
		{
			title: 'Tự động tắt',
			dataIndex: 'timer_end',
			width: 120,
			align: 'center',
			render: (value) => (value ? moment.utc(value).local().format('HH:mm:ss') : '-'),
		},
		{
			title: 'Chặn VPN',
			dataIndex: 'block_vpn',
			width: 120,
			align: 'center',
			render: (value) => (value === true ? 'Có' : 'Không'),
		},
		{
			title: 'Quốc gia',
			dataIndex: 'country_uses',
			width: 120,
			render: (value) => (
				<Space wrap>
					{value.map((val) => (
						<Tag key={val} color='red'>
							{val}
						</Tag>
					))}
				</Space>
			),
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 90,
			fixed: 'right',
			render: (record: ApiWeb.Record) => (
				<>
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
		<ClientLayout title='Quản lý api web'>
			<TableBase
			columns={columns}
			widthDrawer={800}
			dependencies={[page, limit]}
			modelName='api_web'
			// title={ROUTER.API_WEB}
			Form={Form}
			buttons={{ import: false, filter: false }}
		/>
		</ClientLayout>
	);
};

export default ApiWebPage;
