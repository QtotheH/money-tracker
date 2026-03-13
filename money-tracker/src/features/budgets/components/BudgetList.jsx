import BudgetItem from "@/features/budgets/components/BudgetItem.jsx";

const BudgetList = ({ budgets = []}) => {

  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      {budgets.map((b) => (
        <BudgetItem key={b.id} budget={b} />
      ))}
    </div>
  )
}

export default BudgetList