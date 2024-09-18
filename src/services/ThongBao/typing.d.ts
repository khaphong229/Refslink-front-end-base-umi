import type { ESourceTypeNotification, EReceiverType, ENotificationSource } from './constant';

declare module ThongBao {
	export interface IRecord {
		_id: string;
		title: string;
		senderName: string;
		sender?: string;
		description?: string;
		content?: string;
		imageUrl?: string;

		filter?: {
			roles: EVaiTroBieuMau[];
			idKhoaSinhVien: string;
			idKhoa: string;
			idNganh: string;
			idLopHanhChinh: string;
			idLopTinChi: string;
		};
		receiverType: EReceiverType;
		users?: string[];

		// oneSignalData?: any;
		taiLieuDinhKem?: string[];
		createdAt: string; // '2023-06-27T07:47:29.693Z';
		read: boolean;

		sourceType?: ESourceTypeNotification;
		targetType?: ESourceTypeNotification;
		notificationInternal: boolean;
		thoiGianHieuLuc: Date;

		metadata?: TNotificationSource;
	}

	export type TNotificationSource = {
		entityId?: string;
		entitySource?: ENotificationSource;
		pathWeb?: string;
		phanHe?: ESourceTypeNotification;
	} & Record<string, any>;
}
