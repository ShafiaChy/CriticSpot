import { useGetAllCategoryQuery } from "@/redux/features/category/categoryManagementApi";
import { TCategory } from "@/types";
import { Link } from "react-router-dom";


const AllCategory = () => {
    const { data: categories } = useGetAllCategoryQuery(undefined)
    return (
        <div className="px-4 my-8 lg:px-0">
            <h2 className="font-bold sectionTitle">Browse <span className="primaryColor">Categories</span></h2>
            <p className="sectionSubtitle"> Stay updated with our most recent articles and insights!</p>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {categories?.data?.map((category: TCategory) => (
                    <Link to={`/allProducts?page=1&category=${category?._id}`} key={category?._id} className="hover:text-[#fb5770] font-medium">
                        <div className="flex flex-col items-center justify-center gap-4 p-4 border rounded shadow hover:shadow-lg">
                            <img className="w-[40px] h-[40px]" src={category?.image} alt={category?.name} />
                            <h2 className="md:text-[16px] text-sm">{category?.name}</h2>
                        </div></Link>
                ))}
            </div>
        </div>
    );
};

export default AllCategory;