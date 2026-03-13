import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import GoalCard from "@/features/goals/components/GoalCard";
import AddGoalDialog from "@/features/goals/components/AddGoalModalDialog";

const goals = [
    {
      id: nanoid(),
      name: "Quỹ khẩn cấp",
      date: "31/12/2025",
      current: 6500,
      target: 10000,
      iconClass: "fa-regular fa-house",
        iconName: "house",
    },
    
  ];

const GoalsPage = () => {
  const [open, setOpen] = useState(false);

  const [goals, setGoals] = useState([]);

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Chia 2 thành phần */}
      <div className="container mx-auto px-4 py-8">
          {/* Thành phần thứ nhất */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
                Mục tiêu tiết kiệm
              </h1>
              <p className="text-muted-foreground">
                Đặt ra và theo dõi mục tiêu tài chính của bạn
              </p>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Thêm mục tiêu
            </Button>
          </div>
        {/* CARD */}
        <GoalCard />
      </div>

      <AddGoalDialog open={open} setOpen={setOpen} addGoal={addGoal} />
    </main>
  );
};

export default GoalsPage;
