import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useDeleteAddToFavoriteProductMutation, useGetAddedFavoriteQuery } from "@/redux/features/product/addedFavoriteManagementApi";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AddedFavorites = () => {
    const token = useAppSelector(selectCurrentToken);

    let user: TUser | null = null;
    if (token) {
        user = verifyToken(token) as TUser;
    }

    const { data: addedFavorite, refetch } = useGetAddedFavoriteQuery(
        (user as TUser)?.email
    );
    const [deleteFavorite] = useDeleteAddToFavoriteProductMutation();

    const handleDelete = async (itemId: string) => {
        console.log(itemId);
        const toastId = toast.loading('Deleting...');
        try {
            const res = await deleteFavorite({
                id: itemId
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

    return (
        <div className="mx-4 lg:mx-0">
            <h2 className="font-bold sectionTitle">My<span className="primaryColor"> Favorite</span> Products</h2>
            <p className="sectionSubtitle">Browse through our diverse collection of high-quality products, meticulously curated to cater to all your needs, offering the perfect balance of style, function, and durability for every occasion.</p>
            <div className="my-8">
                {
                    addedFavorite?.data?.length > 0 ? <div className="grid gap-8 md:grid-cols-2">
                        {
                            addedFavorite?.data?.map((item: any) => (
                                <div className="border md:flex" key={item?._id}>
                                    {/* Item Image */}
                                    <div className="flex items-center justify-center object-cover">
                                        <img src={item?.product?.image} alt={item?.product?.name} className="object-cover md:w-[250px] w-full h-[150px] md:h-[200px] rounded-lg" />
                                    </div>

                                    {/* Item Details */}
                                    <div className="p-4">
                                        <div className="flex items-center justify-between gap-8">
                                            <h1 className="text-xl font-semibold text-gray-800">{item?.product?.name}</h1>
                                            <button onClick={() => handleDelete(item?._id)} className="text-red-500 hover:text-red-700">
                                                <MdDelete className="text-3xl" />
                                            </button>
                                        </div>
                                        <h2 className="mt-2 text-lg text-gray-600">Brand: {item?.product?.brand}</h2>
                                        <p className="mt-2 text-sm text-gray-500">Price: {item?.product?.price} TK</p>

                                    </div>
                                </div>
                            ))
                        }
                    </div> :
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
                }
            </div>

        </div>
    );
};

export default AddedFavorites;