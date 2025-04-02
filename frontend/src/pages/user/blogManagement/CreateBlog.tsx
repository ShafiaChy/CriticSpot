import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAddBlogMutation } from "@/redux/features/blog/blogManagementApi";
import { useGetAllUserQuery } from "@/redux/features/user/userManagementApi";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IBlog {
    title: string;
    user: string;
    category: string;
    content: string;
    thumbnail: string;
}

const CreateBlog = () => {
    const token = useAppSelector(selectCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token)
    }
    const { data: currentUser } = useGetAllUserQuery({ email: (user as TUser)?.email })
    const [addBlog] = useAddBlogMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IBlog>();

    const onSubmit: SubmitHandler<IBlog> = async (data) => {
        const toastId = toast.loading("Creating blog...");
        let currentBlogCreateUser;
        if (currentUser?.data && currentUser.data.length > 0) {
            currentBlogCreateUser = currentUser?.data[0]._id;
        }
        const modifiedData = {
            ...data,
            user: currentBlogCreateUser
        }
        console.log(modifiedData);

        try {
            const res = await addBlog(modifiedData);
            if (res?.data?.success) {
                toast.success(res?.data?.message, { id: toastId });
                reset();
            } else {
                toast.error("Something went wrong. Please try again!", { id: toastId });
            }
        } catch (error: any) {
            console.log(error);
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <div>
            <h2 className="dashboardTitle">Create a New <span className="primaryColor">Blog</span></h2>
            <p className="dashboardSubtitle">Share your thoughts and experiences with the community.</p>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        className={`w-full px-4 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primary focus:outline-none`}
                        placeholder="Enter blog title"
                    />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Category</label>
                    <input
                        {...register("category", { required: "Category is required" })}
                        className={`w-full px-4 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primary focus:outline-none`}
                        placeholder="Enter category"
                    />
                    {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Content</label>
                    <textarea
                        {...register("content", { required: "Content is required" })}
                        className={`w-full px-4 py-2 border ${errors.content ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primary focus:outline-none`}
                        placeholder="Enter blog content"
                        rows={5}
                    />
                    {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Thumbnail URL</label>
                    <input
                        {...register("thumbnail", { required: "Thumbnail URL is required" })}
                        className={`w-full px-4 py-2 border ${errors.thumbnail ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primary focus:outline-none`}
                        placeholder="Enter thumbnail URL"
                    />
                    {errors.thumbnail && <p className="text-sm text-red-500">{errors.thumbnail.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#fb5770] text-white font-medium py-2 rounded-lg hover:bg-[#e14b63] focus:outline-none"
                >
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
