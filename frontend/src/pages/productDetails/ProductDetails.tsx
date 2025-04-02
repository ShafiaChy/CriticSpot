import Loading from "@/components/loading/Loading";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAddToCartProductMutation } from "@/redux/features/product/addedCartManagementApi";
import { useAddToFavoriteProductMutation } from "@/redux/features/product/addedFavoriteManagementApi";
import { useGetAllProductsQuery, useGetSingleProductQuery } from "@/redux/features/product/productManagementApi";
import { useAppSelector } from "@/redux/hook";
import { TProduct, TUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetails = () => {
    const { data: products } = useGetAllProductsQuery(undefined);
    const { id } = useParams();
    const navigate = useNavigate();
    const [addToCartProduct] = useAddToCartProductMutation();
    const [addToFavoriteProduct] = useAddToFavoriteProductMutation();
    const location = useLocation();
    const { data: ProductReview, isLoading, isError } = useGetSingleProductQuery({
        productId: id
    })

    const token = useAppSelector(selectCurrentToken);
    let user: TUser | undefined;

    if (token) {
        user = jwtDecode(token);
    }


    if (isLoading) {
        return <Loading />


    }

    if (isError || !ProductReview?.data) {
        return <p>Error fetching product details. Please try again later.</p>;
    }
    const { _id, name, brand, category, image, price, inStock, description, quantity } = ProductReview?.data as TProduct
    const relatedProducts = products?.data?.filter((product: TProduct) => product?.category?.name === category?.name)

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!user || !((user as TUser)?.email)) {
            navigate("/login", { state: { from: location } });
        } else {
            const cartInfo = {
                email: ((user as TUser)?.email),
                product: _id
            }
            const res = await addToCartProduct(cartInfo)
            if (res?.data?.success) {
                toast.success(res?.data?.message)
            } else if (res?.error) {
                toast.error('Something went wrong!')
            }
        }
    };

    const handleAddToFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!user || !((user as TUser)?.email)) {
            navigate("/login", { state: { from: location } });
        } else {
            const favoriteInfo = {
                email: ((user as TUser)?.email),
                product: _id
            }
            const res = await addToFavoriteProduct(favoriteInfo)
            console.log(res);
            if (res?.data?.success) {
                toast.success(res?.data?.message)
            } else if (res?.error) {
                toast.error('Something went wrong!')
            }
        }
    };

    const handleBuyNow = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!user || !((user as TUser)?.email)) {
            navigate("/login", { state: { from: location } });
        } else {
            const orderInfo = {
                email: user?.email,
                products: [{ product: _id, quantity: 1 }]
            };

            navigate("/placeOrder", { state: { orderInfo } });
        }
    }


    return (
        <div className="px-4 my-8">
            <h2 className="font-bold sectionTitle">Product <span className="primaryColor">Details</span></h2>
            <p className="sectionSubtitle">Discover all the specifications, features, and details about this product to make an informed purchase. From quality materials to performance, find everything you need right here.</p>

            <div className="items-center justify-between gap-8 md:flex">
                <div className="flex-1">
                    <img className="w-full md:h-[400px] object-cover" style={{ borderRadius: '8px' }} src={image} alt={name} />
                </div>

                <div className="flex flex-col flex-1 mt-4 space-y-4 md:mt-0">
                    <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
                        <h2 className="text-xl font-bold text-gray-800 lg:text-3xl md:text-2xl">
                            {name}
                            <span className="ml-2 text-sm text-[#fb5770] font-medium">({brand})</span>
                        </h2>
                        <span
                            className={`text-sm font-semibold px-4 py-2 rounded-full ${inStock
                                ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                                : "bg-gradient-to-r from-red-400 to-red-600 text-white"
                                }`}
                            style={{
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                transition: "all 0.3s ease-in-out",
                            }}
                        >
                            {inStock ? "In Stock" : "Out of Stock"}
                        </span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-600">
                        Category: <span className="font-normal">{category?.name}</span>
                    </h2>
                    <h2 className="text-xl font-bold text-[#fb5770]">
                        Price: <span>${price}</span>
                    </h2>

                    <h2 className="text-lg font-semibold text-gray-600">
                        Quantity Available: <span className="font-normal">{quantity}</span>
                    </h2>
                    <p className="text-sm leading-6 text-gray-700">
                        {description}
                    </p>

                    {/* Action Buttons */}
                    <div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                style={{
                                    borderRadius: "8px",
                                }}
                                className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-2 md:px-8 rounded-lg h-11 focus:outline-none flex-1"
                            >
                                Add To Cart
                            </button>
                            <button
                                onClick={handleAddToFavorite}
                                style={{
                                    borderRadius: "8px",
                                }}
                                className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-2 md:px-8 rounded-lg h-11 focus:outline-none flex-1"
                            >
                                Add To Favorite
                            </button>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handleBuyNow}
                                style={{ borderRadius: "8px" }}
                                className="text-sm font-medium bg-[#fb5770] text-white hover:bg-[#e44d63] px-2 md:px-8 rounded-lg h-11 focus:outline-none md:mt-0 w-full flex-1"
                            >
                                Bye Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="mb-4 text-2xl font-bold text-gray-700">Related Products</h2>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-6">
                    {
                        relatedProducts?.slice(0, 12)?.map((product: TProduct) => (
                            <div key={product?._id} className="bg-white border shadow rounded-xl">
                                <img className="h-[200px] w-full object-cover rounded-t-xl" src={product?.image} alt="" />
                                <div className="p-4">
                                    <Link to={`/productDetails/${product?._id}`} >
                                        <h2 className="text-lg font-medium text-center text-gray-700 hover:text-[#fb5770] hover:underline">{product?.name}</h2></Link>
                                    <p className="text-[#fb5770] text-lg font-bold text-center">{product?.price}tk</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;