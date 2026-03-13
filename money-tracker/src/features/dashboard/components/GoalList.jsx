import GoalItem from "@/features/dashboard/components/GoalItem.jsx";

const GoalList = ({ goals }) => {
  return (
    <div className="space-y-6">
      {goals.map((g, i) => (
        <GoalItem key={i} goal={g} />
      ))}
    </div>
  )
}

export default GoalList