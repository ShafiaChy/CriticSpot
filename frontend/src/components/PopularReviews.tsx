

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card";

import AOS from "aos";
import { Calendar, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import Loading from "./loading/Loading";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewManagementApi";
import { Link } from "react-router-dom";
import { TReview } from "@/types";





const PopularReviews= () => {
    const { data: ProductReviews, isLoading } = useGetAllReviewsQuery(undefined);
    // console.log(error)
        const topReviews = ProductReviews?.data?.filter((reviews: TReview) => reviews?.rating > 4);
    
    
  
    console.log(topReviews)
    const latestPost = topReviews?.reduce((latest, current) => {
      return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
    });
    const isMiddle = false;
    console.log(latestPost)
    
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    if(isLoading)
      return <Loading></Loading>
  return (
    <div className="bg-purple-100 p-8 min-h-screen">
      <div className="mt-12 pt-12 bg-white">
         
            <h1 className={`text-black relative z-10 text-3xl mx-auto uppercase text-center border-red-400 border-t-4 border-b-4 py-5 md:w-3/12 `}>Trending Reviews </h1>
        </div>
    
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 ">
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:col-span-1">
          {topReviews?.slice(1, 3)?.map((article, index) => (
            <ArticleCard key={index} isMiddle={isMiddle} article={article}  />
          ))}
        </div>

        <div className="flex flex-col gap-6 md:col-span-3 max-h-xl">
      {/* You can add your larger design or content here */}
      <div className="bg-white p-6 shadow-md rounded-lg">
      {
        latestPost && <ArticleCard  isMiddle={true} article={latestPost} />
      }
      </div>
    </div>
      
       
        <div className="flex flex-col gap-6 md:col-span-1">
          {topReviews?.slice(3, 6).map((article, index) => (
            <ArticleCard key={index} article={article} isMiddle={isMiddle} />
          ))}
        </div>
      </div>
    </div>
   
  );
};

interface ArticleCardProps {
  article: TReview;
  isMiddle: boolean
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article ,isMiddle}) => {
  const date = new Date(article?.publishedDate);
  const readableDate = date.toLocaleString();
  return (
    <Link to={`/reviewDetails/${article?._id}`}>
      <Card className="overflow-hidden shadow-md rounded-xl">
      <img
        src={article.featuredImage}
        alt={article.title}
        className={`w-full object-cover ${isMiddle ? 'h-500' : 'h-40'}`}
      />
      <CardContent className="p-4">
        <Badge>{article?.category?.name}</Badge>
        <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Calendar size={14} className="mr-1" /> {readableDate}
          
          <MessageCircle size={14} className="ml-4 mr-1" /> text
        </div>
        <p>{article?.content?.slice(0, 50)}...</p>
      </CardContent>
    </Card>
    </Link>
    
  );
};

export default PopularReviews;