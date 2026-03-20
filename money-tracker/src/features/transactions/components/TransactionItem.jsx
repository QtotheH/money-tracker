import { Badge } from "@/components/ui/badge.jsx"
import { cn } from "@/lib/utils.js"
import {formatDateToVNDate} from "@/lib/helpers.js";
import {useCurrency} from "@/hooks/useCurrency.js";

const TransactionItem = ({ transaction, onEdit }) => {
  const category = transaction.category;

  const { formatMoney } = useCurrency();

  const handleOnEdit = (transaction) => {
    if (onEdit) {
      onEdit(transaction);
    }
  }

  return (
    <div
        onClick={() => handleOnEdit(transaction)}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-300 ease-in-out hover:shadow-lg"
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">

        <div className={`p-2.5 bg-slate-100 dark:bg-slate-700 rounded-full flex-shrink-0`}>
          <i
              className={`${transaction.type === 'income' ? `text-emerald-600` : `text-rose-600`} ${category.iconClass}`}>
          </i>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base truncate">
            {transaction.description}
          </p>

          <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-400 truncate">
            {formatDateToVNDate(transaction.date)} • {category.categoryName}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-4 flex-shrink-0">

        <span
          className={cn(
            "font-bold text-sm sm:text-base whitespace-nowrap",
            transaction.type === "income"
              ? "text-emerald-600"
              : "text-rose-500"
          )}
        >
          {transaction.type === "income" ? '+' : '-'}
          {formatMoney(transaction.amount)}
        </span>
        <Badge
          variant="secondary"
          className={cn(
            "px-2 sm:px-3 py-1.5 sm:py-3 font-semibold transition-all text-xs sm:text-sm flex-shrink-0",
            transaction.type === "income"
              ? "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent"
          )}
        >
          {transaction.type === "income" ? "Thu nhập" : "Chi tiêu"}
        </Badge>
      </div>
    </div>
  )
}

export default TransactionItem