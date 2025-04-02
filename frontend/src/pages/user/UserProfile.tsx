import Loading from "@/components/loading/Loading";
import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/features/user/userManagementApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TLoginUser, TResponse, TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useState } from "react";

const UserProfile = () => {
    let user: TUser | null = null;
    const token = useAppSelector(selectCurrentToken);
    if (token) {
        user = verifyToken(token) as TUser;
    }
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [updateUser] = useUpdateUserMutation();
    const { data: users, isLoading } = useGetAllUserQuery(user?.email)
    const [open, setOpen] = useState(false);
    const [updateUserId, setUpdateUserID] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLoginUser>();



    const handleUpdate = (userId : any) => {
        setUpdateUserID(userId)
        setOpen(true);
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const userInfo = {
                ...data
            }
            const res = (await updateUser({
                id: updateUserId,
                data: userInfo
            })) as TResponse<any>
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                setOpen(false);
            } else if (res?.error) {
                toast.error('Something went wrong. Please try again!');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="max-w-md p-8 mx-auto mt-12 bg-white rounded-lg shadow-lg">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-semibold text-gray-800">User Profile</h1>
                <p className="text-gray-500">View and manage your profile details</p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <img
                        src={users?.data?.[0]?.photoUrl}
                        alt="User"
                        className="w-16 h-16 border rounded-full"
                    />
                    <div className="space-y-2">
                        <h2 className="text-xl font-medium text-gray-800">{users?.data?.[0]?.name}</h2>
                        <p className="text-sm text-gray-500">{users?.data?.[0]?.email}</p>
                    </div>
                </div>

                <div className="flex justify-center space-x-4">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <button
                                style={{
                                    borderRadius: "8px",
                                }}
                                onClick={() => handleUpdate(users?.data?.[0]?._id)}
                                className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-4 rounded-lg h-11 focus:outline-none"
                            >
                                Edit Profile
                            </button>
                        </DialogTrigger>
                        <DialogContent style={{ borderRadius: '8px' }} className="max-w-sm p-6 bg-white shadow-xl">
                            <DialogHeader className="text-center">
                                <DialogTitle className="text-xl font-semibold text-center text-gray-800">
                                    Are you sure?
                                </DialogTitle>
                                <DialogDescription className="text-center text-gray-600">
                                    Update your profile
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                {/* Name Field */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="name"
                                        defaultValue={users?.data?.[0]?.name}
                                        placeholder="Enter your name"
                                        {...register("name", {
                                            required: "Name is required",
                                        })}
                                        className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                                            } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                {/* PhotoURL Field */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="photoUrl"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Photo URL
                                    </label>
                                    <input
                                        id="photoUrl"
                                        type="text"
                                        defaultValue={users?.data?.[0]?.photoUrl}
                                        placeholder="Enter photo url"
                                        {...register("photoUrl")}
                                        className={`w-full px-4 py-2 border ${errors.photoUrl ? "border-red-500" : "border-gray-300"
                                            } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                                    />
                                    {errors.photoUrl && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.photoUrl.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-between gap-4">
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
                                        type="submit"
                                        style={{ borderRadius: "8px" }}
                                        className="bg-[#fb5770] text-white font-medium py-2 rounded-lg hover:bg-[#e14b63] focus:outline-none px-4"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <button
                        onClick={handleLogout}
                        style={{ borderRadius: "8px" }}
                        className="text-sm font-medium bg-[#fb5770] text-white hover:bg-[#e44d63] px-8 rounded-lg h-11 focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
