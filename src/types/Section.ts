export interface Section {
    id: number;
    title: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}