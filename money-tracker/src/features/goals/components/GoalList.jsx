import React from "react";
import GoalItem from "./GoalItem";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
const GoalList = () => {
  const goals = [
    {
      id: 1,
      name: "Quỹ khẩn cấp",
      date: "31/12/2025",
      current: 6500,
      target: 10000,
      icon: faHouse,
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
    <div className="space-y-6">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalList;
