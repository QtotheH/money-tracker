import React from "react";
import { Progress } from "@/components/ui/progress";

const GoalProgress = ({ value }) => {
  return <Progress value={value} className="h-3 mt-2"></Progress>;
};

export default GoalProgress;
