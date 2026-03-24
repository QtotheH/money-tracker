import {useEffect, useState} from "react";
import TopBar from "@/components/layout/TopBar.jsx";
import Sidebar from "@/components/layout/Sidebar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Menu} from "lucide-react";
import {Outlet} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, getCategoriesStatus} from "@/store/slices/categorySlice.js";
import {fetchBudgets, getBudgetsStatus} from "@/store/slices/budgetSlice.js";
import {fetchAllTransactions, getTransactionsStatus} from "@/store/slices/transactionSlice.js";
import {fetchGoals, getGoalsStatus} from "@/store/slices/goalSlice.js";
const MainLayout = () => {
    const dispatch = useDispatch();

    const categoryStatus = useSelector(getCategoriesStatus);
    const budgetStatus = useSelector(getBudgetsStatus);
    const transactionStatus = useSelector(getTransactionsStatus);
    const goalStatus = useSelector(getGoalsStatus);

    // Không gọi fetch riêng lẻ ở từng component con (vì có thể bị dispatch 1 action nhiều lần) -> gom nhóm và chạy song song
    useEffect(() => {
        // Hàm gom nhóm và chạy song song tất cả API
        const fetchInitialData = async () => {
            const promises = [];

            // Kiểm tra: Cái nào đang 'idle' thì mới nhét vào mảng để gọi
            if (categoryStatus === "idle") promises.push(dispatch(fetchCategories()));
            if (transactionStatus === "idle") promises.push(dispatch(fetchAllTransactions()));
            if (budgetStatus === "idle") promises.push(dispatch(fetchBudgets()));
            if (goalStatus === "idle") promises.push(dispatch(fetchGoals()));

            // Nếu có API cần gọi, dùng Promise.all để bắt chúng chạy SONG SONG cùng 1 lúc
            if (promises.length > 0) {
                await Promise.all(promises);
            }
        };

        fetchInitialData();
    }, [categoryStatus, budgetStatus, transactionStatus, goalStatus, dispatch]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   
    useEffect(() => {
        if(categoryStatus === "idle") {
            dispatch(fetchCategories);
        }
    }, [categoryStatus, dispatch]);
    const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
    return (
        <div className="flex h-screen overflow-hidden">
            <TopBar onMenuClick={() => setIsSidebarOpen(true)}/>
            <Sidebar
                className="w-72 border-r"
                onCloseSidebar={(value) => {
                    setIsSidebarOpen(value);
                    setIsDesktopSidebarOpen(value);
                }}
                isOpen={isDesktopSidebarOpen}
                isMobileOpen={isSidebarOpen}
            />

            {/* Main Content */}
            <div className="flex-1 overflow-auto transition-all ease-out duration-200 pt-16 md:pt-0 relative">
                {!isDesktopSidebarOpen && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsDesktopSidebarOpen(true)}
                        className="hidden md:flex fixed top-4 left-4 z-30"
                    >
                        <Menu className="h-5 w-5"/>
                    </Button>
                )}
                {/* Các component con (Dashboard, Transactions, ...) sẽ render trong Outlet */}
                <Outlet />
            </div>
        </div>
    );
}
export default MainLayout
