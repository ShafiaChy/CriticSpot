import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryManagementApi";
import { useAddReviewMutation } from "@/redux/features/review/reviewManagementApi";
import { useGetAllUserQuery } from "@/redux/features/user/userManagementApi";
import { useAppSelector } from "@/redux/hook";
import { TReview, TResponse, TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


const CreateReview = () => {
    
      const token = useAppSelector(selectCurrentToken);
    let user;
    if (token) {
      user = verifyToken(token)
    }
    const [addProduct] = useAddReviewMutation();
    const {data : categories} = useGetAllCategoryQuery(undefined)
    
    const { data: currentUser } = useGetAllUserQuery({ email: (user as TUser)?.email })
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<TReview>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Review processing..');
        
       data.author={
        name: currentUser?.data?.[0]?.name ?? '',
        avatarUrl: currentUser?.data?.[0]?.photoUrl ?? '',
       }
     
        try {
            const reviewInfo = {
                ...data,
              

            }
            console.log(reviewInfo)
            const res = (await addProduct(reviewInfo)) as TResponse<any>
            if (res?.data?.success) {
                toast.success(res?.data?.message, { id: toastId });
                reset();
            } else if (res?.error) {
                toast.error('Something went wrong. Please try again!', { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong', { id: toastId });

        }
    };



    return (
        <div>
            <div>
                <h2 className="dashboardTitle">Add Your  <span className="primaryColor"> </span> Review</h2>
                
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="items-center justify-between gap-4 md:flex">
                    {/* Name Field */}
                    <div className="flex-1 mb-4">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="name"
                            placeholder="Title"
                            {...register("title", {
                                required: "Name is required",
                            })}
                            className={`w-full px-4 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                    {/* image Field */}
                    <div className="flex-1 mb-4">
                        <label
                            htmlFor="image"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                             Image URL
                        </label>
                        <input
                            id="image"
                            type="text"
                            placeholder="Enter image url"
                            {...register("featuredImage", {
                                required: "image is required"
                            })}
                            className={`w-full px-4 py-2 border ${errors.featuredImage ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        />
                        {errors.featuredImage && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.featuredImage.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="items-center justify-between gap-4 md:flex">

                    {/* category field */}
                    <div className="flex-1 mb-4">
                        <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                             Category
                        </label>
                        <select
                            id="category"
                            {...register("category", { required: "Category is required" })}
                            className={`w-full px-4 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories?.data?.map((option) => (
                                <option key={option?.name} value={option?._id}>
                                    {option?.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                <div className="mb-4">
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700">Blog Content</label>
                <textarea
                    id="content"
                    placeholder="Write your blog content"
                    {...register("content", { required: "Content is required" })}
                    className={`w-full px-4 py-2 border ${errors.content ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                />
                {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
                    </div>
                    <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-700">Rating (1 to 5)</label>
                    <input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Enter rating"
                        {...register("rating", { required: "Rating is required" })}
                        className={`w-full px-4 py-2 border ${errors.rating ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                    />
                    {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>}
                    </div>




                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#fb5770] text-white font-medium py-2 rounded-lg hover:bg-[#e14b63] focus:outline-none"
                >
                    Create Review
                </button>
            </form>
        </div>
    );
};

export default CreateReview;