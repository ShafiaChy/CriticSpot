import { useDeleteProductMutation, useGetAllProductsQuery } from "@/redux/features/product/productManagementApi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Loading from "@/components/loading/Loading";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "react-router-dom";
import ProductPagination from "@/components/Pagination";
const useQueryParams = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
};
const GetAllProducts = () => {
    const queryParams = useQueryParams();
    const currentPage = queryParams.get('page') || '1'; 
    const limit = '12';
    const { data: stationeryProducts, isLoading } = useGetAllProductsQuery(
        [
            { name: 'page', value: currentPage },
            { name: 'limit', value: limit }
        ]
    );
    const [deleteProduct] = useDeleteProductMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Handle opening the modal
    const openModal = (itemId: any) => {
        setItemToDelete(itemId); // Pass the item id to delete
        setIsModalOpen(true);
    };

    // Handle closing the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };

    // Handle the delete action
    const handleDelete = async () => {
        const toastId = toast.loading('Deleting..');
        if (itemToDelete) {
            const res = await deleteProduct({
                id: itemToDelete
            })
            if (res?.data?.success) {
                toast.success(res?.data?.message, { id: toastId });
            } else if (res?.error) {
                toast.error('Something went wrong. Please try again!', { id: toastId });
            }
            closeModal();
        }
    };
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="px-4">
             <div>
                <h2 className="dashboardTitle">View All <span className="primaryColor">Stationery</span> Products</h2>
                <p className="dashboardSubtitle">Manage and explore your entire stationery inventory in one place.</p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Update</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                {stationeryProducts?.data?.map(product => (
                    <TableBody key={product?._id}>
                        <TableRow>
                            <TableCell >
                                <img className="w-[40px] h-[40px] rounded-full object-cover" src={product?.image} alt="" />
                            </TableCell>
                            <TableCell>{product?.name}</TableCell>
                            <TableCell>{product?.brand}</TableCell>
                            <TableCell>{product?.category?.name}</TableCell>
                            <TableCell>{product?.quantity}</TableCell>
                            <TableCell>{product?.price}</TableCell>
                            <TableCell>
                                <Link to={`/dashboard/admin/updateProduct/${product?._id}`}>
                                    <button
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                        className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-2 rounded-lg py-2 focus:outline-none"
                                    >
                                        Update
                                    </button></Link>
                            </TableCell>
                            <TableCell>
                                <button
                                    style={{ borderRadius: "8px" }}
                                    className="text-sm font-medium bg-[#fb5770] text-white hover:bg-[#e44d63] px-2 rounded-lg py-2 focus:outline-none"
                                    onClick={() => openModal(product?._id)} // Pass the correct item ID
                                >
                                    Delete
                                </button>
                            </TableCell>

                            {/* Modal */}
                            {isModalOpen && itemToDelete === product?._id && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                    <div style={{ borderRadius: '8px' }} className="w-64 p-6 bg-white">
                                        <h3 className="text-lg font-semibold text-center">Are you sure you want to <br /> delete this product?</h3>
                                        <div className="flex justify-between mt-4">
                                            <button
                                                onClick={closeModal}
                                                style={{ borderRadius: '8px' }}
                                                className="px-4 py-2 text-gray-700 bg-gray-300"
                                            >
                                                No
                                            </button>
                                            <button
                                                onClick={handleDelete}
                                                style={{ borderRadius: '8px' }}
                                                className="bg-[#fb5770] text-white px-4 py-2"
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </TableRow>
                    </TableBody>
                ))}
            </Table>

            <ProductPagination totalPage={stationeryProducts?.meta?.totalPage || 1} />
        </div>
    );
};

export default GetAllProducts;
