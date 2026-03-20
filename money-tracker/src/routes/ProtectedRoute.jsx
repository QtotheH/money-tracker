import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/store/slices/authSlice.js";
import {Navigate, Outlet} from "react-router";

const ProtectedRoute = () => {
    const user = useSelector(selectCurrentUser);
    // Nếu người dùng đã đăng nhập -> Render các component chức năng (<Outlet />)
    // Nếu người dùng chưa đăng nhập -> chuyển hướng đến trang Login
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;