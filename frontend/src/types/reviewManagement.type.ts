import { TCategory } from "./category";


export type TReview = {
    _id: string;
    title: string;
    category:TCategory;
    publishedDate: string;
    featuredImage: string;
    content: string;
    author: {
        name: string;
        avatarUrl: string;
       
    };
    rating:number;
    createdAt: string
    updatedAt: string
};