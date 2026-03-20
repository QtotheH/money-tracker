import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/store/slices/authSlice.js";
import {Navigate, Outlet} from "react-router";

const PublicRoute = () => {
    // Lấy thông tin user từ localStorage
    const user = useSelector(selectCurrentUser);
    // Nếu có thông tin user (đã đăng nhập) ->  chuyển hướng đến trang Dashboard
    // Nếu chưa có thông tin user (chưa đăng nhập) -> render các component Login / Register
    return user ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;