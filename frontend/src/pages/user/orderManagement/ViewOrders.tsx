import Loading from "@/components/loading/Loading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetOrdersQuery } from "@/redux/features/order/orderManagementApi";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { Link } from "react-router-dom";

const ViewOrders = () => {
    const token = useAppSelector(selectCurrentToken);
    let user: TUser | null = null;
    if (token) {
        user = verifyToken(token) as TUser;
    }

    const { data: getOrders, isLoading: addedCartLoading } = useGetOrdersQuery(
        (user as TUser)?.email
    );
    console.log(getOrders?.data?.[0]?.products);
    if (addedCartLoading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className="dashboardTitle">My<span className="primaryColor"> Order </span> Product</h2>
            {
                getOrders?.data?.[0]?.products?.length > 0 ? <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    {getOrders?.data?.[0]?.products?.map((product: any) => (
                        <TableBody key={product?.product?._id}>
                            <TableRow>
                                <TableCell >
                                    <img style={{ borderRadius: '8px' }} className="w-[40px] h-[40px] object-cover" src={product?.product?.image} alt="" />
                                </TableCell>
                                <TableCell>{product?.product?.name}</TableCell>
                                <TableCell>{product?.product?.brand}</TableCell>
                                <TableCell>{product?.quantity}</TableCell>
                                <TableCell>{product?.product?.price}tk</TableCell>
                                <TableCell className="w-[120px] mx-auto">
                                    <span
                                        className={`text-sm font-semibold flex items-center justify-center gap-2 p-1 rounded-full 
                                    ${getOrders?.data?.[0].status === "Shipping"
                                                ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                                                : getOrders?.data?.[0].status === "Pending"
                                                    ? "bg-gradient-to-r from-[#fb5770] to-[#ff7e91] text-white"
                                                    : "bg-gray-500 text-white"
                                            }`}
                                        style={{
                                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                            transition: "all 0.3s ease-in-out",
                                        }}
                                    >
                                        <img
                                            className="w-[30px] md:block hidden"
                                            src={
                                                getOrders?.data?.[0].status === "Shipping"
                                                    ? "https://cdn-icons-png.flaticon.com/512/5952/5952766.png"
                                                    : getOrders?.data?.[0].status === "Pending"
                                                        ? "https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/clock-color-icon.png"
                                                        : ""
                                            }
                                            alt=""
                                        />
                                        <span>
                                            {getOrders?.data?.[0].status}
                                        </span>
                                    </span>

                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table> : <div className="mt-10 mb-10 text-center">
                    <div className="flex items-center justify-center">
                        <img className="h-[200px]" src="https://www.rokomari.com/static/200/images/icon_empty_cart.png" alt="Empty Cart" />
                    </div>
                    <h2 className="mt-5 text-3xl font-semibold">Your order is Empty!</h2>
                    <p className="mt-3 text-lg">There’s nothing in your order yet. Browse our categories and find your favorites.</p>
                    <Link to="/">
                        <button className="mt-3 text-xl font-bold text-[#fb5770]">Start shopping now and enjoy amazing deals.</button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default ViewOrders;