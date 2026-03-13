import React from "react";
import GoalItem from "@/features/goals/components/GoalItem";
const GoalList = ({ goals }) => {
  return (
    <div className="space-y-6 max-h-[450px] overflow-y-auto custom-scrollbar pr-2">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalList;
