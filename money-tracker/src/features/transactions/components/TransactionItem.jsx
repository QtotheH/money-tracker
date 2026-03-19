import { Badge } from "@/components/ui/badge.jsx"
import { cn } from "@/lib/utils.js"
import {formatDateToVNDate} from "@/lib/helpers.js";

const TransactionItem = ({ transaction }) => {
  const category = transaction.category;
  return (
    <div
      className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50/50 transition-colors duration-300 ease-in-out hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className={`p-2.5 bg-slate-100 rounded-full`}>
          <i
              className={`${transaction.type === 'income' ? `text-emerald-600` : `text-rose-600`} ${category.iconClass}`}>
          </i>
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-[16px]">
            {transaction.description}
          </p>
          <p className="text-[14px] text-muted-foreground">
            {formatDateToVNDate(transaction.date)} • {category.categoryName}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "font-bold text-[16px]",
            transaction.type === "income"
              ? "text-emerald-600"
              : "text-rose-500"
          )}
        >
          {transaction.type === "income" ? '+' : '-'}
          ₫{transaction.amount.toLocaleString()}
        </span>
        <Badge
          variant="secondary"
          className={cn(
            "px-3 py-3 font-semibold transition-all text-[12px]",
            transaction.type === "income"
              ? "bg-white border border-slate-200 text-slate-700"
              : "bg-slate-100 text-slate-700 border-transparent"
          )}
        >
          {transaction.type === "income" ? "Thu nhập" : "Chi tiêu"}
        </Badge>
      </div>
    </div>
  )
}

export default TransactionItem