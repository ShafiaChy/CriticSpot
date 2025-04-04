import App from "@/App";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import About from "@/pages/about/About";

import CreateReview from "@/pages/user/CreateReview";

import BlogsPage from "@/pages/blog/Blog";
import BlogDetails from "@/pages/blogDetails/BlogDetails";
import AllCategory from "@/pages/category/AllCategory";
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import SignUp from "@/pages/signUp/SignUp";
import CreateBlog from "@/pages/user/blogManagement/CreateBlog";
import MyBlog from "@/pages/user/blogManagement/MyBlog";
import UpdateBlog from "@/pages/user/blogManagement/UpdateBlog";
import UserDashboard from "@/pages/user/UserDashboard";
import UserProfile from "@/pages/user/UserProfile";
import { createBrowserRouter } from "react-router-dom";
import AllReviews from "@/pages/allReviews/AllReviews";
import ReviewDetails from "@/pages/reviewDetails/ReviewDetails";


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
                path: '/allReviews',
                element: <AllReviews />
            },
            {
                path: '/reviewDetails/:id',
                element: <ReviewDetails />
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
                path: 'userDashboard',
                index: true,
                element: <ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>
            },
         
            {
                path: 'CreateReview',
                element: <ProtectedRoute role="user"><CreateReview /></ProtectedRoute>
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