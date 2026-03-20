
import {useState} from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BudgetList from "@/features/budgets/components/BudgetList"
import AddBudgetDialog from "@/features/budgets/components/AddBudgetDialog"
import {useBudgetsData} from "@/hooks/useBudgetData.js";
import Loading from "@/components/common/Loading.jsx";

const BudgetPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // GỌI CUSTOM HOOK
  const { budgetsWithCategory, categories, isLoading } = useBudgetsData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Tiêu đề + nút thêm */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
              Ngân sách
            </h1>
            <p className="text-muted-foreground">
              Thiết lập và theo dõi giới hạn chi tiêu hàng tháng của bạn
            </p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm ngân sách
          </Button>
        </div>

        {/* Danh sách ngân sách */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Ngân sách hàng tháng</CardTitle>
            <CardDescription>Theo dõi chi tiêu theo từng danh mục</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <Loading />
            ) : (
                <BudgetList budgets={budgetsWithCategory} />
            )}
          </CardContent>
        </Card>

      </div>

      <AddBudgetDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        categories={categories}
        existingCategoryIds={budgetsWithCategory.map((budget) => budget.categoryId)}
      />
    </main>
  )
}

export default BudgetPage