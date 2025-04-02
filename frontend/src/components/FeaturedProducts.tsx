import { useGetAllProductsQuery } from "@/redux/features/product/productManagementApi";
import ProductCart from "./ProductCart";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect } from "react";


const FeaturedProducts = () => {
    const { data: stationeryProducts, isLoading } = useGetAllProductsQuery(undefined);
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);
    return (
        <div className="px-4 my-8 xl:px-0">
            <h2 data-aos="fade-right" className="font-bold sectionTitle">Our <span className="primaryColor">Featured</span> Products</h2>
            <p data-aos="zoom-in" className="sectionSubtitle">Explore our handpicked collection of top-quality products, designed to meet <br /> your needs and enhance your lifestyle effortlessly</p>
            <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3">
                {isLoading
                    ?
                    [...Array(10)].map((_, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-sm">
                            <Skeleton height={150} />
                            <Skeleton count={2} className="mt-2" />
                            <Skeleton width="50%" className="mt-2" />
                        </div>
                    ))
                    :
                    stationeryProducts?.data?.slice(0, 10)?.map((product) => (
                        <ProductCart product={product} key={product?._id} />
                    ))}
            </div>
            <div data-aos="zoom-in" className="flex items-center justify-center mt-6">
                <Link to='/allProducts'>
                    <button
                        style={{ borderRadius: "8px" }}
                        className="text-sm font-medium bg-[#fb5770] text-white hover:bg-[#e44d63] px-12 rounded-lg h-11 focus:outline-none"
                    >
                        View All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedProducts;