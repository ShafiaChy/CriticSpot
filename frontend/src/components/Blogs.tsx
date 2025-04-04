import { useGetAllBlogQuery } from "@/redux/features/blog/blogManagementApi";
import BlogCard from "./BlogCard";



const Blogs = () => {
    const {data : blogs} = useGetAllBlogQuery(undefined)

    return (
        <div className="px-4 w-11/12 mx-auto my-8 lg:px-0">
            <h2 data-aos="fade-right" className="font-bold sectionTitle">Latest <span className="primaryColor">Blogs</span></h2>
            <p data-aos="zoom-in-up" className="sectionSubtitle"> Stay updated with our most recent articles and insights!</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs?.data?.slice(0,3)?.map((blog , index) => (
                    <BlogCard  key={index} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
