import ProductCart from "@/components/ProductCart";
import { useGetAllProductsQuery } from "@/redux/features/product/productManagementApi";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import FilterSidebar from "./FilterSidebar";
import { useLocation } from "react-router-dom";
import { TProduct } from "@/types";
import ProductPagination from "@/components/Pagination";
import Loading from "@/components/loading/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const useQueryParams = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
};

const AllProducts = () => {
    const queryParams = useQueryParams();
    const currentPage = queryParams.get('page') || '1';
    const limit = '12';
    const category = queryParams.get('category');
    const brand = queryParams.get('brand');
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []); 

    // Fetch products with dynamic page and category filters
    const { data: stationeryProducts, isLoading: isProductsLoading } = useGetAllProductsQuery([
        { name: 'category', value: category },
        { name: 'brand', value: brand },
        { name: 'maxPrice', value: maxPrice },
        { name: 'minPrice', value: minPrice },
        { name: 'page', value: currentPage },
        { name: 'limit', value: limit }
    ]);
    if(isProductsLoading){
        return <Loading/>
    }
    
    

    return (
        <div className="px-4 my-8">
            <h2 data-aos="fade-right" className="sectionTitle">
                Our <span className="primaryColor">All</span> Products
            </h2>
            <p data-aos="zoom-in" className="mt-4 text-center sectionSubtitle">
                Browse through our diverse collection of high-quality products, meticulously curated to cater to all your needs, offering the perfect balance of style, function, and durability for every occasion.
            </p>

            <div className="gap-4 md:flex">
                <div className="md:w-1/5">
                    <FilterSidebar />
                </div>
                {
                    (stationeryProducts?.data?.length ?? 0) > 0 ? <div className="mt-8 md:w-4/5 md:mt-0">
                        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-4">
                            {isProductsLoading
                                ? [...Array(12)].map((_, index) => (
                                    <div key={index} className="w-full p-4 bg-white border rounded-lg shadow-sm">
                                        <Skeleton height={200} className="w-full rounded-lg" />
                                        <Skeleton width="80%" height={20} className="mx-auto mt-3" />
                                        <Skeleton width="50%" height={20} className="mx-auto mt-2" />
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="inline-block w-2/5">
                                                <Skeleton height={30} className="rounded-md" />
                                            </div>
                                            <div className="inline-block w-2/5">
                                                <Skeleton height={30} className="rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : stationeryProducts?.data?.map((product: TProduct) => (
                                    <ProductCart product={product} key={product?._id} />
                                ))
                            }
                        </div>

                        {/* Pagination */}
                        <ProductPagination totalPage={stationeryProducts?.meta?.totalPage || 1} />
                    </div> : <div className="w-1/2 mx-auto mt-16">
                        <h2 className="text-2xl font-bold text-center">No Product Found</h2>
                    </div>
                }
            </div>
        </div>
    );
};

export default AllProducts;
