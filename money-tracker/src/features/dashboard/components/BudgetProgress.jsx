import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress" // Nếu bạn đã cài đặt shadcn progress
import { Home, Utensils, Car, Heart, Lightbulb } from "lucide-react"

const budgets = [
  {
    name: "Nhà ở",
    spent: 850,
    total: 1000,
    icon: <Home className="size-4" />,
    color: "bg-emerald-500"
  },
  {
    name: "Ăn uống",
    spent: 450,
    total: 500,
    icon: <Utensils className="size-4" />,
    color: "bg-emerald-500"
  },
  {
    name: "Di chuyển",
    spent: 300,
    total: 400,
    icon: <Car className="size-4" />,
    color: "bg-emerald-500"
  },
  {
    name: "Giải trí",
    spent: 200,
    total: 300,
    icon: <Heart className="size-4" />,
    color: "bg-emerald-500"
  },
  {
    name: "Tiện ích",
    spent: 250,
    total: 350,
    icon: <Lightbulb className="size-4" />,
    color: "bg-emerald-500"
  }
]

const BudgetProgress = () => {
  return (
    <Card className="py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Tiến độ ngân sách
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Chi tiêu của bạn so với ngân sách hàng tháng
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {budgets.map((b, i) => {
          const percentage = Math.round((b.spent / b.total) * 100);
          const remaining = b.total - b.spent;

          return (
            <div key={i} className="space-y-2">
              {/* Dòng tiêu đề: Icon + Tên và Số tiền */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                    {b.icon}
                  </div>
                  <span className="font-semibold text-slate-900 text-[16px]">{b.name}</span>
                </div>
                <div className="text-sm font-medium">
                  <span className="text-slate-900">₫{b.spent.toLocaleString()}</span>
                  <span className="text-muted-foreground"> / ₫{b.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Thanh Progress */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`${b.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Dòng chú thích dưới: % đã dùng và số tiền còn lại */}
              <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">{percentage}% đã dùng</span>
                <span className="text-slate-500">₫{remaining.toLocaleString()} còn lại</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  )
}

export default BudgetProgress