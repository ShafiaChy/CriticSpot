import { TLoginUser } from "./user.type";

export type TBlog = {
    _id: string;
    user: TLoginUser;
    title: string;
    category: string,
    content: string,
    thumbnail: string,
    createdAt: string
    updatedAt: string
}