import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye} from "lucide-react"

import BudgetList from "@/features/budgets/components/BudgetList.jsx"
import {useMemo} from "react";
import { useNavigate } from "react-router";
import {useBudgetsData} from "@/features/budgets/hooks/useBudgetData.jsx";
import {calculatePercent} from "@/lib/helpers.js";

const BudgetProgress = () => {
  const navigate = useNavigate();

  // Lấy dữ liệu budgets từ custom hook
  const { budgetsWithCategory, isLoading } = useBudgetsData();

  // Xử lý sắp xếp và lấy Top 3 ngân sách tiêu nhiều nhất
  const topBudgets = useMemo(() => {
    // Clone mảng để không làm thay đổi trực tiếp (mutate) state gốc của Redux
    const enriched = [...budgetsWithCategory];

    // sort theo % used giảm dần (Ngân sách sắp hết/vượt mức sẽ nằm trên cùng)
    enriched.sort((a, b) =>
        calculatePercent(b.spent, b.total) - calculatePercent(a.spent, a.total)
    );

    // Lấy tối đa 3 phần tử đầu tiên
    return enriched.slice(0, 3);
  }, [budgetsWithCategory]);

  return (
    <Card className="h-full py-4 sm:py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">

      <CardHeader className="flex flex-row items-center justify-between gap-2 sm:gap-4 space-y-0 pb-2 px-4 sm:px-6">

        <div className="space-y-1 min-w-0 flex-1">
          <CardTitle className="text-lg sm:text-2xl font-bold tracking-tight">
            Tiến độ ngân sách
          </CardTitle>

          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            Chi tiêu của bạn so với ngân sách hàng tháng
          </p>
        </div>

        <button
          title="Xem tất cả ngân sách"
          onClick={() => navigate("/budgets")}
          className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
        >
          <Eye size={20} />
        </button>

      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        {isLoading ? (
            <p className="text-center py-4 text-sm text-muted-foreground">Đang tải dữ liệu...</p>
        ) : budgetsWithCategory.length === 0 ? (
            <p className="text-center py-4 text-sm text-muted-foreground">Chưa có ngân sách nào.</p>
        ) : (
            <BudgetList budgets={topBudgets} />
        )}
      </CardContent>

    </Card>
  )
}

export default BudgetProgress