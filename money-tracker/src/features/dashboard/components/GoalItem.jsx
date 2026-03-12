const GoalItem = ({ goal }) => {
  const percentage = Math.round((goal.spent / goal.total) * 100)
  const remaining = goal.total - goal.spent

  return (
    <div className="space-y-2">
      
      {/* Dòng 1 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">

          <div className="mt-1 text-slate-800">
            {goal.icon}
          </div>

          <div>
            <h4 className="font-semibold text-[16px] text-slate-900 leading-none mb-1">
              {goal.name}
            </h4>

            <p className="text-xs text-slate-400 font-medium">
              Ngày mục tiêu: {goal.targetDate}
            </p>
          </div>

        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400 font-medium mb-1">
            Còn lại {goal.daysLeft} ngày
          </p>

          <div className="text-sm font-medium">
            <span className="text-slate-900">
              ₫{goal.spent.toLocaleString()}
            </span>

            <span className="text-muted-foreground">
              {" "} / ₫{goal.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
        <div
          className="bg-emerald-500 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs font-medium">
        <span className="text-muted-foreground">
          {percentage}% đã dùng
        </span>

        <span className="text-slate-500">
          {remaining.toLocaleString()} VNĐ còn lại
        </span>
      </div>

    </div>
  )
}

export default GoalItem