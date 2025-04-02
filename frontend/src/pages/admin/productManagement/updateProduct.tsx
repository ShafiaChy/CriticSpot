import Loading from "@/components/loading/Loading";
import { categoryOption } from "@/constants/category";
import { useGetSingleProductQuery, useUpdateProductMutation } from "@/redux/features/product/productManagementApi";
import { TProduct, TResponse } from "@/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetSingleProductQuery({
        productId: id
    });

    const [updateProduct] = useUpdateProductMutation();

    // Always call useForm
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TProduct>();

    useEffect(() => {
        if (data?.data) {
            reset(data.data);
        }
    }, [data, reset]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error loading product data.</div>;
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        try {
            const productInfo = {
                ...data,
                price: Number(data?.price),
                quantity: Number(data?.quantity),
                inStock: true
            }
            const res = (await updateProduct({
                id: id,
                data: productInfo
            })) as TResponse<any>
            console.log(res);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                navigate('/dashboard/admin/getAllProducts')
            } else if (res?.error) {
                toast.error('Something went wrong. Please try again!');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div>
            <div>
                <h2 className="dashboardTitle">Update<span className="primaryColor"> Stationery </span> Product</h2>
                <p className="dashboardSubtitle">Edit and modify product details to keep your inventory up-to-date.</p>
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
                            placeholder="Enter product name"
                            {...register("name", {
                                required: "Name is required",
                            })}
                            className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    {/* Image Field */}
                    <div className="flex-1 mb-4">
                        <label
                            htmlFor="image"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Product Image URL
                        </label>
                        <input
                            id="image"
                            type="text"
                            placeholder="Enter product image url"
                            {...register("image", {
                                required: "Image is required"
                            })}
                            className={`w-full px-4 py-2 border ${errors.image ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.image.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="items-center justify-between gap-4 md:flex">
                    {/* Brand Field */}
                    <div className="flex-1 mb-4">
                        <label
                            htmlFor="brand"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Brand
                        </label>
                        <input
                            id="brand"
                            type="text"
                            placeholder="Enter product brand"
                            {...register("brand", {
                                required: "Brand is required",
                            })}
                            className={`w-full px-4 py-2 border ${errors.brand ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        />
                        {errors.brand && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.brand.message}
                            </p>
                        )}
                    </div>
                    {/* Category Field */}
                    <div className="flex-1 mb-4">
                        <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Product Category
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
                            {categoryOption.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                        )}
                    </div>
                </div>

                <div className="items-center justify-between gap-4 md:flex">
                    {/* Price Field */}
                    <div className="flex-1 mb-4">
                        <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Price
                        </label>
                        <input
                            id="price"
                            type="number"
                            placeholder="Enter product price"
                            {...register("price", {
                                required: "Price is required",
                            })}
                            className={`w-full px-4 py-2 border ${errors.price ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.price.message}
                            </p>
                        )}
                    </div>
                    {/* Quantity Field */}
                    <div className="flex-1 mb-4">
                        <label
                            htmlFor="quantity"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Quantity
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            placeholder="Enter product quantity"
                            {...register("quantity", {
                                required: "Quantity is required",
                                min: {
                                    value: 1,
                                    message: "Quantity must be greater than 0",
                                },
                            })}
                            className={`w-full px-4 py-2 border ${errors.quantity ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        />
                        {errors.quantity && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.quantity.message}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Product Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Enter product description"
                            {...register("description", {
                                required: "Description is required",
                            })}
                            className={`w-full px-4 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#fb5770] text-white font-medium py-2 rounded-lg hover:bg-[#e14b63] focus:outline-none"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
