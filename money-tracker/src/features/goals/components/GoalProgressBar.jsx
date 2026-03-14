import React from "react";
import { Progress } from "@/components/ui/progress";

const GoalProgressBar = ({ value }) => {
  return <Progress value={value} indicatorClassName="bg-emerald-600" />;
};

export default GoalProgressBar;
