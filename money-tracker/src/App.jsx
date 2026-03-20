import {Routes, Route} from "react-router";
import CategoryPage from "@/features/categories/pages/CategoryPage.jsx";
import LoginPage from "@/features/auth/pages/LoginPage.jsx";
import RegisterPage from "@/features/auth/pages/RegisterPage.jsx";
import ProfilePage from "@/features/profile/pages/ProfilePage.jsx";
import DashboardPage from "@/features/dashboard/pages/DashboardPage.jsx";
import BudgetPage from "@/features/budgets/pages/BudgetPage.jsx";
import TransactionPage from "@/features/transactions/pages/TransactionPage.jsx";
import GoalPage from "./features/goals/pages/GoalPage";
import SettingPage from "./features/settings/pages/SettingPage.jsx";
import {ThemeProvider} from "@/contexts/ThemeContext.jsx";
import {Toaster} from "@/components/ui/sonner"
import PublicRoute from "@/routes/PublicRoute.jsx";
import ProtectedRoute from "@/routes/ProtectedRoute.jsx";
import MainLayout from "@/components/layout/MainLayout.jsx";

function App() {
    return (
        <ThemeProvider>
            <Routes>
                {/* Nhóm trang PUBLIC (không có Sidebar) */}
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Route>
                {/* Nhóm trang PROTECTED (Sidebar) */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route index element={<DashboardPage/>}/>
                        <Route path="/categories" element={<CategoryPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/goals" element={<GoalPage/>}/>
                        <Route path="/settings" element={<SettingPage/>}/>
                        <Route path="/budgets" element={<BudgetPage/>}/>
                        <Route path="/transactions" element={<TransactionPage/>}/>
                    </Route>
                </Route>
            </Routes>
            <Toaster/>
        </ThemeProvider>
)
    ;
}

export default App;
