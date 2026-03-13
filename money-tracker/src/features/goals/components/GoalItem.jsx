import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import GoalProgress from "@/features/goals/components/GoalProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddFund from "@/features/goals/components/AddFund";

const GoalItem = ({ goal }) => {
  const [add, setAdd] = useState(false);
  const progress = (goal.current / goal.target) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={goal.icon} size="lg" />

          <div>
            <p className="font-medium text-lg">{goal.name}</p>
            <p className="text-xs text-muted-foreground">
              Ngày hoàn thành: {goal.date}
            </p>
          </div>
        </div>

        <Button
          onClick={() => {
            setAdd(true);
          }}
          variant="outline"
          size="lg"
        >
          Thêm tiền
        </Button>
        <AddFund add={add} setAdd={setAdd} />
      </div>
      <GoalProgress value={progress} />
      <div className="flex justify-between text-sm mt-1">
        <span>{goal.current.toLocaleString()}VNĐ</span>

        <span className="text-muted-foreground">{goal.target}VNĐ goal</span>
      </div>
    </div>
  );
};

export default GoalItem;
