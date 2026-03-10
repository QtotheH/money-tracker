import BalanceCards from "../components/BalanceCards"
import FinancialOverviewChart from "../components/FinancialOverviewChart"
import ExpenseCategoryChart from "../components/ExpenseCategoryChart"
import RecentTransactions from "../components/RecentTransactions"
import BudgetProgress from "../components/BudgetProgress"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const DashboardPage = () => {
  return (
     <main
        className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="p-6 space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
                        Bảng điều khiển tài chính
                    </h1>

                    <p className="text-muted-foreground text-base">
                        Quản lý tài chính và theo dõi chi tiêu của bạn
                    </p>
                </div>

                <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4"/>
                Thêm giao dịch
                </Button>

            </div>

            <BalanceCards/>

            <div className="grid lg:grid-cols-12 gap-6">

                <div className="lg:col-span-7">
                    <FinancialOverviewChart />
                </div>

                <div className="lg:col-span-5">
                    <ExpenseCategoryChart />
                </div>

            </div>

            <div className="grid lg:grid-cols-12 gap-6">

                <div className="lg:col-span-7">  
                    <RecentTransactions/>
                </div>

                <div className="lg:col-span-5">  
                    <BudgetProgress/>
                </div>


            </div>

        </div>
    </main>

  )
}

export default DashboardPage