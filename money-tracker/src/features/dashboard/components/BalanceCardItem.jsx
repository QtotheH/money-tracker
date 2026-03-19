
import { Card, CardContent } from "@/components/ui/card"

const BalanceCardItem = ({ card }) => {
  const Icon = card.icon

  return (
    <Card
      className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
    >
      <CardContent className="px-4 sm:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3">
        {/* Title + Icon */}
        <div className="flex justify-between items-start sm:items-center gap-2">
          <p className="font-semibold text-xs sm:text-sm break-words">
            {card.title}
          </p>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${card.color}`} />
        </div>

        {/* Value */}
        <h2 className="text-xl sm:text-2xl font-bold break-words">
          {card.value}
        </h2>

        {/* Change */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {card.change}
        </p>
      </CardContent>
    </Card>
  )
}

export default BalanceCardItem
    