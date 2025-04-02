import ViewOrders from "../user/orderManagement/ViewOrders";
import { useGetOrdersQuery } from "@/redux/features/order/orderManagementApi";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/types";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import Loading from "@/components/loading/Loading";
import { FaCheckCircle } from "react-icons/fa";

export type TOrder = {
    _id: string;
    createdAt: string;
    email: string;
    totalPrice: number;
    transaction: {
        id: string,
        transactionStatus: string
    };
    status: string;
    products: Product[];
};

type Product = {
    product: any;
    quantity: number;
};

const OrderVerify = () => {

    const token = useAppSelector(selectCurrentToken);
    let user: TUser | null = null;
    if (token) {
        user = verifyToken(token) as TUser;
    }

    const { data: getOrders, isLoading: addedCartLoading } = useGetOrdersQuery(
        (user as TUser)?.email
    );
    if (addedCartLoading) {
        return <Loading />
    }

    const { email, totalPrice, transaction, status, products, createdAt } = getOrders?.data?.[0] as TOrder;
    const createdDate = new Date(createdAt);

    const day = String(createdDate.getDate()).padStart(2, '0');
    const month = String(createdDate.getMonth() + 1).padStart(2, '0');
    const year = createdDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;


    return (
        <div className="mx-4">
            <div className="flex justify-center">
                <FaCheckCircle className="w-16 h-16 mt-16 text-green-500 animate-bounce" />
            </div>
            <h2 className="font-bold sectionTitle"><span className="primaryColor">Payment</span> Successful</h2>

            <div style={{ borderRadius: '8px' }} className="md:flex justify-between gap-10 space-y-2 text-left md:max-w-[600px] md:mx-auto shadow-xl p-6 bg-[#fb5770] text-sm w-full">
                <div className="space-y-2">
                    <p className="text-white"><strong>Email:</strong> {email}</p>
                    <p className="text-white"><strong>Total Products:</strong> {products?.length}</p>
                    <p className="text-white"><strong>Total Price:</strong> {totalPrice}tk</p>
                    <p className="text-white"><strong>Date:</strong>{formattedDate} </p>
                </div>
                <div className="space-y-2">
                    <p className="text-white"><strong>Status:</strong> {status}</p>
                    <p className="text-white"><strong>Transaction ID:</strong> {transaction?.id}</p>
                    <p className="text-white"><strong>Transaction Status:</strong> {transaction?.transactionStatus}</p>
                </div>
            </div>

            <div className="mt-8">
                <ViewOrders />
            </div>
            <div className="flex items-center justify-center my-8">
                <button
                    style={{
                        borderRadius: "8px",
                    }}
                    onClick={() => window.location.href = "/"}
                    className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-8 rounded-lg h-11 focus:outline-none"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderVerify;