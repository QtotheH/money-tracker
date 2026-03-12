import GoalItem from "./GoalItem"

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