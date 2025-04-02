// import { useGetAllProductsQuery } from "@/redux/features/product/productManagementApi";
// import ProductCart from "./ProductCart";
// import { Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
// import { useEffect } from "react";


// const FeaturedProducts = () => {
//     const { data: ProductReviews, isLoading } = useGetAllProductsQuery(undefined);
//     useEffect(() => {
//         AOS.init({ duration: 1000, once: true });
//     }, []);
//     return (
//         <div className="px-4 my-8 xl:px-0">
//             <h2 data-aos="fade-right" className="font-bold sectionTitle">Our <span className="primaryColor">Featured</span> Products</h2>
//             <p data-aos="zoom-in" className="sectionSubtitle">Explore our handpicked collection of top-quality products, designed to meet <br /> your needs and enhance your lifestyle effortlessly</p>
//             <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3">
//                 {isLoading
//                     ?
//                     [...Array(10)].map((_, index) => (
//                         <div key={index} className="p-4 border rounded-lg shadow-sm">
//                             <Skeleton height={150} />
//                             <Skeleton count={2} className="mt-2" />
//                             <Skeleton width="50%" className="mt-2" />
//                         </div>
//                     ))
//                     :
//                     ProductReviews?.data?.slice(0, 10)?.map((product) => (
//                         <ProductCart product={product} key={product?._id} />
//                     ))}
//             </div>
//             <div data-aos="zoom-in" className="flex items-center justify-center mt-6">
//                 <Link to='/allProducts'>
//                     <button
//                         style={{ borderRadius: "8px" }}
//                         className="text-sm font-medium bg-[#fb5770] text-white hover:bg-[#e44d63] px-12 rounded-lg h-11 focus:outline-none"
//                     >
//                         View All
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default FeaturedProducts;




import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MessageCircle } from "lucide-react";

interface Article {
  category: string;
  title: string;
  date: string;
  comments: string;
  image: string;
  author?: string;
}

const articles: Article[] = [
  {
    category: "Technology",
    title: "A powerhouse in your pocket, ideal for tech lovers.",
    date: "Mar 13, 2025",
    comments: "No Comments",
    image: "https://themes.envytheme.com/puva/wp-content/uploads/2025/03/banner7-790x454.jpg",
  },
  {
    category: "Lifestyle",
    title: "An essential kitchen companion for hassle-free cooking.",
    date: "Mar 13, 2025",
    comments: "No Comments",
    image: "https://themes.envytheme.com/puva/wp-content/uploads/2025/03/banner7-790x454.jpg",
  },
  {
    category: "Health & Wellness",
    title: "A must-have for anyone seeking radiant, youthful skin.",
    date: "Mar 13, 2025",
    comments: "No Comments",
    image: "https://themes.envytheme.com/puva/wp-content/uploads/2025/03/banner7-790x454.jpg",
  },
  {
    category: "Travel",
    title: "A game-changer for frequent flyers and adventurers.",
    date: "Mar 13, 2025",
    comments: "No Comments",
    image: "https://themes.envytheme.com/puva/wp-content/uploads/2025/03/banner7-790x454.jpg",
  },
];

const featuredArticle: Article = {
  category: "Laptops",
  title: "Top 10 Laptops of 2025: Unbiased Reviews for Every Need",
  date: "Mar 13, 2025",
  comments: "No Comments",
  author: "puva",
  image: "https://themes.envytheme.com/puva/wp-content/uploads/2025/03/banner7-790x454.jpg",
};

const PopularReviews= () => {
  return (
    <div className="bg-purple-100 p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 tracking-wide uppercase">
        Trending Reviews 
     </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {articles.slice(0, 2).map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>

        {/* Featured Article */}
        <div className="relative col-span-1 md:col-span-1">
          <img
            src={featuredArticle.image}
            alt={featuredArticle.title}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow-lg w-4/5 opacity-80">
            <Badge>{featuredArticle.category}</Badge>
            <h2 className="text-lg font-bold mt-2">{featuredArticle.title}</h2>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Calendar size={14} className="mr-1" /> {featuredArticle.date}
              <MessageCircle size={14} className="ml-4 mr-1" /> {featuredArticle.comments}
            </div>
            <p className="text-sm mt-2">By: {featuredArticle.author}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {articles?.slice(2, 4).map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className="overflow-hidden shadow-md rounded-xl">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-40 object-cover"
      />
      <CardContent className="p-4">
        <Badge>{article.category}</Badge>
        <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Calendar size={14} className="mr-1" /> {article.date}
          <MessageCircle size={14} className="ml-4 mr-1" /> {article.comments}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularReviews;