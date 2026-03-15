import {getUsedPercent} from "@/lib/budgetUtils.js";
import BudgetProgressBar from "@/features/budgets/components/BudgetProgressBar.jsx";

const BudgetItem = ({ budget }) => {
  const percentage = budget.total > 0 ? Math.round(getUsedPercent(budget) * 100) : 0
  const remaining = budget.total - budget.spent

  const category = budget.category

  return (
    <div className="space-y-2">
      
      {/* Tiêu đề */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
            {/* Render icon từ iconClass  */}
            {category?.iconClass ? <i className={category.iconClass} /> : null}
          </div>

          <span className="font-semibold text-slate-900 text-[16px]">
            {category?.categoryName ?? "Không rõ danh mục"}
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
        <BudgetProgressBar value={Math.min(percentage, 100)} progressColor={budget.spent < budget.total ? `bg-emerald-600` : `bg-rose-600`}/>

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