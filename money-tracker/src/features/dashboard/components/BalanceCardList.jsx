import BalanceCardItem from "@/features/dashboard/components/BalanceCardItem.jsx";
import { Wallet, ArrowUp, ArrowDown, TrendingUp } from "lucide-react"

const BalanceCardList = () => {

  const cards = [
    {
      title: "Tổng số dư",
      value: "₫12,580,000",
      change: "+₫1,245,000 so với tháng trước",
      icon: Wallet,
      color: "text-emerald-600"
    },
    {
      title: "Thu nhập",
      value: "₫4,395,000",
      change: "+12.5% so với tháng trước",
      icon: ArrowUp,
      color: "text-emerald-600"
    },
    {
      title: "Chi tiêu",
      value: "₫2,150,000",
      change: "-3.2% so với tháng trước",
      icon: ArrowDown,
      color: "text-red-500"
    },
    {
      title: "Tỷ lệ tiết kiệm",
      value: "51.1%",
      change: "+4.3% so với tháng trước",
      icon: TrendingUp,
      color: "text-emerald-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

      {cards.map((card, i) => {
        return (
          <BalanceCardItem
            key={i}
            card={card}
          />
        )
      })}

    </div>
  )
}

export default BalanceCardList
