// import { useGetAllProductsQuery } from "@/redux/features/product/reviewManagementApi";
// import { TReview } from "@/types";
// import { Link } from "react-router-dom";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
// import { useGetAllCategoryQuery } from "@/redux/features/category/categoryManagementApi";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useEffect } from "react";

// const AboutUs = () => {
//     const { data: products, isLoading } = useGetAllProductsQuery(undefined)
//     const writingProducts = products?.data?.filter((product: TReview) => product?.category?.name === 'Writing')
//     const { data: categories } = useGetAllCategoryQuery(undefined)
//     const writing = categories?.data?.find((item: any) => item?.name === "Writing")
//     useEffect(() => {
//         AOS.init({ duration: 1000, once: true });
//     }, []);

//     return (
//         <div className="mx-4 md:my-32">
//             <div className="flex items-center justify-between gap-8 mb-8">
//                 <h2 data-aos="fade-right" className="text-lg font-bold text-gray-700 md:text-2xl">Cute Writing Products</h2>
//                 <Link data-aos="fade-right" to='/allProducts'>
//                     <button
//                         style={{ borderRadius: "8px" }}
//                         className="text-sm font-medium bg-[#fb5770] text-white hover:bg-[#e44d63] px-12 rounded-lg h-11 focus:outline-none"
//                     >
//                         View All
//                     </button>
//                 </Link>
//             </div>
//             <div className="flex-row-reverse justify-between gap-8 xl:flex">
//                 <div className="xl:w-1/3">
//                     <div className="flex flex-col items-center p-4 w-full xl:h-[600px] lg:h-[300px] md:h-[250px] h-full" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/digital-pen-writing-code-with-blue-light-effects-background-representing-ai-powered-content-writing-automated-content-generation-digital-content-creation_982248-11880.jpg?ga=GA1.1.2122364497.1742731770&semt=ais_hybrid')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: '8px' }} >

//                         <h2 data-aos="zoom-in-up" className="mt-8 text-2xl font-bold text-white md:mt-16 lg:text-4xl">Writing Accessories</h2>
//                         <Link data-aos="zoom-in-up" to={`/allProducts?page=1&category=${writing?._id}`}>
//                             <button
//                                 style={{
//                                     borderRadius: "8px",
//                                 }}
//                                 className="text-sm mt-8 font-medium border border-white bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-8 rounded-lg h-11 focus:outline-none"
//                             >
//                                 Shop now
//                             </button>
//                         </Link>
//                     </div>

//                 </div>
//                 <div className="grid grid-cols-2 gap-4 mt-8 xl:w-2/3 md:grid-cols-3 lg:grid-cols-4 xl:mt-0">
//                     {
//                         isLoading
//                             ?
//                             [...Array(8)].map((_, index) => (
//                                 <div key={index} className="bg-white border shadow rounded-xl">
//                                     <Skeleton height={200} className="rounded-t-xl" />
//                                     <div className="p-4">
//                                         <Skeleton width="80%" height={20} className="mx-auto" />
//                                         <Skeleton width="50%" height={20} className="mx-auto mt-2" />
//                                     </div>
//                                 </div>
//                             ))
//                             :
//                             writingProducts?.slice(0, 8)?.map((product: TReview) => (
//                                 <div key={product?._id} className="bg-white border shadow rounded-xl" data-aos="zoom-in-up">
//                                     <img className="lg:h-[200px] h-[150px] w-full object-cover rounded-t-xl" src={product?.image} alt="" />
//                                     <div className="p-2 lg:p-4">
//                                         <Link to={`/productDetails/${product?._id}`} >

//                                             <h2 className="text-lg font-medium text-center text-gray-700 hover:text-[#fb5770] hover:underline">

//                                                 {product?.name.length > 20 ? product?.name.slice(0, 20
//                                                 ) + "..." : product?.name}

//                                             </h2></Link>
//                                         <p className="text-[#fb5770] text-lg font-bold text-center">{product?.price}tk</p>
//                                     </div>
//                                 </div>
//                             ))
//                     }
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default AboutUs;




const AboutUs= () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3">
        {/* Left Section - Image with Overlay */}
        <div className="relative bg-cover bg-center min-h-[500px] flex items-center justify-center px-8 col-span-2"
          style={{ backgroundImage: "url('https://themes.envytheme.com/puva/wp-content/uploads/2025/03/banner1-790x700.jpg')" }}>
          <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
          <div className="relative text-white border-2 border-white p-8 text-center max-w-xl">
            <h3 className="text-sm font-semibold tracking-wide">ABOUT</h3>
            <h2 className="text-3xl font-bold my-2 uppercase">Critic Spot</h2>
            <p className="text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec odio. 
              Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
            </p>
            <button className="bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
              Read More
            </button>
          </div>
        </div>

        {/* Right Section - Why Trust Our Reviews? */}
        <div className="bg-black text-white p-10 flex flex-col justify-center space-y-8 min-h-[700px]">
          <h2 className="text-3xl font-bold text-center mb-4">Why Trust Our Reviews?</h2>
          
          <FeatureItem
            icon="🔍"
            title="Expert Analysis"
            description="Our team thoroughly researches every product to provide accurate and detailed reviews."
          />
          <FeatureItem
            icon="📝"
            title="User-Generated Ratings"
            description="Real customer feedback and ratings help you make the best choice."
          />
          <FeatureItem
            icon="📊"
            title="Data-Driven Comparisons"
            description="We compare features, performance, and pricing so you don’t have to."
          />

          {/* Trust Ratings */}
          <div className="text-center mt-6">
            <h3 className="text-xl font-semibold">Trusted by 50,000+ Users</h3>
         
           
          </div>

          {/* Featured Review */}
          <div className="bg-gray-800 p-5 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold">Featured Review</h3>
            <p className="text-sm text-gray-300 mt-2">
              "The best product review platform! Helped me find the perfect laptop for my work."
            </p>
            <p className="text-xs text-gray-400 mt-1">— Jane Doe, Verified Buyer</p>
          </div>

          
         
        </div>
      </div>
      
    </section>
  );
};

// Reusable stat item component
interface FeatureItemProps {
    icon: string;
    title: string;
    description: string;
  }
  
  const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 flex items-center justify-center  text-black rounded-full text-2xl">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    );
  };

export default AboutUs;
