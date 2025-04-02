import { useGetAllCategoryQuery } from "@/redux/features/category/categoryManagementApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productManagementApi";
import { TProduct } from "@/types";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const FilterCategoryProducts = () => {
    const { data: products } = useGetAllProductsQuery(undefined)
    const { data: categories } = useGetAllCategoryQuery(undefined)
    const noteBooks = categories?.data?.find((item: any) => item?.name === "Notebooks & Planners")
    const officeSuppliesCategory = categories?.data?.find((item: any) => item?.name === "Office Supplies")
    const paperCategory = categories?.data?.find((item: any) => item?.name === "Paper & Envelopes")
    const educationalCategory = categories?.data?.find((item: any) => item?.name === "Educational")
    const technologyCategory = categories?.data?.find((item: any) => item?.name === "Technology")
    const officeSupplies = products?.data?.filter((product: TProduct) => product?.category?.name === 'Office Supplies')
    const paperAndEnvelopes = products?.data?.filter((product: TProduct) => product?.category?.name === 'Paper & Envelopes')
    const educational = products?.data?.filter((product: TProduct) => product?.category?.name === 'Educational')
    const technologies = products?.data?.filter((product: TProduct) => product?.category?.name === 'Technology')

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="items-center justify-between gap-8 mx-4 my-16 xl:flex lg:mx-0">
            <div className="xl:w-1/3">
                <div className="w-full xl:h-[620px] lg:h-[300px] md:h-[250px] h-full flex flex-col items-center p-4" style={{ backgroundImage: "url('https://cdn.shopify.com/s/files/1/0905/2012/files/station-h11.jpg?v=1631591355')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: '8px' }} >

                    <h2 data-aos="zoom-in-up" className="mt-8 text-2xl font-bold text-white lg:mt-16 lg:text-4xl">Custom Notebooks</h2>
                    <Link to={`/allProducts?page=1&category=${noteBooks?._id}`} data-aos="zoom-in-up">
                        <button
                            style={{
                                borderRadius: "8px",
                            }}
                            className="text-sm mt-8 font-medium border border-white bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-8 rounded-lg h-11 focus:outline-none"
                        >
                            Shop now
                        </button>
                    </Link>
                </div>

            </div>
            <div className="grid gap-8 mt-8 xl:w-2/3 md:grid-cols-2 xl:mt-0">
                <div className="px-8 py-4 bg-[#f6f6f6] flex items-center gap-4 rounded shadow">
                    <div className="flex-1">
                        <h2 className="mb-4 text-xl font-medium text-gray-700">Office Basics</h2>
                        {
                            officeSupplies?.slice(0, 5)?.map((product: TProduct) => (
                                <div key={product?._id}>
                                    <Link to={`/productDetails/${product?._id}`} className="hover:text-[#fb5770] hover:underline">
                                        <p>{product?.name}</p>
                                    </Link>
                                </div>
                            ))
                        }
                        <Link to={`/allProducts?page=1&category=${officeSuppliesCategory?._id}`}>
                            <button className="mt-4 font-medium hover:text-[#fb5770] hover:underline">View more</button>
                        </Link>
                    </div>
                    <div data-aos="fade-down" className="flex-1">
                        <img src='https://theme706-stationery-store.myshopify.com/cdn/shop/products/plus_staple_free_stapler_2_643x696_crop_top.png?v=1559727991' alt="" />
                    </div>
                </div>
                <div className="px-8 py-4 bg-[#f6f6f6] flex items-center gap-4 rounded shadow">
                    <div className="flex-1">
                        <h2 className="mb-4 text-xl font-medium text-gray-700">Paper & Envelopes</h2>
                        {
                            paperAndEnvelopes?.slice(0, 5)?.map((product: TProduct) => (
                                <div key={product?._id}>
                                    <Link to={`/productDetails/${product?._id}`} className="hover:text-[#fb5770] hover:underline">
                                        <p>{product?.name}</p>
                                    </Link>
                                </div>
                            ))
                        }
                        <Link to={`/allProducts?page=1&category=${paperCategory?._id}`}>
                            <button className="mt-4 font-medium hover:text-[#fb5770] hover:underline">View more</button>
                        </Link>
                    </div>
                    <div data-aos="fade-down" className="flex-1">
                        <img src='https://cdn.pixabay.com/photo/2014/04/02/10/58/paper-305095_1280.png' alt="" />
                    </div>
                </div>
                <div className="px-8 py-4 bg-[#f6f6f6] flex items-center gap-4 rounded shadow">
                    <div className="flex-1">
                        <h2 className="mb-4 text-xl font-medium text-gray-700">Educational</h2>
                        {
                            educational?.slice(0, 5)?.map((product: TProduct) => (
                                <div key={product?._id}>
                                    <Link to={`/productDetails/${product?._id}`} className="hover:text-[#fb5770] hover:underline">
                                        <p>{product?.name}</p>
                                    </Link>
                                </div>
                            ))
                        }
                        <Link to={`/allProducts?page=1&category=${educationalCategory?._id}`}>
                            <button className="mt-4 font-medium hover:text-[#fb5770] hover:underline">View more</button>
                        </Link>
                    </div>
                    <div data-aos="fade-down" className="flex-1">
                        <img src='https://pngimg.com/d/book_PNG51038.png' alt="" />
                    </div>
                </div>
                <div className="px-8 py-4 bg-[#f6f6f6] flex items-center gap-4 rounded shadow">
                    <div className="flex-1">
                        <h2 className="mb-4 text-xl font-medium text-gray-700">Technology</h2>
                        {
                            technologies?.slice(0, 5)?.map((product: TProduct) => (
                                <div key={product?._id}>
                                    <Link to={`/productDetails/${product?._id}`} className="hover:text-[#fb5770] hover:underline">
                                        <p>{product?.name}</p>
                                    </Link>
                                </div>
                            ))
                        }
                        <Link to={`/allProducts?page=1&category=${technologyCategory?._id}`}>
                            <button className="mt-4 font-medium hover:text-[#fb5770] hover:underline">View more</button>
                        </Link>
                    </div>
                    <div data-aos="fade-down" className="flex-1">
                        <img src='https://sika-sky.com/wp-content/uploads/2024/05/product-4.png' alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterCategoryProducts;