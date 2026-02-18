export interface Image {
    id: string;
    url: string; 
    name: string;
    size: number;
    tags: string;
    extension: string;
    uploadDate: string;
    updatedAt?: string;
}