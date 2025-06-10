export interface LinkItem {
	_id: string;
	original_link: string;
	shorten_link: string;
	created_at: string;
	click_count: number;
	visible: boolean;
	alias?: string;
}
