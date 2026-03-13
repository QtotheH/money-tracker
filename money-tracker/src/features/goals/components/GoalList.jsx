import React from "react";
import GoalItem from "@/features/goals/components/GoalItem";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "@reduxjs/toolkit";
const GoalList = () => {
  const goals = [
    {
      id: nanoid(),
      name: "Quỹ khẩn cấp",
      date: "31/12/2025",
      current: 6500,
      target: 10000,
      icon: faHouse,
    },
    {
      id: nanoid(),
      name: "Du lịch",
      date: "3/1/2025",
      current: 8500,
      target: 10000,
      icon: faPlane,
    },
    {
      id: 2,
      name: "Du lịch",
      date: "3/1/2025",
      current: 8500,
      target: 10000,
      icon: faPlane,
    },
    {
      id: 2,
      name: "Du lịch",
      date: "3/1/2025",
      current: 8500,
      target: 10000,
      icon: faPlane,
    },
    {
      id: 2,
      name: "Du lịch",
      date: "3/1/2025",
      current: 8500,
      target: 10000,
      icon: faPlane,
    },
    {
      id: 2,
      name: "Du lịch",
      date: "3/1/2025",
      current: 8500,
      target: 10000,
      icon: faPlane,
    },
    {
      id: 2,
      name: "Du lịch",
      date: "3/1/2025",
      current: 8500,
      target: 10000,
      icon: faPlane,
    },
    {
      id: 2,
      name: "Du lịch",
      date: "3/1/2025",
      current: 8500,
      target: 10000,
      icon: faPlane,
    },
  ];
  return (
    <div className="space-y-6 max-h-[450px] overflow-y-auto custom-scrollbar pr-2">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalList;
