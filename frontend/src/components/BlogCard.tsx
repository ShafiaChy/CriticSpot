import { TBlog } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";


const BlogCard = ({ blog }: { blog: TBlog }) => {
    const { _id,title, thumbnail, category, content } = blog;
 


    return (
        <div>
        <div className="relative card card-compact w-96 bg-base-100 shadow-xl">
            <div className='price absolute bg-gray-900 top-2 right-0 px-4 py-2 text-white'>{category}</div>
            <figure><img className='h-96' src={thumbnail} alt="Shoes" /></figure>
            <div className="card-body bg-cart place-items-center ">
                <h2 className="text-2xl text-center my-7 text-black">{title}</h2>
                
                <p className='text-black text-center p-4'>{content.slice(0,120)}</p>
                <div className="card-actions justify-center">
                <Link to={`/blogs/${_id}`}>
                    <Button
                      className="rounded-2xl uppercase py-5 px-5 mb-5 bg-red-500 border-b-2 border-0 border-red-700">Read More</Button>
                </Link>
                </div>
            </div>
           
        </div>
    </div>
      
    );
};

export default BlogCard;
