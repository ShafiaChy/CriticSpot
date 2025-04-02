import { useDeleteUserMutation, useGetAllUserQuery, useUpdateUserRoleMutation } from "@/redux/features/user/userManagementApi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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

import Loading from "@/components/loading/Loading";
import { useState } from "react";
import { toast } from "sonner";
import { FaUser, FaUserShield } from "react-icons/fa";
import ProductPagination from "@/components/Pagination";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
};



const UserData = () => {
    const queryParams = useQueryParams();
    const currentPage = queryParams.get('page') || '1';
    const limit = '12';
    const { data: users, isLoading } = useGetAllUserQuery(
        {
            page: currentPage,
            limit: limit,
        }
    )
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState(null);

    // Handle opening the modal
    const openDeleteModal = (itemId: any) => {
        setDeleteItemId(itemId);
    };
    const openUpdateModal = (itemId: any) => {
        setItemToUpdate(itemId); // Pass the item id to delete
        setIsUpdateModalOpen(true);
    };
    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setItemToUpdate(null);
    };

    // Handle the delete action
    const handleUpdate = async (role: string) => {
        const toastId = toast.loading('Updating..');
        if (itemToUpdate) {
            const userInfo = {
                userId: itemToUpdate,
                role: String(role)
            }
            const res = await updateUserRole({
                id: itemToUpdate,
                data: userInfo
            })
            console.log(res);
            if (res?.data?.success) {
                toast.success(res?.data?.message, { id: toastId });
            } else if (res?.error) {
                toast.error('Something went wrong. Please try again!', { id: toastId });
            }
            closeUpdateModal();
        }
    };
    // Handle the delete action
    const handleDelete = async () => {
        const toastId = toast.loading('Deleting..');
        if (deleteItemId) {
            const res = await deleteUser({
                id: deleteItemId
            })
            if (res?.data?.success) {
                toast.success(res?.data?.message, { id: toastId });
            } else if (res?.error) {
                toast.error('Something went wrong. Please try again!', { id: toastId });
            }
        }
    };
    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div>
                <h2 className="dashboardTitle">View and <span className="primaryColor">Manage</span> Users</h2>
                <p className="dashboardSubtitle">Easily access and control all user details from a single dashboard.</p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Role</TableHead>
                        <TableHead>Update Role</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                {users?.data?.map(user => (
                    <TableBody key={user?._id}>
                        <TableRow>
                            <TableCell >
                                <img className="w-[40px] h-[40px] rounded-full object-cover" src={user?.photoUrl} alt="" />
                            </TableCell>
                            <TableCell>{user?.name}</TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell className="w-[180px]">
                                <div className={`flex items-center justify-center space-x-2 ${user?.role === 'admin' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'} rounded-full p-2 mx-4`}>
                                    {user?.role === 'admin' ? (
                                        <FaUserShield className="text-xl" />
                                    ) : (
                                        <FaUser className="text-xl" />
                                    )}
                                    <span>{user?.role}</span>
                                </div>
                            </TableCell>

                            <TableCell>
                                <Dialog>
                                    <DialogTrigger>
                                        <button
                                            style={{
                                                borderRadius: "8px",
                                            }}
                                            onClick={() => openUpdateModal(user?._id)}
                                            className="text-sm font-medium border border-[#fb5770] text-white bg-[#fb5770] hover:text-white px-4 rounded-lg py-2 focus:outline-none"
                                        >
                                            Update
                                        </button>
                                    </DialogTrigger>
                                    {isUpdateModalOpen &&
                                        <DialogContent style={{ borderRadius: '8px' }} className="max-w-sm p-6 bg-white shadow-xl">
                                            <DialogHeader className="text-center">
                                                <DialogTitle className="text-xl font-semibold text-center">Are you sure?</DialogTitle>
                                                <DialogDescription className="text-center text-gray-600">
                                                    update this user role?
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
                                                    onClick={() => handleUpdate('admin')}
                                                    style={{
                                                        borderRadius: "8px",
                                                    }}
                                                    className="text-sm font-medium border border-[#fb5770] text-white bg-[#fb5770] hover:text-white px-4 rounded-lg py-2 focus:outline-none"
                                                >
                                                    As a Admin
                                                </button>
                                                <button
                                                    onClick={() => handleUpdate('user')}
                                                    style={{
                                                        borderRadius: "8px",
                                                    }}
                                                    className="text-sm font-medium border border-[#fb5770] text-white bg-[#fb5770] hover:text-white px-4 rounded-lg py-2 focus:outline-none"
                                                >
                                                    As a User
                                                </button>
                                            </DialogFooter>
                                        </DialogContent>
                                    }
                                </Dialog>
                            </TableCell>


                            <TableCell>
                                <Dialog>
                                    <DialogTrigger>
                                        <button
                                            style={{
                                                borderRadius: "8px",
                                            }}
                                            onClick={() => openDeleteModal(user?._id)}
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
                                                This action cannot be undone. This will permanently delete this user and remove user data from our users.
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

            <ProductPagination totalPage={users?.meta?.totalPage || 1} />
        </div>
    );
};

export default UserData;