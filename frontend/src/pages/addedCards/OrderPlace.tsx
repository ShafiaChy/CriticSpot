import { useCreateOrderMutation } from '@/redux/features/order/orderManagementApi';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

type OrderFormData = {
    name: string;
    contactNo: string;
    division: string;
    city: string;
    upozila: string;
    localAddress: string;
    postCode: string;
};

const OrderPlace = () => {
    const location = useLocation();
    const orderInfo = location.state?.orderInfo || {};

    const productIds = orderInfo?.products?.map((item: any) => item?.product);
    const [createOrder] = useCreateOrderMutation()

    const [fetchedProducts, setFetchedProducts] = useState<any>([]);
    useEffect(() => {
        if (productIds.length > 0) {
            Promise.all(productIds?.map((id: string) => fetch(`https://stationery-shop-blond.vercel.app/api/v1/products/get-product/${id}`).then(res => res.json())))
                .then(setFetchedProducts)
                .catch(err => console.error(err));
        }
    }, [productIds]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OrderFormData>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Processing...')

        const modifiedData = {
            email: orderInfo?.email,
            products: orderInfo?.products,
            ...data
        }
        console.log(modifiedData);
        try {

            const res = await createOrder(modifiedData)
            console.log(res);
            if (res?.data?.success) {
                setTimeout(() => {
                    window.location.href = (res.data.data)
                }, 1000);
            }
            else if (res?.error) {
                console.log(res?.error);
                toast.error('Something went wrong!', { id: toastId })
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!', { id: toastId })
        }
    };

    return (
        <div className='flex gap-8 my-16'>
            <div className="w-2/3 p-6 bg-white border rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Place Your <span className="text-[#fb5770]">Order</span>
                    </h2>
                    <p className="text-gray-600">Fill in the details to complete your purchase.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6">
                    {/* Name & Contact */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                {...register("name", { required: "Name is required" })}
                                className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
                                Contact Number
                            </label>
                            <input
                                id="contactNo"
                                type="tel"
                                placeholder="Enter your contact number"
                                {...register("contactNo", { required: "Contact number is required" })}
                                className={`w-full px-4 py-2 border ${errors.contactNo ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                            />
                            {errors.contactNo && <p className="mt-1 text-xs text-red-500">{errors.contactNo.message}</p>}
                        </div>
                    </div>

                    {/* Division & City */}
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                        {/* Division */}
                        <div>
                            <label htmlFor="division" className="block text-sm font-medium text-gray-700">
                                Division
                            </label>
                            <select
                                id="division"
                                {...register("division", { required: "Division is required" })}
                                className={`w-full px-4 py-2 border ${errors.division ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                            >
                                <option value="">Select your division</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattogram">Chattogram</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Rajshahi">Rajshahi</option>
                                <option value="Barishal">Barishal</option>
                                <option value="Sylhet">Sylhet</option>
                                <option value="Rangpur">Rangpur</option>
                                <option value="Mymensingh">Mymensingh</option>
                                <option value="Cumilla">Cumilla</option>
                                <option value="Narayanganj">Narayanganj</option>
                                <option value="Bogra">Bogra</option>
                                <option value="Gazipur">Gazipur</option>
                                <option value="Tangail">Tangail</option>
                                <option value="Jessore">Jessore</option>
                                <option value="Shariatpur">Shariatpur</option>
                                <option value="Meherpur">Meherpur</option>
                                <option value="Chandpur">Chandpur</option>
                                <option value="Pabna">Pabna</option>
                                <option value="Moulvibazar">Moulvibazar</option>
                                <option value="Netrakona">Netrakona</option>
                                <option value="Khagrachari">Khagrachari</option>
                                <option value="Noakhali">Noakhali</option>
                                <option value="Lalmonirhat">Lalmonirhat</option>
                                <option value="Dinajpur">Dinajpur</option>
                                <option value="Rajbari">Rajbari</option>
                                <option value="Naogaon">Naogaon</option>
                                <option value="Patuakhali">Patuakhali</option>
                                <option value="Sirajganj">Sirajganj</option>
                                <option value="Kishoreganj">Kishoreganj</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Rangamati">Rangamati</option>
                                <option value="Satkhira">Satkhira</option>
                                <option value="Brahmanbaria">Brahmanbaria</option>
                                <option value="Jhalokathi">Jhalokathi</option>
                            </select>
                            {errors.division && <p className="mt-1 text-xs text-red-500">{errors.division.message}</p>}
                        </div>

                        {/* City */}
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                placeholder="Enter your city"
                                {...register("city", { required: "City is required" })}
                                className={`w-full px-4 py-2 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                            />
                            {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
                        </div>
                    </div>

                    {/* Upozila & Local Address */}
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                        {/* Upozila */}
                        <div>
                            <label htmlFor="upozila" className="block text-sm font-medium text-gray-700">
                                Upozila
                            </label>
                            <input
                                id="upozila"
                                type="text"
                                placeholder="Enter your upozila"
                                {...register("upozila", { required: "Upozila is required" })}
                                className={`w-full px-4 py-2 border ${errors.upozila ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                            />
                            {errors.upozila && <p className="mt-1 text-xs text-red-500">{errors.upozila.message}</p>}
                        </div>

                        {/* Local Address */}
                        <div>
                            <label htmlFor="localAddress" className="block text-sm font-medium text-gray-700">
                                Local Address
                            </label>
                            <input
                                id="localAddress"
                                type="text"
                                placeholder="Enter your local address"
                                {...register("localAddress", { required: "Local address is required" })}
                                className={`w-full px-4 py-2 border ${errors.localAddress ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                            />
                            {errors.localAddress && <p className="mt-1 text-xs text-red-500">{errors.localAddress.message}</p>}
                        </div>
                    </div>

                    {/* Post Code */}
                    <div className="mt-4">
                        <label htmlFor="postCode" className="block text-sm font-medium text-gray-700">
                            Post Code
                        </label>
                        <input
                            id="postCode"
                            type="number"
                            placeholder="Enter post code"
                            {...register("postCode", { required: "Post code is required" })}
                            className={`w-full px-4 py-2 border ${errors.postCode ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        />
                        {errors.postCode && <p className="mt-1 text-xs text-red-500">{errors.postCode.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className='flex justify-end'>
                        <button
                            type="submit"
                            className=" bg-[#fb5770] text-white font-medium py-2 rounded-lg mt-6 hover:bg-[#e14b63] focus:outline-none transition duration-200 px-8"
                        >
                            Confirm Order
                        </button>
                    </div>
                </form>
            </div>
            <div className='grid w-1/3 gap-8 lg:grid-cols-2 xl:grid-cols-3'>
                {
                    fetchedProducts?.map((item: any, index: number) => (
                        <div key={index} className='border h-[200px]'>
                            <img className='w-full h-[100px] object-cover' src={item?.data?.image} alt="" />
                            <h2 className='px-4 py-2'>{item?.data?.name}</h2>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default OrderPlace;