import { useGetAllCategoryQuery } from "@/redux/features/category/categoryManagementApi";
import { TCategory } from "@/types";
import BookImage from "../assets/images/banner.png"
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


const Banner = () => {
    const { data: categories, isLoading } = useGetAllCategoryQuery(undefined);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div>
            <div className="flex justify-between gap-4 px-0 mt-8 overflow-hidden bg-white lg:gap-8 md:mt-0 lg:px-0 md:px-4">
                <div className="hidden w-1/4 mt-8 md:block">
                    <h2 className="mb-4 ml-2 text-xl">Browse Categories</h2>
                    <div >
                        {isLoading ?
                            [...Array(10)].map((_, index) => (
                                <div key={index} className="flex items-center gap-2 px-4 py-[6px] border rounded-lg shadow-sm">
                                    <Skeleton circle height={24} width={24} />
                                    <Skeleton width="80%" height={16} />
                                </div>
                            ))
                            :
                            categories?.data?.slice(0, 10)?.map((category: TCategory) => (
                                <div key={category?._id}>
                                    <Link to={`/allProducts?page=1&category=${category?._id}`}>
                                        <ul className="flex items-center gap-2 px-4 py-2 border hover:text-[#fb5770] hover:bg-[#fb577029]">
                                            <img data-aos="fade-right" className="w-6" src={category?.image} alt={category?.name} />
                                            <li data-aos="fade-right" className="lg:text-[16px] text-sm">{category?.name}</li>
                                        </ul>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="md:w-3/4 px-4 lg:px-0 bg-[#fb5770] mt-8 lg:flex flex-row-reverse items-center rounded">
                    <div data-aos="fade-down" className="flex items-center justify-center flex-1">
                        <img
                            className="lg:w-[600px] md:w-[400px] object-cover "
                            src={BookImage}
                            alt="Stationery collection"
                            width={600}
                        />
                    </div>
                    <div className="flex-1 p-8 lg:p-8 md:p-0 lg:pl-16">
                        <h1 data-aos="fade-right" className="text-3xl font-bold tracking-tight text-center text-gray-800 md:text-4xl lg:text-5xl lg:text-start">
                            Premium <span className="text-white">Stationery </span>
                            Supplies
                        </h1>
                        <p data-aos="fade-right" className="my-4 mb-8 text-center text-white md:text-lg lg:text-start">
                            Discover our curated collection of high-quality stationery essentials. From premium notebooks to luxury
                            pens, we have everything you need to make your ideas come to life.
                        </p>
                        <div data-aos="zoom-in" className="flex justify-center lg:justify-start">
                           <Link to={'/allProducts'}>
                           <button
                                style={{
                                    borderRadius: "8px",
                                }}
                                className="text-sm font-medium border border-white bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-8 rounded-lg h-11 focus:outline-none"
                            >
                                Shop now
                            </button></Link>
                        </div>
                    </div>


                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4 my-16 md:gap-4 lg:grid-cols-4">
                <div  className="items-center justify-center gap-4 border-r-2 md:flex">
                    <img data-aos="zoom-out-up" className="w-8 mx-auto xl:mx-0 lg:mx-auto md:mx-0 md:w-16" src="https://cdn-icons-png.freepik.com/256/3806/3806012.png?ga=GA1.1.2122364497.1742731770&semt=ais_hybrid" alt="" />
                    <div data-aos="fade-right" className="text-center md:text-start">
                        <h2 className="text-gray-700 md:font-bold md:text-lg">Fast delivery</h2>
                        <p className="md:text-[16px] text-sm">For all orders over $120</p>
                    </div>
                </div>
                <div  className="items-center justify-center gap-4 md:flex lg:border-r-2">
                    <img data-aos="zoom-out-up" className="w-8 mx-auto xl:mx-0 lg:mx-auto md:mx-0 md:w-16" src="https://cdn-icons-png.freepik.com/256/2059/2059129.png?ga=GA1.1.2122364497.1742731770&semt=ais_hybrid" alt="" />
                    <div data-aos="fade-right" className="text-center md:text-start">
                        <h2 className="text-gray-700 md:font-bold md:text-lg">Safe Payments</h2>
                        <p className="md:text-[16px] text-sm">100% secure payment</p>
                    </div>
                </div>
                <div  className="items-center justify-center gap-4 border-r-2 md:flex">
                    <img data-aos="zoom-out-up" className="w-8 mx-auto xl:mx-0 lg:mx-auto md:mx-0 md:w-16" src="https://cdn-icons-png.freepik.com/256/2229/2229248.png?ga=GA1.1.2122364497.1742731770&semt=ais_hybrid" alt="" />
                    <div data-aos="fade-right" className="text-center md:text-start">
                        <h2 className="text-gray-700 md:font-bold md:text-lg"> Discount Coupons</h2>
                        <p className="md:text-[16px] text-sm">Enjoy Huge Promotions</p>
                    </div>
                </div>
                <div  className="items-center justify-center gap-4 md:flex">
                    <img data-aos="zoom-out-up" className="w-8 mx-auto xl:mx-0 lg:mx-auto md:mx-0 md:w-16" src="https://cdn-icons-png.freepik.com/256/4961/4961759.png?ga=GA1.1.2122364497.1742731770&semt=ais_hybrid" alt="" />
                    <div data-aos="fade-right" className="text-center md:text-start">
                        <h2 className="text-gray-700 md:font-bold md:text-lg">Quality Support</h2>
                        <p className="md:text-[16px] text-sm">Dedicated 24/7 support</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;