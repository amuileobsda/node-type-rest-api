export interface Post {
    id?: number | string;
    PostTitle: string;
    CategoryId: number;
    SubCategoryId: number;
    PostDetails: string;
    PostingDate: Date;
    UpdationDate: Date;
    Is_Active: number;
    PostUrl: string;
    PostImage: string;
    Is_Click: string;
}