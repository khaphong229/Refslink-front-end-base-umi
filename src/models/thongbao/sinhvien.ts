import type { TFilter } from '@/components/Table/typing';
import { postReceiver } from '@/services/ThongBao';
import {
	// ETrangThaiHocSv,
	EVaiTroKhaoSat,
} from '@/services/ThongBao/constant';
import { type ThongBao } from '@/services/ThongBao/typing';
import { useState } from 'react';

export default () => {
	const [loading, setLoading] = useState<boolean>();
	const [danhSach, setDanhSach] = useState<ThongBao.IUser[]>([]);
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(10);
	const [total, setTotal] = useState<number>(0);
	const [filters, setFilters] = useState<TFilter<ThongBao.IUser>[]>([]);

	const getModel = async (danhSachDoiTuong?: Record<string, string[]>): Promise<ThongBao.IUser[]> => {
		setLoading(true);
		try {
			const payload = { role: EVaiTroKhaoSat.SINH_VIEN, ...(danhSachDoiTuong ?? {}) };
			const params = {
				page,
				limit,
				filters: [
					...filters,
					// {
					// 	active: true,
					// 	field: 'trangThaiHoc',
					// 	operator: EOperatorType.NOT_INCLUDE,
					// 	values: [ETrangThaiHocSv.THOI_HOC, ETrangThaiHocSv.BUOC_THOI_HOC],
					// },
				],
			};
			const response = await postReceiver(payload, params);
			setDanhSach(response?.data?.data?.result ?? []);
			setTotal(response?.data?.data?.total ?? 0);

			return response?.data?.data?.result;
		} catch (er) {
			return Promise.reject(er);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		setLoading,
		danhSach,
		setDanhSach,
		page,
		setPage,
		limit,
		setLimit,
		total,
		setTotal,
		filters,
		setFilters,
		getModel,
	};
};
