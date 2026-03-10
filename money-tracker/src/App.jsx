import {Routes, Route} from "react-router";
import CategoryPage from "@/features/categories/pages/CategoryPage.jsx";
import LoginPage from "@/features/auth/pages/LoginPage.jsx";
import RegisterPage from "@/features/auth/pages/RegisterPage.jsx";
import ProfilePage from "@/features/profile/pages/ProfilePage.jsx";
import DashboardPage from "@/features/dashboard/pages/DashboardPage.jsx";
import Sidebar from "@/components/layout/Sidebar.jsx";


function App() {

    return (
        <div className="flex min-h-screen">
            <Sidebar className="hidden md:block w-64 border-r"/>
            <div className="flex-1 overflow-auto">
                <Routes>
                    <Route path="/categories" element={<CategoryPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/dashboard" element={<DashboardPage/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
