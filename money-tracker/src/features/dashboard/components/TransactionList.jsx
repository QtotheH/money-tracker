import TransactionItem from "./TransactionItem"

const TransactionList = ({ transactions }) => {
  return (
    <div className="space-y-4">
      {transactions.map((t, i) => (
        <TransactionItem key={i} transaction={t} />
      ))}
    </div>
  )
}

export default TransactionList