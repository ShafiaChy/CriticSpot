import App from "@/App";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import About from "@/pages/about/About";
import AddedCards from "@/pages/addedCards/AddedCards";
import OrderPlace from "@/pages/addedCards/OrderPlace";
import AddedFavorites from "@/pages/addedFavorites/AddedFavorites";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AllOrders from "@/pages/admin/orderManagement/AllOrders";
import CreateProduct from "@/pages/admin/productManagement/CreateProduct";
import GetAllProducts from "@/pages/admin/productManagement/GetAllProducts";
import UpdateProduct from "@/pages/admin/productManagement/updateProduct";
import UserData from "@/pages/admin/userManagement/UserData";
import AllProducts from "@/pages/allProducts/AllProducts";
import BlogsPage from "@/pages/blog/Blog";
import BlogDetails from "@/pages/blogDetails/BlogDetails";
import AllCategory from "@/pages/category/AllCategory";
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Order from "@/pages/order/Order";
import ProductDetails from "@/pages/productDetails/ProductDetails";
import SignUp from "@/pages/signUp/SignUp";
import CreateBlog from "@/pages/user/blogManagement/CreateBlog";
import MyBlog from "@/pages/user/blogManagement/MyBlog";
import UpdateBlog from "@/pages/user/blogManagement/UpdateBlog";
import ViewOrders from "@/pages/user/orderManagement/ViewOrders";
import UserDashboard from "@/pages/user/UserDashboard";
import UserProfile from "@/pages/user/UserProfile";
import OrderVerify from "@/pages/verify/OrderVerify";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/blogs',
                element: <BlogsPage />
            },
            {
                path: '/allCategory',
                element: <AllCategory />
            },
            {
                path: '/blogs/:id',
                element: <BlogDetails />
            },
            {
                path: '/allProducts',
                element: <AllProducts />
            },
            {
                path: '/productDetails/:id',
                element: <ProductDetails />
            },
            {
                path: '/addedCards',
                element: <AddedCards />
            },
            {
                path: '/addedFavorites',
                element: <AddedFavorites />
            },
            {
                path: '/order',
                element: <Order />
            },
            {
                path: '/placeOrder',
                element: <OrderPlace />
            },
            {
                path: '/orders/verify',
                element: <OrderVerify />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signUp',
                element: <SignUp />
            },
        ]
    },
    {
        path: '/dashboard/:role',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        children: [
            {
                path: 'adminDashboard',
                index: true,
                element: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
            },
            {
                path: 'createProduct',
                element: <ProtectedRoute role="admin"><CreateProduct /></ProtectedRoute>
            },
            {
                path: 'getAllProducts',
                element: <ProtectedRoute role="admin"><GetAllProducts /></ProtectedRoute>
            },
            {
                path: 'updateProduct/:id',
                element: <ProtectedRoute role="admin"><UpdateProduct /></ProtectedRoute>
            },
            {
                path: 'allUser',
                element: <ProtectedRoute role="admin"><UserData /></ProtectedRoute>
            },
            {
                path: 'allOrders',
                element: <ProtectedRoute role="admin"><AllOrders /></ProtectedRoute>
            },
            {
                path: 'userDashboard',
                index: true,
                element: <ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>
            },
            {
                path: 'viewOrders',
                element: <ProtectedRoute role="user"><ViewOrders /></ProtectedRoute>
            },
            {
                path: 'createBlog',
                element: <ProtectedRoute role="user"><CreateBlog /></ProtectedRoute>
            },
            {
                path: 'myBlog',
                element: <ProtectedRoute role="user"><MyBlog /></ProtectedRoute>
            },
            {
                path: 'update/:id',
                element: <ProtectedRoute role="user"><UpdateBlog /></ProtectedRoute>
            },
            {
                path: 'userProfile',
                element: <ProtectedRoute role="user"><UserProfile /></ProtectedRoute>
            }
        ]
    }
])
export default router;