import { Card, CardContent } from "@/components/ui/card"
import { Wallet, ArrowUp, ArrowDown, TrendingUp } from "lucide-react"

const BalanceCards = () => {

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
    <div className="grid md:grid-cols-4 gap-5">

      {cards.map((card, i) => {

        const Icon = card.icon

        return (
          <Card
            key={i}
            className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
          >

            <CardContent className="px-6 py-3 space-y-3">

              {/* Title + Icon */}
              <div className="flex justify-between items-center">

                <p className="font-semibold text-[14px]">
                  {card.title}
                </p>

                <Icon className={`w-5 h-5 ${card.color}`} />

              </div>

              {/* Value */}
              <h2 className="text-2xl font-bold">
                {card.value}
              </h2>

              {/* Change */}
              <p className="text-xs text-muted-foreground">
                {card.change}
              </p>

            </CardContent>

          </Card>
        )
      })}

    </div>
  )
}

export default BalanceCards