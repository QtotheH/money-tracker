import React from "react";
import GoalItem from "@/features/goals/components/GoalItem";
const GoalList = ({ goals, isDashboard }) => {
  return (
    <div className="space-y-6 max-h-[600px] md:max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} isDashboard={isDashboard} />
      ))}
    </div>
  );
};

export default GoalList;
