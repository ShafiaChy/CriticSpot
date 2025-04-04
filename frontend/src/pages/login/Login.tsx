
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type LoginFormInputs = {
    email: string;
    password: string;
};

const Login = () => {
    const dispatch = useAppDispatch()
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const form = useForm<LoginFormInputs>();

    const {
        register,
        handleSubmit,
        formState: { errors },
       
    } = form;

    const from = location.state?.from?.pathname || "/";

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Logging in');

        try {
            const userInfo = {
                email: data?.email,
                password: data?.password
            }
            const res = await login(userInfo).unwrap();
            const user = verifyToken(res?.data?.accessToken) as TUser;

            dispatch(setUser({
                user: user,
                token: res?.data?.accessToken
            }))
            toast.success('Logged in', { id: toastId });
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong', { id: toastId });

        }
    };

   

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-[#fb5770] mb-6">
                    Login Now
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        Login
                    </button>

                </form>
                <p className="mt-2 text-sm text-end">Don't have an account? <Link className="font-medium text-[#e14b63] underline" to='/signUp'>Sign Up</Link></p>
                {/* <div className="flex justify-between gap-6 my-4">
                    <button
                        onClick={handleAdminLogin}
                        type="submit"
                        className="w-full bg-[#fb5770] text-white font-medium py-2 rounded-lg hover:bg-[#e14b63] focus:outline-none"
                    >
                        As a Admin
                    </button>
                    <button
                        onClick={handleUserLogin}
                        type="submit"
                        className="w-full bg-[#fb5770] text-white font-medium py-2 rounded-lg hover:bg-[#e14b63] focus:outline-none"
                    >
                        As a User
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
