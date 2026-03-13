import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Car, Heart, Eye } from "lucide-react"

import GoalList from "./GoalList"

const goals = [
  {
    name: "Nhà ở",
    targetDate: "30/12/2023",
    spent: 850,
    total: 1000,
    daysLeft: 2,
    icon: <Home className="size-5" />,
  },
  {
    name: "Di chuyển",
    targetDate: "30/12/2023",
    spent: 300,
    total: 1000,
    daysLeft: 2,
    icon: <Car className="size-5" />,
  },
  {
    name: "Giải trí",
    targetDate: "30/12/2023",
    spent: 600,
    total: 1000,
    daysLeft: 2,
    icon: <Heart className="size-5" />,
  },
]

const GoalProgress = () => {
  return (
    <Card className="py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">

      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">

        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Tiến độ mục tiêu
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
        <GoalList goals={goals} />
      </CardContent>

    </Card>
  )
}

export default GoalProgress