import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Utensils, Car, Heart } from "lucide-react"

import BudgetList from "./BudgetList"

const budgets = [
  {
    name: "Ăn uống",
    spent: 450,
    total: 500,
    icon: <Utensils className="size-4" />,
    color: "bg-emerald-500",
  },
  {
    name: "Di chuyển",
    spent: 300,
    total: 400,
    icon: <Car className="size-4" />,
    color: "bg-emerald-500",
  },
  {
    name: "Giải trí",
    spent: 200,
    total: 300,
    icon: <Heart className="size-4" />,
    color: "bg-emerald-500",
  },
]

const BudgetProgress = () => {
  return (
    <Card className="py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">

      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">

        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Tiến độ ngân sách
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Chi tiêu của bạn so với ngân sách hàng tháng
          </p>
        </div>

        <button
          title="Xem chi tiết"
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Eye size={24} />
        </button>

      </CardHeader>

      <CardContent>
        <BudgetList budgets={budgets} />
      </CardContent>

    </Card>
  )
}

export default BudgetProgress