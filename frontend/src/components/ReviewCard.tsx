
import { TReview } from "@/types";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FiHeart } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

type TReviewCard = Pick<TReview, '_id' | 'title' | 'category' | 'content' | 'featuredImage'>;



const ReviewCard = ({ product }: { product: TReviewCard }) => {

    const { _id, title, category,content,featuredImage } = product;

    const linkRef = useRef<HTMLAnchorElement>(null);
    

   

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);
  


    return (
        <div>
            <Link ref={linkRef} to={`/productDetails/${_id}`}>
                <div data-aos="zoom-in-up" style={{ borderRadius: '8px' }} className=" relative overflow-hidden transition-all duration-500 transform bg-white shadow-xl hover:scale-105 hover:shadow-2xl h-[350px]">
                    <button className="absolute top-2 right-2 text-[#fb5770] text-xl font-bold">
                        <FiHeart />
                    </button>
                    <img src={featuredImage} alt={title} className="object-cover w-full h-40 rounded-t-lg" />

                    <div className="p-2 md:p-6">
                        {/* <h2 className="md:block hidden mb-2 md:text-xl md:font-bold font-medium text-[#3f4343]">
                            {title.length > 20 ? title.slice(0, 20
                            ) + "..." : name}
                        </h2> */}
                        <h2 className="md:hidden mb-2 md:text-xl md:font-bold font-medium text-[#3f4343]">
                            {title.length > 12 ? title.slice(0, 12
                            ) + "..." : title}
                        </h2>
                        <p className="md:text-[16px] text-sm">Category: {category.name}</p>
                      

                        <div className="flex items-center justify-center mt-4 lg:justify-between">
                           
                              
                                <p>
                                    {content.slice(0,120)}...
                                </p>
                         

                           
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ReviewCard;
