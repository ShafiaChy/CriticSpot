import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
    children: ReactNode;
    role?: string | undefined
}

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const token = useAppSelector(selectCurrentToken)
    const dispatch = useAppDispatch();
    let user ;
    if(token){
        user = verifyToken(token)
    }
    if(role !== undefined && role !== (user as TUser )?.role){
         dispatch(logout())
        return <Navigate to={'/login'} replace={true}></Navigate>
    }
    if (!token) {
        return <Navigate to={'/login'} replace={true}></Navigate>
    }
    return children;
}

export default ProtectedRoute;