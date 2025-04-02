import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const ProductPagination = ({ totalPage }: { totalPage: number }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPageFromURL = Number(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(currentPageFromURL);

    // Update the URL only when currentPage changes, without reloading the page
    useEffect(() => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set("page", currentPage.toString()); // Update page parameter
            return newParams;
        });
    }, [currentPage, setSearchParams]);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex items-center justify-center gap-2 my-8 md:gap-4">
            {/* Previous Button */}
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="md:px-4 md:py-4 p-[6px] text-white transition-all duration-300 ease-in-out transform rounded-full bg-[#fb5770] hover:bg-[#fb5770]/90 disabled:bg-gray-300 disabled:text-gray-600 hover:scale-105"
            >
                <FaChevronLeft />
            </button>

            {/* Page Buttons */}
            {[...Array(totalPage)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageClick(index + 1)}
                    className={`md:px-5 md:py-2 px-[10px] rounded-full md:text-lg font-medium transition-all duration-300 ease-in-out 
                    ${currentPage === index + 1
                        ? 'bg-[#fb5770] text-white shadow-lg scale-105'
                        : 'bg-white text-[#fb5770] border border-[#fb5770] hover:bg-[#fb577042] hover:scale-105'} 
                    transform`}
                >
                    {index + 1}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={totalPage === currentPage}
                className="md:px-4 md:py-4 p-[6px] text-white transition-all duration-300 ease-in-out transform rounded-full bg-[#fb5770] hover:bg-[#fb5770]/90 disabled:bg-gray-300 disabled:text-gray-600 hover:scale-105"
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default ProductPagination;
