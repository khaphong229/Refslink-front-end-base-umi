import React, { useEffect } from 'react';
import { useModel } from 'umi';
import { type IColumn } from '@/components/Table/typing';
import { WithdrawItem } from '@/services/Withdraw/typing';
import TableBase from '@/components/Table';
import { Button, message, Modal, Select, Tag } from 'antd';
import { update } from 'lodash';
import { updateStatusWithdraw } from '@/services/Withdraw';
import Form from './components/Form';

const Withdraw = () => {
	const { getModel, page, limit, danhSach, record, setVisibleForm, visibleForm, handleView } =
		useModel('withdraw_admin');

	useEffect(() => {
		getModel();
	}, [page, limit]);

	const statusOptions = [
		{ label: <span style={{ color: 'green' }}>Hoàn thành</span>, value: 'completed' },
		{ label: <span style={{ color: 'red' }}>Từ chối</span>, value: 'rejected' },
		{ label: <span style={{ color: 'orange' }}>Đang chờ</span>, value: 'pending' },
	];

	const columns: IColumn<WithdrawItem>[] = [
		{
			title: 'Phương thức thanh toán',
			dataIndex: 'payment_method',
			width: 200,
			align: 'center',
		},
		{
			title: 'Số tiền',
			dataIndex: 'amount_money',
			width: 150,
			align: 'center',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			width: 150,
			align: 'center',
			render: (value: 'completed' | 'rejected' | 'pending', record: WithdrawItem) => (
				<Select
					value={value}
					options={statusOptions}
					onChange={(newValue) => {
						updateStatusWithdraw(record._id, newValue)
							.then(() => {
								message.success('Cập nhật trạng thái thành công');
								getModel();
							})
							.catch((error) => {
								message.error(`Cập nhật trạng thái thất bại: ${error.message}`);
							});
					}}
					style={{ width: 120 }}
				/>
			),
		},
		{
			title: 'Chi tiết',
			width: 200,
			align: 'center',
			render: (value, record: WithdrawItem) => (
				<Button color='primary' onClick={() => handleView(record)}>
					Xem chi tiết
				</Button>
			),
		},
	];

	return (
		<TableBase
			columns={columns}
			widthDrawer={600}
			dependencies={[page, limit]}
			modelName='withdraw_admin'
			title='Danh sách rút tiền'
			buttons={{ import: false, filter: false }}
			Form={Form}
		/>
	);
};

export default Withdraw;
