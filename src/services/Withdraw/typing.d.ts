export interface WithdrawItem {
	_id: string;
	user_id: string;
	amount_money: number;
	payment_method: string;
	payment_details: string;
	status: string;
	note: string;
	scheduled_payment: string | null;
	paid_time: string;
	withdraw_code: string;
	created_at: string;
	updated_at: string;
}

export interface WithdrawResponse {
	data: WithdrawItem[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}
