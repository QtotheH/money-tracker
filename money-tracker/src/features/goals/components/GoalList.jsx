import React from "react";
import GoalItem from "@/features/goals/components/GoalItem";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll.js";
import LoadMore from "@/components/common/LoadMore.jsx";
const GoalList = ({ goals, isDashboard }) => {
  // sử dụng custom hook infinite scroll
  const { visibleItems, hasMore, loadMoreRef } = useInfiniteScroll(goals);
  return (
    <div className="space-y-6 max-h-[600px] md:max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
      {visibleItems.map((goal) => (
        <GoalItem key={goal.id} goal={goal} isDashboard={isDashboard} />
      ))}
      {/* THẺ MỎ NEO KÍCH HOẠT LOAD MORE */}
      {hasMore && <LoadMore loadMoreRef={loadMoreRef} />}
    </div>
  );
};

export default GoalList;
