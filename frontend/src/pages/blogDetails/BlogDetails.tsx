import Loading from "@/components/loading/Loading";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogManagementApi";
import { TBlog } from "@/types";
import { Link, useParams } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isLoading } = useGetSingleBlogQuery({ id });

    if (isLoading) return <Loading/>;

    const { title, thumbnail, category, content, user, createdAt } = blog?.data as TBlog;
    const createdDate = new Date(createdAt);
    const day = String(createdDate.getDate()).padStart(2, '0');
    const month = String(createdDate.getMonth() + 1).padStart(2, '0');
    const year = createdDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

return (
        <div className="px-4 py-8">
            <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                {/* Blog Thumbnail */}
                <img
                    src={thumbnail}
                    alt={title}
                    className="object-cover w-full rounded-t-lg md:h-80"
                />
                
                {/* Blog Content */}
                <div className="p-6">
                    <h1 className="mb-2 text-xl font-semibold text-gray-900 md:text-2xl lg:text-3xl">{title}</h1>
                    <div className="items-center mb-4 text-[12px] text-gray-600 md:text-sm md:flex">
                        <span className="mr-2">by <span className="font-medium">{user?.name}</span></span>
                        <span>•</span>
                        <span className="ml-2">{formattedDate}</span>
                        <span>•</span>
                        <span className="ml-2 capitalize">{category}</span>
                    </div>

                    {/* Blog Content */}
                    <div className="mt-4 prose text-gray-800 lg:prose-xl">
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center my-6">
                <Link to='/'>
                    <button
                        style={{ borderRadius: "8px" }}
                        className="text-sm font-medium bg-[#fb5770] text-white hover:bg-[#e44d63] px-12 rounded-lg h-11 focus:outline-none"
                    >
                        Back Home
                    </button>
                </Link>
            </div>
            </div>
        </div>
    );
};

export default BlogDetails;
