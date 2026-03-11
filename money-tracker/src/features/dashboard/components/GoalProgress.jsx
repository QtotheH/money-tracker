import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Utensils, Car, Heart, Eye } from "lucide-react"

const budgets = [
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
        {/* Icon con mắt ở góc phải */}
        <button title="Xem chi tiết" className="text-slate-400 hover:text-slate-600 transition-colors">
          <Eye size={24} />
        </button>
      </CardHeader>

      <CardContent className="space-y-6">
        {budgets.map((b, i) => {
          const percentage = Math.round((b.spent / b.total) * 100);
          const remaining = b.total - b.spent;

          return (
            <div key={i} className="space-y-2">
              {/* Dòng 1: Icon + Tên & Ngày + Số ngày còn lại & Số tiền */}
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="mt-1 text-slate-800">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[16px] text-slate-900 leading-none mb-1">
                      {b.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      Ngày mục tiêu: {b.targetDate}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium mb-1">
                    Còn lại {b.daysLeft} ngày 
                  </p>
                  <div className="text-sm font-medium">
                    <span className="text-slate-900">₫{b.spent.toLocaleString()}</span>
                    <span className="text-muted-foreground"> / ₫{b.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Thanh Progress*/}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Dòng 3: Chú thích dưới */}
              <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">{percentage}% đã dùng</span>
                <span className="text-slate-500">{remaining} VNĐ còn lại</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  )
}

export default GoalProgress