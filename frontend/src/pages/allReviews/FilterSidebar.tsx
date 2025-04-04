import { Checkbox } from "@/components/ui/checkbox";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryManagementApi";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
    const { data: categories } = useGetAllCategoryQuery(undefined);
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory = searchParams.get('category');


    const updateQueryParams = (key: string, value: string | number | null) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, String(value));
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchParams({});
    };

    return (
        <div className="w-full p-4 bg-white border rounded-lg shadow-md md:w-72">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Filter Reviews</h2>
                <div>
                    <button
                        className="w-full px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

          

            {/* Category Filter */}
            <div>
                <h3 className="mb-2 text-lg font-medium">Browse by Category</h3>
                
                {/* Show dropdown on small screens */}
                <div className="sm:hidden">
                    <select
                        value={selectedCategory || ''}
                        onChange={(e) => updateQueryParams('category', e.target.value || null)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Select Category</option>
                        {categories?.data?.map((category) => (
                            <option key={category?._id} value={category?._id}>
                                {category?.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Show checkboxes on medium and larger screens */}
                <div className="hidden space-y-3 sm:block">
                    {categories?.data?.map((category) => (
                        <div key={category?._id} className="flex items-center space-x-2">
                            <Checkbox
                                checked={selectedCategory === category?._id}
                                onClick={() => {
                                    const newCategory = selectedCategory === category?._id ? null : category?._id;
                                    updateQueryParams('category', newCategory);
                                }}
                                id={category?._id}
                            />
                            <label htmlFor={category?._id} className="text-sm font-medium">
                                {category?.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
