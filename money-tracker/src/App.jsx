import { Routes, Route } from "react-router";
import CategoryPage from "@/features/categories/pages/CategoryPage.jsx";
import LoginPage from "@/features/auth/pages/LoginPage.jsx";
import RegisterPage from "@/features/auth/pages/RegisterPage.jsx";
import ProfilePage from "@/features/profile/pages/ProfilePage.jsx";
import DashboardPage from "@/features/dashboard/pages/DashboardPage.jsx";
import BudgetPage from "@/features/budgets/pages/BudgetPage.jsx";
import TransactionPage from "@/features/transactions/pages/TransactionPage.jsx";
import Sidebar from "@/components/layout/Sidebar.jsx";
import TopBar from "@/components/layout/TopBar.jsx";
import GoalPage from "./features/goals/pages/GoalPage";
import SettingPage from "./features/settings/pages/SettingPage.jsx";
import {useState} from "react";
import { ThemeProvider } from "@/contexts/ThemeContext.jsx";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <ThemeProvider>
            <div className="flex min-h-screen">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

                <Sidebar 
                  className="w-72 border-r"
                  onCloseSidebar={setIsSidebarOpen}
                  isOpen={isSidebarOpen}
                />

                {/* Main Content */}
                <div className="flex-1 overflow-auto transition-all ease-out duration-200 pt-16 md:pt-0">
                    <Routes>
                        <Route path="/categories" element={<CategoryPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/dashboard" element={<DashboardPage/>}/>
                        <Route path="/goals" element={<GoalPage/>}/>
                        <Route path="/settings" element={<SettingPage/>}/>
                        <Route path="/budgets" element={<BudgetPage/>}/>
                        <Route path="/transactions" element={<TransactionPage/>}/>
                    </Routes>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
