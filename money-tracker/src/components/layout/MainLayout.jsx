import {useEffect, useState} from "react";
import TopBar from "@/components/layout/TopBar.jsx";
import Sidebar from "@/components/layout/Sidebar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Menu} from "lucide-react";
import {Outlet} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, getCategoriesStatus} from "@/store/slices/categorySlice.js";

// TODO: CHỈNH SỬA LỖI 1 ACTION TYPE BỊ DISPATCH NHIỀU LẦN BỞI CÁC COMPONENT CON -> GOM CHUNG LẠI DISPATCH Ở COMPONENT CHA

const MainLayout = () => {
    const dispatch = useDispatch();
    const categoryStatus = useSelector(getCategoriesStatus);

    useEffect(() => {
        if(categoryStatus === "idle") {
            dispatch(fetchCategories());
        }
    }, [categoryStatus, dispatch]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
