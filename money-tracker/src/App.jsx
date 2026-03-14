import { Routes, Route } from "react-router";
import CategoryPage from "@/features/categories/pages/CategoryPage.jsx";
import LoginPage from "@/features/auth/pages/LoginPage.jsx";
import RegisterPage from "@/features/auth/pages/RegisterPage.jsx";
import ProfilePage from "@/features/profile/pages/ProfilePage.jsx";
import DashboardPage from "@/features/dashboard/pages/DashboardPage.jsx";
import BudgetPage from "@/features/budgets/pages/BudgetPage.jsx";
import TransactionPage from "@/features/transactions/pages/TransactionPage.jsx";
import Sidebar from "@/components/layout/Sidebar.jsx";
import GoalPage from "./features/goals/pages/GoalPage";
import SettingPage from "./features/settings/pages/SettingPage.jsx";
function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="hidden fixed md:block w-64 border-r" />
      <div className="flex-1 overflow-auto ml-64">
        <Routes>
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/goals" element={<GoalPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/budgets" element={<BudgetPage/>}/>
          <Route path="/transactions" element={<TransactionPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
