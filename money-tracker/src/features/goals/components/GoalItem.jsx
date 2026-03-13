import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import GoalProgress from "@/features/goals/components/GoalProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddFundDialog from "@/features/goals/components/AddFundDialog";

const GoalItem = ({ goal }) => {
  const [isAddFundOpen, setIsAddFundOpen] = useState(false);
  const progress = Math.round((goal.current / goal.target) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <i className={goal.iconClass}></i>
          <div>
            <p className="font-medium text-lg">{goal.name}</p>
            <p className="text-xs text-muted-foreground">
              Ngày hoàn thành: {goal.date}
            </p>
          </div>
        </div>

        <Button
          onClick={() => {
            setIsAddFundOpen(true);
          }}
          variant="outline"
          size="lg"
        >
          Thêm tiền
        </Button>
        <AddFundDialog open={isAddFundOpen} setOpenChange={setIsAddFundOpen} />
      </div>
      <GoalProgress value={progress} />
      <div className="flex justify-between text-sm mt-1">
        <span>₫{goal.current.toLocaleString()}</span>

        <span className="text-muted-foreground">₫{goal.target.toLocaleString()} đã đạt</span>
      </div>
    </div>
  );
};

export default GoalItem;
