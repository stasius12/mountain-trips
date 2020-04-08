export interface Trip {
    id: number;
    name: string;
    created_at: Date;
    slug: string;    
    date_from: Date;
    date_to: Date;
    description: string;
}