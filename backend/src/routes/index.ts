import { Router } from "express";

import { userRouter } from "../module/user/user.route";
import { AuthRouter } from "../module/auth/auth.route";
import { categoryRouter } from "../module/category/category.route";
import { blogsRouter } from "../module/blog/blog.route";
import { ProductReviewRouter } from "../module/product-review/productReview.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/reviews',
        route: ProductReviewRouter
    },
   
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/auth',
        route: AuthRouter
    },
   
    
    {
        path: '/categories',
        route: categoryRouter
    },
    {
        path: '/blogs',
        route: blogsRouter
    },
]


moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;