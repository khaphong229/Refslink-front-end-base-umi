import { type IColumn } from '@/components/Table/typing';
import TableBase from '@/components/Table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space, Tooltip, Tag } from 'antd';
import { useModel } from 'umi';
import Form from './components/Form';
import type { SettingRecord } from '@/models/setting';

const Setting = () => {
	const { getModel, page, limit, deleteModel, handleEdit } = useModel('setting');

	const columns: IColumn<SettingRecord>[] = [
		{
			title: 'Key',
			dataIndex: 'name',
			width: 150,
			align: 'center',
			render: (value) => {
				return <span style={{ fontWeight: 'bold' }}>{value}</span>;
			},
		},
		{
			title: 'Value',
			dataIndex: 'value',
			width: 200,
			align: 'center',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			width: 200,
			align: 'center',
		},
		{
			title: 'Public',
			dataIndex: 'is_public',
			width: 120,
			align: 'center',
			render: (value) => <Tag color={value ? 'green' : 'red'}>{value ? 'Public' : 'Private'}</Tag>,
		},
		{
			title: 'Thao tác',
			width: 150,
			align: 'center',
			render: (value, record) => (
				<Space>
					<Tooltip title='Chỉnh sửa'>
						<Button type='primary' icon={<EditOutlined />} onClick={() => handleEdit(record)} />
					</Tooltip>
					<Popconfirm
						title='Bạn có chắc chắn muốn xóa không?'
						onConfirm={async () => {
							const res = await deleteModel(record.name);
							if (res.status === 200) {
								message.success('Xóa thành công');
							} else {
								message.error('Xóa thất bại');
							}
						}}
						okText='Có'
						cancelText='Không'
					>
						<Tooltip title='Xóa'>
							<Button type='primary' danger icon={<DeleteOutlined />} />
						</Tooltip>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<TableBase
			columns={columns}
			widthDrawer={800}
			dependencies={[page, limit]}
			modelName='setting'
			title='Quản lý cài đặt'
			Form={Form}
			buttons={{ import: false, filter: false }}
		/>
	);
};

export default Setting;
