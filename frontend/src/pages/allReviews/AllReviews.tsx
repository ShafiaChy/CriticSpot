
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import FilterSidebar from "./FilterSidebar";
import { useLocation } from "react-router-dom";
import { TReview } from "@/types";
import ProductPagination from "@/components/Pagination";
import Loading from "@/components/loading/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ReviewCard from "@/components/ReviewCard";
import { useGetAllReviewsQuery } from '@/redux/features/review/reviewManagementApi';


const useQueryParams = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
};

const AllReviews = () => {
    const queryParams = useQueryParams();
    const currentPage = queryParams.get('page') || '1';
    const limit = '12';
    const category = queryParams.get('category');
    const author = queryParams.get('author.name');
   
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []); 

    // Fetch products with dynamic page and category filters
    const { data: ProductReviews, isLoading: isProductsLoading } = useGetAllReviewsQuery([
        { name: 'category', value: category },
        { name: 'author', value: author },
        { name: 'page', value: currentPage },
        { name: 'limit', value: limit }
    ]);
 
    if(isProductsLoading){
        return <Loading/>
    }
    
    

    return (
        <div className="px-4 my-8">
            <div className="container-lg">
            <div className='bg-img flex justify-center items-center'>
                <div className='section text-style text-black flex justify-center items-center font-bold'>
                    <div className="text-center">
                        <h2 className='uppercase text-7xl text-animation'>All Reviews</h2>
                        <br />
                        <small className='text-lg '>Browse through by filter and find the reviews you are looking for</small>
                    </div>
                </div>
            </div>
          
        </div>
          

            <div className="gap-4 md:flex mt-10">
                <div className="md:w-1/5">
                    <FilterSidebar />
                </div>
                {
                    (ProductReviews?.data?.length ?? 0) > 0 ? <div className="mt-8 md:w-4/5 md:mt-0">
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
                                : ProductReviews?.data?.map((product: TReview) => (
                                    <ReviewCard product={product} key={product?._id} />
                                ))
                            }
                        </div>

                        {/* Pagination */}
                        <ProductPagination totalPage={ProductReviews?.meta?.totalPages || 1} />
                    </div> : <div className="w-1/2 mx-auto mt-16">
                        <h2 className="text-2xl font-bold text-center">No Product Found</h2>
                    </div>
                }
            </div>
        </div>
    );
};

export default AllReviews;
