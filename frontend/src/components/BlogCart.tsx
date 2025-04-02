import { TBlog } from "@/types";
import { Link } from "react-router-dom";


const BlogCart = ({ blog }: { blog: TBlog }) => {
    const { _id,title, thumbnail, category, user, createdAt } = blog;
    const createdDate = new Date(createdAt);

    const day = String(createdDate.getDate()).padStart(2, '0');
    const month = String(createdDate.getMonth() + 1).padStart(2, '0');
    const year = createdDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return (
        <div className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-2xl" data-aos="zoom-in-up">
            <div className="relative overflow-hidden rounded-t-2xl">
                <img
                    src={thumbnail}
                    alt={title}
                    className="object-cover w-full h-[200px] transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:opacity-100"></div>
                <span
                    className={`text-sm absolute top-1 left-1 font-semibold flex items-center justify-center space-x-2 py-2 px-4 rounded-full ${category && 'bg-gradient-to-r from-green-400 to-green-600 text-white'}`}
                    style={{
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease-in-out",
                    }}
                >
                    <span>
                        {category && `${category}`}
                    </span>
                </span>
            </div>

            {/* Blog Content */}
            <div className="p-6">
                <h2 className="mb-2 text-2xl font-bold text-[#3f4343] group-hover:text-[#fb5770] transition-colors duration-300">
                    {title.length > 35 ? `${title?.slice(0, 35)} ...` : title}
                </h2>

                {/* Author and Date */}
                <div className="flex items-center justify-between mt-5 text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5.121 19.804A7.968 7.968 0 0112 21c4.418 0 8-3.582 8-8s-3.582-8-8-8a7.969 7.969 0 00-6.879 3.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold">{user?.name}</span>
                    </div>
                    <span>{formattedDate}</span>
                </div>

                <Link to={`/blogs/${_id}`}>
                    <div className="flex justify-end">
                        <button
                            style={{
                                borderRadius: "8px",
                            }}
                            className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-8 rounded-lg h-11 focus:outline-none mt-4"
                        >
                            Read More
                        </button>
                    </div></Link>
            </div>
        </div>
    );
};

export default BlogCart;
