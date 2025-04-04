import BlogCard from "@/components/BlogCard";
import ProductPagination from "@/components/Pagination";
import { useGetAllBlogQuery } from "@/redux/features/blog/blogManagementApi";
import { TBlog } from "@/types";
import { useLocation } from "react-router-dom";
const useQueryParams = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
};
 
const BlogsPage = () => {
    const queryParams = useQueryParams();
    const currentPage = queryParams.get('page') || '1';
    const limit = '9';
    const {data: blogs} = useGetAllBlogQuery([
        { name: 'page', value: currentPage },
        { name: 'limit', value: limit }
    ])
    return (
        <div className="px-4 my-8 lg:px-0">
            <h2 className="font-bold sectionTitle">The <span className="primaryColor">Latest Articles</span></h2>
            <p className="sectionSubtitle"> Stay updated with our most recent articles and insights!</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs?.data?.map((blog : TBlog , index) => (
                    <BlogCard  key={index} blog={blog} />
                ))}
            </div>
            <ProductPagination totalPage={blogs?.meta?.totalPages || 1} />
        </div>
    );
};

export default BlogsPage;