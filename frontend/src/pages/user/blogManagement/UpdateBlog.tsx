import { useNavigate, useParams } from "react-router-dom";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetAllUserQuery } from "@/redux/features/user/userManagementApi";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useGetSingleBlogQuery, useUpdateBlogMutation } from "@/redux/features/blog/blogManagementApi";
import Loading from "@/components/loading/Loading";
import React from "react";

interface IBlog {
    title: string;
    user: string;
    category: string;
    content: string;
    thumbnail: string;
}

const UpdateBlog = () => {
    const { id } = useParams<{ id: string }>();
    const token = useAppSelector(selectCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token);
    }
    const { data: currentUser } = useGetAllUserQuery({ email: (user as TUser)?.email });
    const { data: currentBlog, isLoading, isError } = useGetSingleBlogQuery({ id });
    const [updateBlog] = useUpdateBlogMutation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IBlog>();

    // Reset form when currentBlog data is fetched
    React.useEffect(() => {
        if (currentBlog?.data) {
            reset({
                title: currentBlog?.data?.title || "",
                category: currentBlog?.data?.category || "",
                content: currentBlog?.data?.content || "",
                thumbnail: currentBlog?.data?.thumbnail || "",
            });
        }
    }, [currentBlog, reset]);

    const onSubmit: SubmitHandler<IBlog> = async (data) => {
        const toastId = toast.loading("Updating blog...");
        let currentBlogUpdateUser;
        if (currentUser?.data && currentUser.data.length > 0) {
            currentBlogUpdateUser = currentUser?.data[0]._id;
        }
        const modifiedData = {
            ...data,
            user: currentBlogUpdateUser,
        };

        try {
            const res = await updateBlog({ id, data: modifiedData });
            if (res?.data?.success) {
                toast.success(res?.data?.message, { id: toastId });
                reset();
                navigate('/dashboard/user/myBlog')
            } else {
                toast.error("Something went wrong. Please try again!", { id: toastId });
            }
        } catch (error: any) {
            console.log(error);
            toast.error("Something went wrong", { id: toastId });
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return <p>Error loading blog</p>;

    return (
        <div>
            <h2 className="dashboardTitle">Update <span className="primaryColor">Blog</span></h2>
            <p className="dashboardSubtitle">Update your existing blog content.</p>
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
                    Update Blog
                </button>
            </form>
        </div>
    );
};

export default UpdateBlog;
