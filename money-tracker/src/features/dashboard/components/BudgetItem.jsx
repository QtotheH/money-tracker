import { Utensils, Car, Heart } from "lucide-react"

const BudgetItem = ({ budget }) => {
  const percentage = Math.round((budget.spent / budget.total) * 100)
  const remaining = budget.total - budget.spent

  return (
    <div className="space-y-2">
      
      {/* Tiêu đề */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
            {budget.icon}
          </div>

          <span className="font-semibold text-slate-900 text-[16px]">
            {budget.name}
          </span>
        </div>

        <div className="text-sm font-medium">
          <span className="text-slate-900">
            ₫{budget.spent.toLocaleString()}
          </span>
          <span className="text-muted-foreground">
            {" "}
            / ₫{budget.total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className={`${budget.color} h-full rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs font-medium">
        <span className="text-muted-foreground">
          {percentage}% đã dùng
        </span>
        <span className="text-slate-500">
          ₫{remaining.toLocaleString()} còn lại
        </span>
      </div>
    </div>
  )
}

export default BudgetItem