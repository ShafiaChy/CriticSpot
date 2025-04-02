import Loading from "@/components/loading/Loading";
import { useGetAllProductsQuery } from "@/redux/features/product/productManagementApi";
import { useGetAllUserQuery } from "@/redux/features/user/userManagementApi";
import { DashboardBarChart } from "./BarChart";
import { useGetOrdersQuery } from "@/redux/features/order/orderManagementApi";
import { DashboardPieChart } from "./PieChart";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryManagementApi";

const AdminDashboard = () => {
    // Fetching the data for products and users
    const { data: stationeryProducts, isLoading: isLoadingProducts } = useGetAllProductsQuery(undefined);
    const { data: userData, isLoading: isLoadingUsers } = useGetAllUserQuery({});
    const { data: orders } = useGetOrdersQuery({})
    const { data: categories } = useGetAllCategoryQuery(undefined)

    // Filtering users by role
    const users = userData?.data?.filter((user) => user.role === "user");
    const admins = userData?.data?.filter((user) => user.role === "admin");
    const orderPending = orders?.data?.filter((item: any) => item?.status === "Pending")
    const orderShipping = orders?.data?.filter((item: any) => item?.status === "Shipping")
    // Loading state for the page
    if (isLoadingProducts || isLoadingUsers) {
        return <Loading />;
    }

    const barChartData = [
        { browser: "products", history: stationeryProducts?.data?.length, fill: "#2eb88a" },
        { browser: "users", history: userData?.data?.length, fill: "#e23670" },
        { browser: "user", history: users?.length, fill: "#e88c30" },
        { browser: "admin", history: admins?.length, fill: "#af57db" },
    ];
    const pieChartData = [
        { browser: "orders", history: orders?.data?.length, fill: "#e23670" },
        { browser: "pending", history: orderPending?.length, fill: "#2eb88a" },
        { browser: "shipping", history: orderShipping?.length, fill: "#e88c30" }
    ];


    return (
        <div >
            <div>
                <h2 className="dashboardTitle"><span className="primaryColor">Admin </span> Dashboard
                </h2>
                <p className="dashboardSubtitle">Effortlessly manage your products, users, and other essential data in the admin panel.</p>
            </div>

            {/* Gradient Cards for User Count, Admin Count, and Product Count */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* New Gradient Card for User Data */}
                <div className="p-6 bg-[#e23670] shadow-lg rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-white rounded-full shadow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#4d90e0]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                />
                            </svg>
                        </div>
                        <span className="text-3xl font-bold text-white">{userData?.data?.length}+</span>
                    </div>
                    <p className="text-lg font-bold text-white">All Users Data</p>
                </div>

                {/* Total Users Card */}
                <div className="p-6 bg-[#e88c30] shadow-lg rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-white rounded-full shadow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#fb5770]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.121 17.804A4 4 0 117.804 5.12l6.364 6.364a4 4 0 11-2.683 2.683l-6.364 6.364z"
                                />
                            </svg>
                        </div>
                        <span className="text-3xl font-bold text-white">{users?.length}+</span>
                    </div>
                    <p className="text-lg font-bold text-white">Total Users</p>
                </div>

                {/* Admins Card */}
                <div className="p-6 bg-[#af57db] shadow-lg rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-white rounded-full shadow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#7cc000]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 16l-4-4m0 0l4-4m-4 4h16m-8 4h8m0 0l-4 4m4-4l-4-4"
                                />
                            </svg>
                        </div>
                        <span className="text-3xl font-bold text-white">{admins?.length}+</span>
                    </div>
                    <p className="text-lg font-bold text-white">Admins</p>
                </div>

                {/* Total Products Card */}
                <div className="p-6 shadow-lg bg-[#2eb88a] rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-white rounded-full shadow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#00c3e2]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 3l4 4h10M5 3v12h12V3H5zm4 14v4h8v-4"
                                />
                            </svg>
                        </div>
                        <span className="text-3xl font-bold text-white">{stationeryProducts?.data?.length}+</span>
                    </div>
                    <p className="text-lg font-bold text-white">Total Products</p>
                </div>
                {/* Total Orders Card */}
                <div className="p-6 shadow-lg bg-[#e21d48] rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-white rounded-full shadow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#00c3e2]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 3l4 4h10M5 3v12h12V3H5zm4 14v4h8v-4"
                                />
                            </svg>
                        </div>
                        <span className="text-3xl font-bold text-white">{categories?.data?.length}+</span>
                    </div>
                    <p className="text-lg font-bold text-white">Total Category</p>
                </div>
                {/* Total Orders Card */}
                <div className="p-6 shadow-lg bg-[#2563eb] rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-white rounded-full shadow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#00c3e2]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 3l4 4h10M5 3v12h12V3H5zm4 14v4h8v-4"
                                />
                            </svg>
                        </div>
                        <span className="text-3xl font-bold text-white">{orders?.data?.length}+</span>
                    </div>
                    <p className="text-lg font-bold text-white">Total Order</p>
                </div>


            </div>
            <div className="flex flex-col-reverse gap-5 space-y-8 md:flex-row md:space-y-0 md:mt-8">
                <div className="space-y-8 md:w-2/3 md:flex gap-7 md:space-y-0">
                    <DashboardBarChart chartData={barChartData} />
                    <DashboardPieChart chartData={pieChartData} />
                </div>
                <div className="flex justify-between gap-8 md:block md:flex-1">
                    {/* Total Shipping Card */}
                    <div className="p-6 shadow-lg bg-[#2563eb] rounded-xl flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 bg-white rounded-full shadow">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[#00c3e2]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 3l4 4h10M5 3v12h12V3H5zm4 14v4h8v-4"
                                    />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-white">{orderPending?.length}+</span>
                        </div>
                        <p className="text-lg font-bold text-white">Order Pending</p>
                    </div>
                    {/* Total Orders Card */}
                    <div className="p-6 shadow-lg bg-[#2563eb] rounded-xl flex-1 md:mt-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 bg-white rounded-full shadow">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[#00c3e2]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 3l4 4h10M5 3v12h12V3H5zm4 14v4h8v-4"
                                    />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-white">{orderShipping?.length}+</span>
                        </div>
                        <p className="text-lg font-bold text-white">Order Shipping</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
