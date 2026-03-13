import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import GoalList from "@/features/goals/components/GoalList";

const GoalCard = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Mục tiêu tiết kiệm của bạn</CardTitle>
        <CardDescription>Theo dõi tiến độ đạt được các mục tiêu tài chính của bạn</CardDescription>
      </CardHeader>

      <CardContent>
        <GoalList />
      </CardContent>
    </Card>
  );
};

export default GoalCard;
