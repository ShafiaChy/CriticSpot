
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewManagementApi";
import Loading from "./loading/Loading";
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom";


const FeaturedReviews= () => {
    const { data: ProductReviews, isLoading } = useGetAllReviewsQuery(undefined);
    if(isLoading)
        return <Loading></Loading>

    
    return (
      <>           
       <div className="my-12 bg-white">
         <h1 className={`text-black relative z-10 text-3xl mx-auto uppercase text-center mb- border-red-400 border-t-4 border-b-4 py-5 md:w-3/12 `}>Featured Reviews </h1>
    </div>
        <div className="max-w-10xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">

      {/* Main Blog Post */}
      {
        ProductReviews?.data?.length && <Link to={`/reviewDetails/${ProductReviews?.data[0]?._id}`}><div className="md:col-span-2 bg-white shadow-lg rounded-lg overflow-hidden">
       <img src={ProductReviews?.data[0]?.featuredImage} alt={ProductReviews?.data[0]?.title} className="w-full h-5/6 object-cover" />
        <div className="p-5">
          <span className={`text-xs font-semibold px-2 py-1 rounded `}>
            {ProductReviews?.data[0]?.category?.name}
          </span>
          <h2 className="text-xl font-semibold text-gray-900 mt-2">{ProductReviews?.data[0]?.title}</h2>
          <div className="text-gray-500 text-sm mt-2">
            <span>{ProductReviews?.data[0]?.publishedDate}</span> 
          </div>
          <p>{ProductReviews?.data[0]?.content.slice(0,300)}...</p>
        </div>
      
      </div></Link>
 }
      {/* Sidebar Blog Posts */}
      <div className="flex flex-col space-y-4 ">
        {ProductReviews?.data?.slice(1,4).map((review) => (
         <Link  to={`/reviewDetails/${review?._id}`}>
        <div key={review._id} className="flex bg-white shadow-md rounded-lg overflow-hidden ">
            <img src={review.featuredImage} alt={review.title} className="w-1/3 object-cover" />
            <div className="p-4 flex flex-col justify-center">
              <span className={`text-xs font-semibold px-2 py-1 rounded`}>
                 <Badge>{review.category?.name}</Badge>
              </span>
              <h2 className="text-lg font-semibold text-gray-800 mt-2">{review.title}</h2>
              <div className="text-gray-500 text-sm mt-2">
                <span>{review.publishedDate}</span> •
              </div>
            </div>
          </div>
        
         </Link>
        ))}
      </div>
    </div>
    
    </>
    );
};

export default FeaturedReviews;