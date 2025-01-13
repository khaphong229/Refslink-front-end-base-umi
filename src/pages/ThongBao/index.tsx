import ExpandText from '@/components/ExpandText';
import TableBase from '@/components/Table';
import ButtonExtend from '@/components/Table/ButtonExtend';
import { EOperatorType } from '@/components/Table/constant';
import { type IColumn } from '@/components/Table/typing';
import { NotificationType } from '@/services/ThongBao/constant';
import { type ThongBao } from '@/services/ThongBao/typing';
import { DeleteOutlined, EyeOutlined, LeftOutlined, PlusCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Modal, Popconfirm, Segmented, Space, Tabs, Tooltip } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useModel } from 'umi';
import news from '../../assets/new6.gif';
import Form from './components/Form';
import CardFormThongBaoTuyChinh from './ThongBaoTuyChinh/CardForm';
import ViewThongBao from './ViewThongBao/CardView';
import TableReceiverThongBao from './ViewThongBao/TableReceiver';

const ThongBaoPage = (props: { notiType: NotificationType }) => {
	const { notiType } = props;
	const {
		page,
		limit,
		setRecord,
		record,
		getModel,
		deleteModel,
		setSortTime,
		setVisibleThongBaoDanhSach,
		setRecordThongBaoDanhSach,
		setEdit,
		setIsView,
		setVisibleForm,
	} = useModel('thongbao.thongbao');
	const [visible, setVisible] = useState<boolean>(false);
	const [type, setType] = useState<string>('MONTH');
	const [activeKey, setActiveKey] = useState('ban_hanh');
	const [startDate, setStartDate] = useState<any>(moment());
	const startDay = startDate?.format('DD/MM');
	const endDay = startDate.clone()?.add(6, 'day')?.format('DD/MM');
	const [visibleNguoiNhan, setVisibleNguoiNhan] = useState<boolean>(false);

	const onCell = (recordThongBao: ThongBao.IRecord) => ({
		onClick: () => {
			setVisible(true);
			setRecord(recordThongBao);
		},
		style: { cursor: 'pointer' },
	});

	const getData = () => {
		const value =
			type === 'DAY'
				? [moment(startDate)?.startOf('days').toISOString(), moment(startDate)?.endOf('days').toISOString()]
				: type === 'WEEK'
				? [
						moment(startDate)?.startOf('weeks')?.startOf('days').toISOString(),
						moment(startDate)?.startOf('weeks')?.add(6, 'days')?.endOf('days').toISOString(),
				  ]
				: [
						moment(startDate)?.startOf('months')?.startOf('days').toISOString(),
						moment(startDate)?.startOf('months')?.add(1, 'month')?.endOf('days').toISOString(),
				  ];
		setSortTime([{ field: 'createdAt', operator: 'between', values: value }]);

		//@ts-ignore
		getModel(
			{
				notificationInternal: activeKey === 'tu_dong',
				type: NotificationType.ONESIGNAL,
			},
			[{ active: true, field: 'createdAt', operator: EOperatorType.BETWEEN, values: value }],
		);
	};

	const columns: IColumn<ThongBao.IRecord>[] = [
		{
			title: 'Người gửi',
			dataIndex: 'senderName',
			width: 150,
			filterType: 'string',
			onCell,
		},
		{
			title: 'Tiêu đề',
			dataIndex: 'title',
			width: 200,
			filterType: 'string',
			onCell,
			render: (val, recordVal) => (
				<>
					<ExpandText>
						{val}{' '}
						{moment().diff(moment(recordVal?.createdAt), 'days') < 3 ? (
							<img style={{ width: 30, height: 20 }} src={news} />
						) : (
							''
						)}
					</ExpandText>
				</>
			),
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			width: 280,
			filterType: 'string',
			onCell,
			render: (val) => <ExpandText>{val}</ExpandText>,
		},
		{
			title: 'Danh sách người nhận',
			align: 'center',
			width: 90,
			render: (val, rec) => (
				<a
					href='#'
					onClick={() => {
						setRecord(rec);
						setVisibleNguoiNhan(true);
					}}
				>
					Xem
				</a>
			),
		},
		{
			title: 'Thời gian gửi',
			dataIndex: 'createdAt',
			width: 120,
			align: 'center',
			filterType: 'datetime',
			sortable: true,
			onCell,
			render: (val) => moment(val).format('HH:mm DD/MM/YYYY'),
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 90,
			fixed: 'right',
			render: (recordThongBao: ThongBao.IRecord) => (
				<>
					<Tooltip title='Xem chi tiết'>
						<Button
							onClick={() => {
								setRecord(recordThongBao);
								setVisible(true);
							}}
							type='link'
							icon={<EyeOutlined />}
						/>
					</Tooltip>
					{/* <Tooltip title='Sửa'>
						<Button
							disabled={activeKey === 'tu_dong'}
							onClick={() => {
								setRecord(recordThongBao);
								setEdit(true);
								setVisibleForm(true);
							}}
							shape='circle'
							type={'link'}
							icon={<EditOutlined />}
						/>
					</Tooltip> */}
					{/*<Divider type="vertical" />*/}
					<Tooltip title='Xóa'>
						<Popconfirm
							disabled={activeKey === 'tu_dong'}
							onConfirm={() => {
								deleteModel(recordThongBao._id, getData);
							}}
							title='Bạn có chắc chắn muốn xóa?'
						>
							<Button disabled={activeKey === 'tu_dong'} shape='circle' type='link' danger icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</>
			),
		},
	];

	return (
		<Card title='Thông báo'>
			<Tabs activeKey={activeKey} onChange={(value) => setActiveKey(value.toString())}>
				<Tabs.TabPane tab='Ban hành thông báo' key='ban_hanh' />
				<Tabs.TabPane tab='Thông báo tự động' key='tu_dong' />
			</Tabs>

			{activeKey === 'ban_hanh' && (
				<Space wrap style={{ marginBottom: 12 }}>
					<ButtonExtend
						onClick={() => {
							setRecord({} as ThongBao.IRecord);
							setEdit(false);
							setIsView(false);
							setVisibleForm(true);
						}}
						icon={<PlusCircleOutlined />}
						type='primary'
						notHideText
						tooltip='Thêm mới dữ liệu'
					>
						Thêm mới
					</ButtonExtend>
					<ButtonExtend
						key='1'
						onClick={() => {
							setRecordThongBaoDanhSach(undefined);
							setVisibleThongBaoDanhSach(true);
						}}
					>
						Thông báo tùy chỉnh
					</ButtonExtend>
				</Space>
			)}

			<TableBase
				title='Thông báo'
				columns={columns}
				modelName='thongbao.thongbao'
				widthDrawer={1000}
				dependencies={[page, limit, type, startDate, activeKey]}
				Form={Form}
				getData={getData}
				formProps={{ getData, notiType }}
				destroyModal
				buttons={{ create: false }}
				otherButtons={[
					<Space wrap key={1}>
						<Segmented
							value={type}
							onChange={(key: any) => {
								if (key === 'WEEK') {
									setStartDate(moment().startOf('week'));
								}
								if (key === 'DAY') {
									setStartDate(moment());
								}
								if (key === 'MONTH') {
									setStartDate(moment());
								}
								setType(key);
							}}
							options={[
								{ value: 'MONTH', label: 'Theo tháng' },
								{ value: 'WEEK', label: 'Theo tuần' },
								{ value: 'DAY', label: 'Theo ngày' },
							]}
						/>

						{type === 'WEEK' && (
							<Space>
								<Button onClick={() => setStartDate(startDate.clone().subtract(7, 'day'))}>
									<LeftOutlined /> Tuần trước
								</Button>
								<span>
									Tuần: {startDay} - {endDay}
								</span>
								<Button onClick={() => setStartDate(startDate.clone().add(7, 'day'))}>
									Tuần sau <RightOutlined />
								</Button>
								<a onClick={() => setStartDate(moment().startOf('week'))}>Tuần này</a>
							</Space>
						)}
						{type === 'DAY' && (
							<DatePicker
								allowClear={false}
								format={'DD/MM/YYYY'}
								style={{ width: 300 }}
								value={moment(startDate)}
								onChange={(val) => {
									setStartDate(val);
								}}
							/>
						)}
						{type === 'MONTH' && (
							<DatePicker
								allowClear={false}
								picker={'month'}
								format={'MM/YYYY'}
								style={{ width: 300 }}
								value={moment(startDate)}
								onChange={(val) => {
									setStartDate(val);
								}}
							/>
						)}
					</Space>,
				]}
				hideCard
			/>

			<Modal
				width={800}
				bodyStyle={{ padding: 0 }}
				okButtonProps={{ hidden: true }}
				cancelText='Đóng'
				visible={visible}
				onCancel={() => setVisible(false)}
				destroyOnClose
			>
				<ViewThongBao record={record} />
			</Modal>

			<Modal
				title='Danh sách người nhận'
				width={800}
				okButtonProps={{ hidden: true }}
				cancelText='Đóng'
				visible={visibleNguoiNhan}
				onCancel={() => setVisibleNguoiNhan(false)}
				destroyOnClose
			>
				<TableReceiverThongBao record={record} />
			</Modal>

			<CardFormThongBaoTuyChinh getData={getData} type={notiType} />
		</Card>
	);
};

export default ThongBaoPage;
