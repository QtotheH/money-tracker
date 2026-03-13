import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const TransactionItem = ({ transaction }) => {
  return (
    <div
      className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50/50 transition-colors duration-300 ease-in-out hover:shadow-lg"
    >
      <div className="flex items-center gap-4">

        <div className={`p-2.5 bg-slate-100 rounded-full ${transaction.iconBg}`}>
          {transaction.icon}
        </div>

        <div>
          <p className="font-semibold text-slate-900 text-[16px]">
            {transaction.name}
          </p>

          <p className="text-[14px] text-muted-foreground">
            {transaction.date} • {transaction.category}
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
          {transaction.amount}
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