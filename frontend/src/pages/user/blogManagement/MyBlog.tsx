import Loading from "@/components/loading/Loading";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useDeleteBlogMutation, useGetAllBlogQuery } from "@/redux/features/blog/blogManagementApi";
import { useGetAllUserQuery } from "@/redux/features/user/userManagementApi";
import { useAppSelector } from "@/redux/hook";
import { TBlog, TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const MyBlog = () => {
    const token = useAppSelector(selectCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token)
    }
    const { data: currentUser } = useGetAllUserQuery({ email: (user as TUser)?.email })
    const { data: allBlogs , isLoading} = useGetAllBlogQuery(undefined)
    const [deleteBlog] = useDeleteBlogMutation();

    let myBlogs: TBlog[] = [];

    if (currentUser?.data?.length && allBlogs?.data?.length) {
        myBlogs = allBlogs.data.filter((blog: TBlog) =>
            blog?.user?._id === currentUser.data?.[0]?._id
        );
    }

    const handleDelete = async (id: string) => {
        console.log(id);
        const toastId = toast.loading("Deleting...");
        try {
            const res = await deleteBlog({id});
            if (res?.data?.success) {
                toast.success(res?.data?.message, { id: toastId });
            } else {
                toast.error("Something went wrong. Please try again!", { id: toastId });
            }
        } catch (error: any) {
            console.log(error);
            toast.error("Something went wrong", { id: toastId });
        }
    };

    if(isLoading){
        return <Loading/>
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-3xl font-semibold text-gray-800 dashboardTitle">
                My All <span className="text-primary">Blogs</span>
            </h2>

            {myBlogs.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg shadow-sm">
                        <TableHeader>
                            <TableRow className="text-gray-700 bg-gray-100">
                                <TableHead className="p-4">Image</TableHead>
                                <TableHead className="p-4">Title</TableHead>
                                <TableHead className="p-4">Category</TableHead>
                                <TableHead className="p-4 text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {myBlogs.map((blog: TBlog) => (
                                <TableRow key={blog?._id} className="border-b hover:bg-gray-50">
                                    <TableCell className="p-4">
                                        <img className="object-cover w-12 h-12 rounded-lg" src={blog?.thumbnail} alt="Blog" />
                                    </TableCell>
                                    <Link to={`/blogs/${blog?._id}`}>
                                    
                                    <TableCell className="p-4 font-semibold hover:underline">{blog?.title}</TableCell></Link>
                                    <TableCell className="p-4 text-gray-600">{blog?.category}</TableCell>
                                    <TableCell className="flex justify-center gap-4 p-4">
                                        <Link to={`/dashboard/user/update/${blog?._id}`}>
                                            <button className="flex items-center gap-1 px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                                                <Pencil size={16} />
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog?._id)}
                                            className="flex items-center gap-1 px-3 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </table>
                </div>
            ) : (
                <div className="mt-10 mb-10 text-center">
                    <div className="flex items-center justify-center">
                        <img className="h-[200px]" src="https://www.rokomari.com/static/200/images/icon_empty_cart.png" alt="Empty Cart" />
                    </div>
                    <h2 className="mt-5 text-3xl font-semibold">Your Blog List is Empty!</h2>
                    <p className="mt-3 text-lg">You haven't published any blogs yet. Start writing now!</p>
                    <Link to="/add-blog">
                        <button className="px-6 py-3 mt-5 text-lg font-bold text-white bg-green-500 rounded-lg hover:bg-green-600">
                            Create a Blog
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyBlog;
