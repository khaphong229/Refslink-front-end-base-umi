import ExpandText from '@/components/ExpandText';
import TableBase from '@/components/Table';
import { EOperatorType } from '@/components/Table/constant';
import type { IColumn } from '@/components/Table/typing';
import type { AuditLog } from '@/services/TienIch/AuditLog/typing';
import { Button, Modal } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';

const ModalAuditLog = (props: {
	visible: boolean;
	setVisible: (val: boolean) => void;
	title: string;
	actions?: Record<any, string>;
}) => {
	const { page, limit, getModel } = useModel('tienich.auditlog');
	const { visible, setVisible, actions = {}, title = 'Lịch sử thao tác' } = props;

	const getData = () =>
		getModel(undefined, [{ field: 'action', values: Object.keys(actions), operator: EOperatorType.INCLUDE }]);

	const columns: IColumn<AuditLog.IRecord>[] = [
		{
			title: 'Mã người dùng',
			dataIndex: 'uCode',
			align: 'center',
			width: 120,
			filterType: 'string',
		},
		{
			title: 'Họ tên',
			dataIndex: 'uName',
			width: 160,
			filterType: 'string',
		},
		{
			title: 'Hành động',
			dataIndex: 'action',
			width: 180,
			filterType: 'select',
			filterData: Object.keys(actions).map((i) => ({ label: actions[i], value: i })),
			render: (val) => val && actions[val],
		},
		{
			title: 'Tham số',
			dataIndex: 'param',
			width: 220,
			render: (val) => <ExpandText>{JSON.stringify(val)}</ExpandText>,
		},
		{
			title: 'Thời gian',
			dataIndex: 'createdAt',
			align: 'center',
			width: 140,
			render: (val) => val && moment(val).format('HH:mm:ss, DD/MM/YYYY'),
		},
		// {
		// 	title: 'Thao tác',
		// 	align: 'center',
		// 	width: 90,
		// 	fixed: 'right',
		// 	render: (val, rec) => (
		// 		<>
		// 			<ButtonExtend
		// 				tooltip='Chi tiết'
		// 				onClick={() => rec._id && getByIdModel(rec._id).then(handleView)}
		// 				type='link'
		// 				icon={<EyeOutlined />}
		// 			/>
		// 			<ButtonExtend
		// 				tooltip='Cập nhật'
		// 				onClick={() => onCapNhat(rec)}
		// 				className='btn-warning'
		// 				type='link'
		// 				icon={<RetweetOutlined />}
		// 			/>
		// 		</>
		// 	),
		// },
	];

	return (
		<Modal title={title} visible={visible} onCancel={() => setVisible(false)} footer={null} width={1000}>
			<TableBase
				columns={columns}
				dependencies={[page, limit]}
				modelName='tienich.auditlog'
				getData={getData}
				widthDrawer={1000}
				hideCard
				buttons={{ create: false, filter: false }}
			/>

			<div className='form-footer'>
				<Button onClick={() => setVisible(false)}>Đóng</Button>
			</div>
		</Modal>
	);
};

export default ModalAuditLog;
