import BudgetItem from "./BudgetItem"

const BudgetList = ({ budgets }) => {

  return (
    <div className="space-y-6">
      {budgets.map((b, i) => (
        <BudgetItem key={i} budget={b} />
      ))}
    </div>
  )
}

export default BudgetList