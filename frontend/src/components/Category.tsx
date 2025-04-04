
import Skeleton from 'react-loading-skeleton';
import Loading from './loading/Loading';
import { useEffect } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { useGetAllCategoryQuery } from '@/redux/features/category/categoryManagementApi';
import { TCategory } from '@/types';

const Category = () => {
    const { data: categories, isLoading } = useGetAllCategoryQuery(undefined);
    
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    if(isLoading)
      return <Loading></Loading>
    return (
        <div className='my-10 '>
             <div className="hidden mx-auto w-11/12 md:block">
                    <h2 className="mb-4 ml-2 text-xl">Browse Categories</h2>
                    <div className='flex gap-4 justify-center' >
                        {isLoading ?
                            [...Array(10)].map((_, index) => (
                                <div key={index} className="flex items-center gap-2 px-4 py-[6px] border rounded-lg shadow-sm">
                                    <Skeleton circle height={24} width={24} />
                                    <Skeleton width="80%" height={16} />
                                </div>
                            ))
                            :
                            categories?.data?.slice(0, 10)?.map((category: TCategory) => (
                                <div className="flex w-96" key={category?._id}>
                                    <Link to={`/allReviews?page=1&category=${category?._id}`}>
                                        <ul className=" h-40 items-center gap-2 px-4 py-2 border hover:text-[#fb5770] hover:bg-[#fb577029]">
                                        <img data-aos="fade-right" className="w-20" src={category?.image} alt={category?.name} />
                                            <li data-aos="fade-right" className="lg:text-[16px]  mt-4 text-sm">{category?.name}</li>
                                        </ul>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
        </div>
    );
};

export default Category;