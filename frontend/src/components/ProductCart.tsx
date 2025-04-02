import { useAddToCartProductMutation } from "@/redux/features/product/addedCartManagementApi";
import { TProduct, TUser } from "@/types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { FiHeart } from "react-icons/fi";
import { useAddToFavoriteProductMutation } from "@/redux/features/product/addedFavoriteManagementApi";
import AOS from "aos";
import "aos/dist/aos.css";

type TProductCart = Pick<TProduct, '_id' | 'name' | 'image' | 'price' | 'inStock' | 'brand'>;


const ProductCart = ({ product }: { product: TProductCart }) => {

    const { _id, name, image, inStock, brand, price } = product;
    const [addToCartProduct] = useAddToCartProductMutation();
    const [addToFavoriteProduct] = useAddToFavoriteProductMutation();
    const linkRef = useRef<HTMLAnchorElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const token = useAppSelector(selectCurrentToken);
    let user: TUser | undefined;

    if (token) {
        user = jwtDecode(token);
    }

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

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

    return (
        <div>
            <Link ref={linkRef} to={`/productDetails/${_id}`}>
                <div data-aos="zoom-in-up" style={{ borderRadius: '8px' }} className="relative overflow-hidden transition-all duration-500 transform bg-white shadow-xl hover:scale-105 hover:shadow-2xl">
                    <button onClick={handleAddToFavorite} className="absolute top-2 right-2 text-[#fb5770] text-xl font-bold">
                        <FiHeart />
                    </button>
                    <img src={image} alt={name} className="object-cover w-full h-40 rounded-t-lg" />

                    <div className="p-2 md:p-6">
                        <h2 className="md:block hidden mb-2 md:text-xl md:font-bold font-medium text-[#3f4343]">
                            {name.length > 20 ? name.slice(0, 20
                            ) + "..." : name}
                        </h2>
                        <h2 className="md:hidden mb-2 md:text-xl md:font-bold font-medium text-[#3f4343]">
                            {name.length > 12 ? name.slice(0, 12
                            ) + "..." : name}
                        </h2>
                        <p className="md:text-[16px] text-sm">Brand: {brand}</p>
                        <p className="mt-2 font-semibold md:text-xl primaryColor">{price} tk</p>

                        <div className="flex items-center justify-center mt-4 lg:justify-between">
                            <span
                                className={`hidden text-sm font-semibold xl:flex  items-center justify-center space-x-2 py-2 px-4 rounded-full ${inStock ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' : 'bg-gradient-to-r from-red-400 to-red-600 text-white'}`}
                                style={{
                                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                    transition: "all 0.3s ease-in-out",
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d={inStock ? "M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 110-20 10 10 0 010 20z" : "M16 10a6 6 0 11-12 0 6 6 0 0112 0zm-2 0a4 4 0 10-8 0 4 4 0 008 0z"}
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>
                                    {inStock ? "In Stock" : "Out of Stock"}
                                </span>
                            </span>

                            <button
                                onClick={handleAddToCart}
                                style={{
                                    borderRadius: "8px",
                                }}
                                className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white md:px-4 px-2 rounded-lg h-8 focus:outline-none"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCart;
