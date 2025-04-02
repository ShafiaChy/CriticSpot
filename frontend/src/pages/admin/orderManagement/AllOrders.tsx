import Loading from "@/components/loading/Loading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TOrder } from "@/pages/verify/OrderVerify";
import { useDeleteOrderMutation, useGetOrdersQuery, useUpdateOrderStatusMutation } from "@/redux/features/order/orderManagementApi";
import { useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { TbAlertTriangleFilled } from "react-icons/tb";
import { DialogClose } from "@radix-ui/react-dialog";
import ProductPagination from "@/components/Pagination";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
};

const AllOrders = () => {
    const queryParams = useQueryParams();
    const currentPage = queryParams.get('page') || '1';
    const limit = '12';
    const { data: getOrders, isLoading: addedCartLoading } = useGetOrdersQuery(
        {
            page: currentPage,
            limit: limit,
        }
    );
    const [updateOrderStatus] = useUpdateOrderStatusMutation();
    const [deleteOrder] = useDeleteOrderMutation();
    const [orderStatusData, setOrderStatusData] = useState<TOrder | null>(null);
    const [orderDeleteId, setOrderDeleteId] = useState(null);


    const openUpdateModal = (orderData: any) => {
        setOrderStatusData(orderData);
    };

    const openDeleteModal = (deleteId: any) => {
        setOrderDeleteId(deleteId);
    };

    const handleUpdate = async (status: string) => {
        const toastId = toast.loading('Updating...')
        try {
            const updateOrderInfo = {
                email: orderStatusData?.email,
                orderId: orderStatusData?._id,
                status: status
            }
            const res = await updateOrderStatus(updateOrderInfo)
            if (res?.data?.success) {
                toast.success(res?.data?.message, { id: toastId });
            } else if (res?.error) {
                toast.error('Something went wrong. Please try again!', { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong. Please try again!', { id: toastId });
        }
    }

    const handleDelete = async () => {
        const toastId = toast.loading('Deleting..');
        if (orderDeleteId) {
            const res = await deleteOrder({
                id: orderDeleteId
            })
            if (res?.data?.success) {
                toast.success(res?.data?.message, { id: toastId });
            } else if (res?.error) {
                toast.error('Something went wrong. Please try again!', { id: toastId });
            }
        }
    };



    if (addedCartLoading) {
        return <Loading />
    }
    return (
        <div>
            <h2 className="dashboardTitle">View All<span className="primaryColor"> Order </span> Products</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead>Transaction Status</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                {getOrders?.data?.map((order: TOrder) => (
                    <TableBody key={order?._id}>
                        <TableRow style={{ borderBottom: '1px solid #D1D5DB' }}>
                            <TableCell>{order?.email}</TableCell>
                            <TableCell>
                                {order?.products?.map((product, index) =>
                                    product?.product?.name ? (
                                        <p className="text-sm" key={index}>
                                            {product?.product?.name?.slice(0, 10)}
                                            {product?.product?.name?.length > 10 ? "..." : ""} ,
                                        </p>
                                    ) : null
                                )}
                            </TableCell>

                            <TableCell>{new Date(order?.createdAt)?.toLocaleDateString()}</TableCell>
                            <TableCell>{order?.totalPrice}tk</TableCell>
                            <TableCell>{order?.transaction?.transactionStatus}</TableCell>
                            <TableCell>
                                {
                                    order?.status === 'Pending' ? <Dialog>
                                        <DialogTrigger>
                                            <button
                                                style={{
                                                    borderRadius: "50px",
                                                }}
                                                onClick={() => openUpdateModal(order)}
                                                className="text-sm w-[120px] rounded-full font-medium border border-[#fb5770] text-white bg-[#fb5770] hover:text-white px-4 py-2 focus:outline-none"
                                            >
                                                {order?.status}
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent style={{ borderRadius: '8px' }} className="max-w-sm p-6 bg-white shadow-xl">
                                            <DialogHeader className="text-center">
                                                <DialogTitle className="text-xl font-semibold text-center">Are you sure?</DialogTitle>
                                                <DialogDescription className="text-center text-gray-600">
                                                    update this order status?
                                                </DialogDescription>
                                            </DialogHeader>

                                            <DialogFooter className="flex justify-center gap-4">
                                                <DialogClose asChild>
                                                    <button
                                                        style={{
                                                            borderRadius: "8px",
                                                        }}
                                                        className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-4 rounded-lg py-2 focus:outline-none"
                                                    >
                                                        Cancel
                                                    </button>
                                                </DialogClose>
                                                <button
                                                    onClick={() => handleUpdate('Shipping')}
                                                    style={{
                                                        borderRadius: "8px",
                                                    }}
                                                    className="text-sm font-medium border border-[#fb5770] text-white bg-[#fb5770] hover:text-white px-4 rounded-lg py-2 focus:outline-none"
                                                >
                                                    Shipping
                                                </button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                        : <span
                                            className={`text-sm w-[120px] font-semibold flex items-center justify-center gap-2 p-1 rounded-full 
                                                ${order?.status === "Shipping"
                                                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                                                    : "bg-gray-500 text-white"
                                                }`}
                                            style={{
                                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                                transition: "all 0.3s ease-in-out",
                                            }}
                                        >
                                            <img className="w-[30px] md:block hidden" src="https://cdn-icons-png.flaticon.com/512/5952/5952766.png" alt="" />
                                            <span>
                                                {order?.status === "Pending"
                                                    ? "Pending"
                                                    : order?.status === "Shipping"
                                                        ? "Shipping"
                                                        : "Unknown"}
                                            </span>
                                        </span>

                                }

                            </TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger>
                                        <button
                                            style={{
                                                borderRadius: "8px",
                                            }}
                                            onClick={() => openDeleteModal(order?._id)}
                                            className="text-sm font-medium border border-[#fb5770] text-white bg-[#fb5770] hover:text-white px-4 rounded-lg py-2 focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent style={{ borderRadius: '8px' }} className="max-w-sm p-6 bg-white shadow-xl">
                                        <DialogHeader className="text-center">
                                            <TbAlertTriangleFilled className="w-12 h-12 mx-auto text-red-500" />
                                            <DialogTitle className="text-xl font-semibold text-center text-gray-800">
                                                Are you absolutely sure?
                                            </DialogTitle>
                                            <DialogDescription className="text-gray-600">
                                                This action cannot be undone. This will permanently delete order and remove order data from our orders.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <DialogFooter className="flex justify-center gap-4">
                                            <DialogClose asChild>
                                                <button
                                                    style={{
                                                        borderRadius: "8px",
                                                    }}
                                                    className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-4 rounded-lg py-2 focus:outline-none"
                                                >
                                                    Cancel
                                                </button>
                                            </DialogClose>
                                            <button
                                                onClick={handleDelete}
                                                style={{
                                                    borderRadius: "8px",
                                                }}
                                                className="text-sm font-medium border border-[#fb5770] text-white bg-[#fb5770] hover:text-white px-4 rounded-lg py-2 focus:outline-none"
                                            >
                                                Delete
                                            </button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>




                        </TableRow>
                    </TableBody>
                ))}
            </Table>
            <ProductPagination totalPage={getOrders?.meta?.totalPage || 1} />
        </div>
    );
};

export default AllOrders;