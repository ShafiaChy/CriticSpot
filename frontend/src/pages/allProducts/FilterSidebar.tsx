import { Checkbox } from "@/components/ui/checkbox";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryManagementApi";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
    const { data: categories } = useGetAllCategoryQuery(undefined);
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory = searchParams.get('category');
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : '';
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : '';

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
                <h2 className="text-xl font-semibold">Filter Products</h2>
                <div>
                    <button
                        className="w-full px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="my-4">
                <h3 className="mb-2 text-lg font-medium">Price Range</h3>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-full p-2 border rounded-md sm:w-1/2"
                        value={minPrice}
                        onChange={(e) => updateQueryParams('minPrice', e.target.value ? Number(e.target.value) : null)}
                    />
                    <span className="hidden sm:inline">—</span>
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-full p-2 border rounded-md sm:w-1/2"
                        value={maxPrice}
                        onChange={(e) => updateQueryParams('maxPrice', e.target.value ? Number(e.target.value) : null)}
                    />
                </div>
            </div>

            {/* Category Filter */}
            <div>
                <h3 className="mb-2 text-lg font-medium">Filter by Category</h3>
                
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
