import { logout } from "@/redux/features/auth/authSlice";
import { useCreateUserMutation } from "@/redux/features/user/userManagementApi";
import { useAppDispatch } from "@/redux/hook";
import { TLoginUser } from "@/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import imageOne from '../../assets/images/homeOne.jpg'

const SignUp = () => {
    const dispatch = useAppDispatch()
    const [createUser] = useCreateUserMutation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLoginUser>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Sign Up..');
        console.log(data);

        try {
            const userInfo = {
                name: data?.name,
                photoUrl: data?.photoUrl || imageOne,
                email: data?.email,
                password: data?.password
              }
            const res = await createUser(userInfo)
            if(res?.data?.success){
                toast.success('Signed Up', { id: toastId});
                dispatch(logout())
                navigate('/login')
            }else if(res?.error){
                toast.error('Something went wrong. Please try again!', { id: toastId});
            }
            // navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong', { id: toastId});

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-[#fb5770] mb-6">
                     Please Sing Up
                </h2>
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
                 
                    {/* Email Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="text"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-[#fb5770] focus:outline-none`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#fb5770] text-white font-medium py-2 rounded-lg hover:bg-[#e14b63] focus:outline-none"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-2 text-sm text-end">Have an account <Link className="font-medium text-[#e14b63] underline"  to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default SignUp;
