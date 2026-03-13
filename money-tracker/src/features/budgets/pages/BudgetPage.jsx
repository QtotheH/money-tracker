
import { useState } from "react"
import { Plus, Utensils, Car, Heart, Home, ShoppingCart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BudgetList from "@/features/budgets/components/BudgetList"
import AddBudgetDialog from "@/features/budgets/components/AddBudgetDialog"

const budgetCategoryMeta = {
  housing: { label: "Nhà ở", icon: <Home size={16} />, color: "bg-orange-500" },
  food: { label: "Ăn uống", icon: <Utensils size={16} />, color: "bg-emerald-500" },
  transportation: { label: "Di chuyển", icon: <Car size={16} />, color: "bg-blue-500" },
  entertainment: { label: "Giải trí", icon: <Heart size={16} />, color: "bg-pink-500" },
  utilities: { label: "Tiện ích", icon: <Zap size={16} />, color: "bg-yellow-500" },
  shopping: { label: "Mua sắm", icon: <ShoppingCart size={16} />, color: "bg-purple-500" },
  other: { label: "Khác", icon: <ShoppingCart size={16} />, color: "bg-slate-500" },
}

const initialBudgets = [
  { name: "Nhà ở",      spent: 850000,  total: 2000000, icon: <Home size={16} />,          color: "bg-orange-500" },
  { name: "Ăn uống",    spent: 450000,  total: 1500000, icon: <Utensils size={16} />,      color: "bg-emerald-500" },
  { name: "Di chuyển",  spent: 300000,  total: 800000,  icon: <Car size={16} />,           color: "bg-blue-500" },
  { name: "Giải trí",   spent: 200000,  total: 500000,  icon: <Heart size={16} />,         color: "bg-pink-500" },
  { name: "Tiện ích",   spent: 180000,  total: 400000,  icon: <Zap size={16} />,           color: "bg-yellow-500" },
  { name: "Mua sắm",    spent: 620000,  total: 1000000, icon: <ShoppingCart size={16} />,  color: "bg-purple-500" },
]

const BudgetPage = () => {
  const [budgets, setBudgets] = useState(initialBudgets)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAdd = ({ category, categoryLabel, amount }) => {
    const categoryMeta = budgetCategoryMeta[category] ?? budgetCategoryMeta.other
    const budgetName = categoryLabel ?? categoryMeta.label

    if (budgets.some((budget) => budget.name.toLowerCase() === budgetName.toLowerCase())) {
      return
    }

    setBudgets((prev) => [
      ...prev,
      {
        name: budgetName,
        spent: 0,
        total: amount,
        icon: categoryMeta.icon,
        color: categoryMeta.color,
      },
    ])
  }

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
            <BudgetList budgets={budgets} />
          </CardContent>
        </Card>

      </div>

      <AddBudgetDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAdd}
        existingCategories={budgets.map((budget) => budget.name)}
      />
    </main>
  )
}

export default BudgetPage