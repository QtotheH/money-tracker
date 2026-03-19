import {getUsedPercent} from "@/lib/budgetUtils.js";
import BudgetProgressBar from "@/features/budgets/components/BudgetProgressBar.jsx";

const BudgetItem = ({ budget }) => {
  const percentage = budget.total > 0 ? Math.round(getUsedPercent(budget) * 100) : 0
  const remaining = budget.total - budget.spent

  const category = budget.category

  return (
    <div className="space-y-2">
      {/* Tiêu đề */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-600 dark:text-slate-300 flex-shrink-0">
            {/* Render icon từ iconClass  */}
            {category?.iconClass ? <i className={category.iconClass} /> : null}
          </div>

          <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base truncate">
            {category?.categoryName ?? "Không rõ danh mục"}
          </span>
        </div>

        <div className="text-xs sm:text-sm font-medium flex-shrink-0">
          <span className="text-slate-900 dark:text-white">
            ₫{budget.spent.toLocaleString()}
          </span>
          <span className="text-muted-foreground dark:text-slate-400">
            {" "}
            / ₫{budget.total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress */}
        <BudgetProgressBar value={Math.min(percentage, 100)} progressColor={budget.spent < budget.total ? `bg-emerald-600` : `bg-rose-600`}/>

      {/* Footer */}
      <div className="flex justify-between text-xs font-medium">
        <span className="text-muted-foreground dark:text-slate-400">
          {percentage}% đã dùng
        </span>
        <span className="text-slate-500 dark:text-slate-400">
          ₫{remaining.toLocaleString()} còn lại
        </span>
      </div>
    </div>
  )
}

export default BudgetItem