declare module TopLink {
    export interface Record {
        _id: string;
        original_link: string;
        shorten_link: string;
        valid_clicks: number;
        earned_amount: number;
        created_at: string;
   
    }
}