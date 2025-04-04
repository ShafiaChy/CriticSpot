import Loading from "@/components/loading/Loading";
import { useGetAllReviewsQuery, useGetSingleReviewQuery } from "@/redux/features/review/reviewManagementApi";

import { TReview } from "@/types";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

const ReviewDetails = () => {
    const { data: products } = useGetAllReviewsQuery(undefined);
    const { id } = useParams();
    const { data: ProductReview, isLoading, isError } = useGetSingleReviewQuery({
        productId: id
    })


   

    if (isLoading) {
        return <Loading />


    }

    if (isError || !ProductReview?.data) {
        return <p>Error fetching product details. Please try again later.</p>;
    }
    const { author, content, title, featuredImage, createdAt, category } = ProductReview?.data as TReview
    const relatedProducts = products?.data?.filter((product: TReview) => product?.category?.name === category?.name  && product.title !== title);

    const formattedDate = new Date(createdAt).toISOString().split('T')[0];

    
   

    return (
        <div className="px-4 my-8">
           

            <div className="items-center justify-between gap-8 md:flex">
                <div className="flex-1">
                    <img className="w-full md:h-[400px] object-cover" style={{ borderRadius: '8px' }} src={featuredImage} alt={title} />
                </div>

                <div className="flex flex-col flex-1 mt-4 space-y-4 md:mt-0">
                    <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
                        <h2 className="text-xl font-bold text-gray-800 lg:text-3xl md:text-2xl">
                            {title}
                            
                        </h2>
                      
                    
                    </div>
                    <div className="flex items-center space-x-4 text-gray-600 text-sm">
                            <div className="flex items-center space-x-1">
                                <FaUser className="text-red-600" />
                                <span>{author?.name}</span>
                            </div>
                            <span>|</span>
                            <div className="flex items-center space-x-1">
                                <FaCalendarAlt className="text-red-600" />
                                <span>{formattedDate}</span>
                            </div>
                            {/* <span>|</span>
                            <div className="flex items-center space-x-1">
                                <FaComment className="text-blue-600" />
                            
                            </div> */}
                            </div>
                  
                   

                    <p className="text-sm leading-6 text-gray-700 text-justify">
                        {content}
                    </p>
                    
                   
                </div>
             
            </div>

            <div className="mt-16">
                {
                    relatedProducts?.length? (
                     <h2 className="mb-4 text-2xl font-bold text-gray-700">Related Products</h2>) : null
                }
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-6">
                    {
                        relatedProducts?.slice(0, 12)?.map((product: TReview ) => (
                            <div key={product?._id} className="bg-white border shadow rounded-xl">
                                <img className="h-[200px] w-full object-cover rounded-t-xl" src={product?.featuredImage} alt="" />
                                <div className="p-4">
                                    <Link to={`/reviewDetails/${product?._id}`} >
                                        <h2 className="text-lg font-medium text-center text-gray-700 hover:text-[#fb5770] hover:underline">{product?.title}</h2></Link>
                                    <p className="text-[#fb5770] text-sm font-bold text-justify mt-4">{product?.content.slice(0,200)}...</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ReviewDetails;