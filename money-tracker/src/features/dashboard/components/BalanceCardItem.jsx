
import { Card, CardContent } from "@/components/ui/card"

const BalanceCardItem = ({ card }) => {
  const Icon = card.icon

  return (
    <Card
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
}

export default BalanceCardItem
    