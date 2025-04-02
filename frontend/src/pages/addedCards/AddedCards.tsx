import Loading from "@/components/loading/Loading";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useDeleteAddToCartProductMutation, useGetAddedCartQuery, useUpdateCartQuantityMutation } from "@/redux/features/product/addedCartManagementApi";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from 'react-icons/md';
import { FaPlus, FaMinus, FaRegHeart, FaArrowRight } from 'react-icons/fa';
import { toast } from "sonner";
import { useAddToFavoriteProductMutation } from "@/redux/features/product/addedFavoriteManagementApi";
import { useState } from "react";

const AddedCards = () => {
    const [deleteAddedCart] = useDeleteAddToCartProductMutation();
    const [updateCartQuantity] = useUpdateCartQuantityMutation();
    const token = useAppSelector(selectCurrentToken);
    const [addToFavoriteProduct] = useAddToFavoriteProductMutation();
    const location = useLocation();
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);

    let user: TUser | null = null;
    if (token) {
        user = verifyToken(token) as TUser;
    }

    const { data: addedCartProduct, isLoading: addedCartLoading, refetch } = useGetAddedCartQuery(
        (user as TUser)?.email
    );


    const subtotal = addedCartProduct?.data?.[0]?.products?.reduce(
        (acc: any, item: any) => acc + item?.productId?.price * item.quantity,
        0
    ) || 0;
    const shipping = subtotal > 0 ? 50 : 0; // Example shipping logic
    const totalPrice = subtotal + shipping;


    const handleClick = (productId: string, change: number) => {
        // Disable buttons for 30 seconds
        setIsDisabled(true);
        setTimeRemaining(10);

        handleQuantityChange(productId, change);

        // Start the countdown for the next available click
        const countdown = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    setIsDisabled(false); // Re-enable the buttons after the countdown
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };


    const handleQuantityChange = async (productId: string, change: number) => {
        if (!user) {
            return;
        }
        try {
            await updateCartQuantity({
                email: user.email,
                productId,
                change
            }).unwrap();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Something went wrong!, Please try again')
        }
    };



    if (!user || addedCartLoading) {
        return <Loading />;
    }

    const handleDelete = async (itemId: string) => {
        const toastId = toast.loading('Deleting...');
        const filterDataId = addedCartProduct?.data[0]?.products.find((item: any) => item.productId._id === itemId)
        console.log('item', itemId);
        console.log(filterDataId?.productId?._id);
        if (!filterDataId && !filterDataId?.productId?._id) {
            toast.error('Product not found in cart!', { id: toastId });
            return;
        }
        try {
            const res = await deleteAddedCart({
                email: (user as TUser)?.email,
                productId: filterDataId?.productId?._id
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message, { id: toastId });
                refetch();
            } else {
                toast.error('Something went wrong. Please try again!', { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!', { id: toastId });
        }
    };

    const handleOrder = async () => {
        const orderProducts = addedCartProduct?.data[0]?.products.map((item: any) => {
            return { product: item.productId._id, quantity: item.quantity }
        });
        const orderInfo = {
            email: user?.email,
            products: orderProducts
        }
        navigate("/placeOrder", { state: { orderInfo } })
    }

    const handleAddToFavorite = async (_id: string) => {
        if (!user || !((user as TUser)?.email)) {
            navigate("/login", { state: { from: location } });
        } else {
            const favoriteInfo = {
                email: ((user as TUser)?.email),
                product: _id
            }
            const res = await addToFavoriteProduct(favoriteInfo)
            if (res?.data?.success) {
                toast.success(res?.data?.message)
            } else if (res?.error) {
                toast.error('Something went wrong!')
            }
        }
    };





    return (
        <div className="mx-4">
            <h2 className="font-bold sectionTitle">My<span className="primaryColor"> Added</span> Products</h2>
            <p className="sectionSubtitle">Browse through our diverse collection of high-quality products, meticulously curated to cater to all your needs, offering the perfect balance of style, function, and durability for every occasion.</p>

            <div>
                {
                    addedCartProduct?.data?.map((item: any) => item.products?.length)[0] > 0 ? (
                        <div className="flex-row gap-5 py-10 xl:gap-10 xl:flex">
                            {/* Product Details and Cart Summary Section */}
                            <div className="w-full xl:w-8/12">

                                {/* Cart Items Section */}
                                <div className="p-5 bg-white rounded-lg shadow-md">
                                    {
                                        addedCartProduct?.data[0]?.products?.map((item: any) => (
                                            <div className="pb-5 mb-5 border-b md:flex" key={item._id}>
                                                {/* Item Image */}
                                                <div className="flex items-center justify-center md:w-3/12 ">
                                                    <img src={item?.productId?.image} alt={item?.productId?.name} className="object-cover w-full h-[150px] rounded-lg" />
                                                </div>

                                                {/* Item Details */}
                                                <div className="pl-4 md:w-5/12">
                                                    <h1 className="font-semibold text-gray-800 xl:text-xl">{item?.productId?.name}</h1>
                                                    <h2 className="mt-2 text-lg text-gray-600">{item?.productId?.brand}</h2>
                                                    <p className="mt-2 text-sm text-gray-500">Price: {item?.productId?.price} TK</p>
                                                    <div className="flex items-center gap-4 mt-4">
                                                        <button onClick={() => handleDelete(item?.productId?._id)} className="text-red-500 hover:text-red-700">
                                                            <MdDelete className="text-3xl" />
                                                        </button>
                                                        <button onClick={() => handleAddToFavorite(item?.productId?._id)} className="flex items-center text-pink-500 hover:text-pink-700">
                                                            <FaRegHeart className="text-2xl" />
                                                            <span className="ml-2">Add to Wishlist</span>
                                                        </button>
                                                    </div>
                                                    <h2 className="mt-2 text-sm text-red-600">Only {item?.productId?.quantity} copies available</h2>
                                                </div>


                                                {/* Quantity Control */}
                                                <div className="flex items-center justify-center gap-2 mt-4 md:w-2/12 md:mt-0">
                                                    {/* Decrease Quantity Button */}
                                                    <button
                                                        onClick={() => handleClick(item?.productId?._id, -1)}
                                                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-400"
                                                        disabled={item?.quantity === 1 || isDisabled}
                                                    >
                                                        <FaMinus className="text-xl text-gray-700" />
                                                    </button>


                                                    {/* Display Quantity */}

                                                    <p>{item?.quantity}</p>
                                                    {/* Increase Quantity Button */}
                                                    <button
                                                        onClick={() => handleClick(item?.productId?._id, 1)}
                                                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-400"
                                                        disabled={item?.quantity === 10 || isDisabled}
                                                    >
                                                        <FaPlus className="text-xl text-gray-700" />
                                                    </button>

                                                    {isDisabled && <p className="text-sm text-gray-500">Wait {timeRemaining}s</p>}
                                                </div>



                                                {/* Item Price */}
                                                <div className="flex items-center justify-center gap-4 mt-4 ms-auto md:mt-0" >
                                                    <p className="text-lg font-semibold text-[#fb5770]">{(item?.productId?.price * item?.quantity).toFixed(2)} TK</p>

                                                </div>
                                            </div>
                                        ))
                                    }

                                    <hr className="my-5 border-t-2 border-gray-200" />



                                    {/* Promo Section */}
                                    <div className="flex items-center justify-between">
                                        <p className="hidden text-sm text-gray-600 md:block">Apply Promo Code or Voucher on the next page.</p>
                                        <div className="flex gap-6">
                                            <button
                                                onClick={handleOrder}
                                                style={{
                                                    borderRadius: "8px",
                                                }}
                                                className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-8 rounded-lg h-11 focus:outline-none flex justify-center items-center"
                                            >
                                                Place Order <FaArrowRight className="ml-2" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Section */}
                            <div className="w-full mt-5 md:w-4/12">
                                <div className="p-5 bg-white rounded-md shadow-md">
                                    <h3 className="mb-5 text-xl font-bold text-center">Cart Summary</h3>
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-lg font-semibold">Total Items:</p>
                                        {addedCartProduct?.data?.[0]?.products?.reduce((acc: any, item: any) => acc + item.quantity, 0) || 0}
                                    </div>
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-lg font-semibold">Subtotal:</p>
                                        <p className="text-lg text-sky-500">{subtotal} TK</p> {/* Dynamic subtotal */}
                                    </div>
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-lg font-semibold">Shipping:</p>
                                        <p className="text-lg text-sky-500">{shipping} TK</p> {/* Dynamic shipping */}
                                    </div>
                                    <div className="flex items-center justify-between mb-5">
                                        <p className="text-lg font-semibold">total Price:</p>
                                        <p className="text-xl font-semibold text-red-500">{totalPrice} TK</p>
                                    </div>
                                    <button className="btn btn-primary w-full py-2 text-white bg-[#fb5770] hover:bg-[#e04d62] rounded-md">
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-10 mb-10 text-center">
                            <div className="flex items-center justify-center">
                                <img className="h-[200px]" src="https://www.rokomari.com/static/200/images/icon_empty_cart.png" alt="Empty Cart" />
                            </div>
                            <h2 className="mt-5 text-3xl font-semibold">Your Cart is Empty!</h2>
                            <p className="mt-3 text-lg">There’s nothing in your cart yet. Browse our categories and find your favorites.</p>
                            <Link to="/">
                                <button className="mt-3 text-xl font-bold text-[#fb5770]">Start shopping now and enjoy amazing deals.</button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AddedCards;
