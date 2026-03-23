import BudgetItem from "@/features/budgets/components/BudgetItem.jsx";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll.js";
import LoadMore from "@/components/common/LoadMore.jsx";

const BudgetList = ({ budgets = []}) => {
  // Infinite scroll
  const { visibleItems, hasMore, loadMoreRef } = useInfiniteScroll(budgets);

  return (
    <div className="space-y-6 max-h-[600px] md:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      {visibleItems.map((b) => (
        <BudgetItem key={b.id} budget={b} />
      ))}

      {/* THẺ MỎ NEO KÍCH HOẠT LOAD MORE */}
      {hasMore && <LoadMore loadMoreRef={loadMoreRef} />}
    </div>
  )
}

export default BudgetList