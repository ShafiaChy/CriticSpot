import { TCategory } from "./category"

export type TProduct = {
    _id: string
    name: string
    brand: string
    image : string
    price: number
    category: TCategory;
    description: string
    quantity: number
    inStock: boolean
    createdAt: string
    updatedAt: string
}