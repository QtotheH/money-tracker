import BalanceCardList from "@/features/dashboard/components/BalanceCardList.jsx";
import FinancialOverviewChart from "@/features/dashboard/components/FinancialOverviewChart.jsx";
import ExpenseCategoryChart from "@/features/dashboard/components/ExpenseCategoryChart.jsx";
import RecentTransactions from "@/features/dashboard/components/RecentTransactions.jsx";
import BudgetProgress from "@/features/dashboard/components/BudgetProgress.jsx";
import GoalProgress from "@/features/dashboard/components/GoalProgress.jsx";
import {Button} from "@/components/ui/button"
import {Plus} from "lucide-react"

const DashboardPage = () => {
    return (
        <main
            className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col space-y-6 sm:space-y-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
                                Bảng điều khiển tài chính
                            </h1>

                            <p className="text-muted-foreground text-sm sm:text-base mt-1">
                                Quản lý tài chính và theo dõi chi tiêu của bạn
                            </p>
                        </div>

                        <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 dark:text-white">
                            <Plus className="mr-2 h-4 w-4"/>
                            Thêm giao dịch
                        </Button>

                    </div>

                    <BalanceCardList/>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                        <div className="md:col-span-1 lg:col-span-7">
                            <FinancialOverviewChart/>
                        </div>
                        <div className="md:col-span-1 lg:col-span-5">
                            <ExpenseCategoryChart/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-max lg:auto-rows-auto">
                        <div className="md:col-span-2 lg:col-span-7">
                            <RecentTransactions/>
                        </div>
                        <div className="md:col-span-2 lg:col-span-5 space-y-5">
                            <div>
                                <BudgetProgress/>
                            </div>
                            <div>
                                <GoalProgress/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default DashboardPage