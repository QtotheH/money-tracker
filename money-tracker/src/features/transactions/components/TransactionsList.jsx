import { useState } from "react"
import {
  ArrowUpIcon,
  CreditCardIcon,
  HomeIcon,
  ShoppingBagIcon,
  UtensilsIcon,
  CarIcon,
  HeartIcon,
  LightbulbIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const transactions = [
  {
    id: "t1",
    date: "2023-05-01",
    description: "Nhận lương",
    amount: 4395,
    type: "income",
    category: "Thu nhập",
    icon: <ArrowUpIcon className="h-4 w-4 text-emerald-600" />,
  },
  {
    id: "t2",
    date: "2023-05-02",
    description: "Thanh toán tiền thuê nhà",
    amount: 850,
    type: "expense",
    category: "Nhà ở",
    icon: <HomeIcon className="h-4 w-4 text-rose-500" />,
  },
  {
    id: "t3",
    date: "2023-05-03",
    description: "Mua thực phẩm",
    amount: 120,
    type: "expense",
    category: "Ăn uống",
    icon: <UtensilsIcon className="h-4 w-4 text-rose-500" />,
  },
  {
    id: "t4",
    date: "2023-05-04",
    description: "Làm việc freelance",
    amount: 350,
    type: "income",
    category: "Thu nhập",
    icon: <ArrowUpIcon className="h-4 w-4 text-emerald-600" />,
  },
  {
    id: "t5",
    date: "2023-05-05",
    description: "Đổ xăng",
    amount: 45,
    type: "expense",
    category: "Di chuyển",
    icon: <CarIcon className="h-4 w-4 text-rose-500" />,
  },
  {
    id: "t6",
    date: "2023-05-06",
    description: "Mua sắm online",
    amount: 78.5,
    type: "expense",
    category: "Mua sắm",
    icon: <ShoppingBagIcon className="h-4 w-4 text-rose-500" />,
  },
  {
    id: "t7",
    date: "2023-05-07",
    description: "Tiền điện",
    amount: 95,
    type: "expense",
    category: "Tiện ích",
    icon: <LightbulbIcon className="h-4 w-4 text-rose-500" />,
  },
  {
    id: "t8",
    date: "2023-05-08",
    description: "Ăn tối nhà hàng",
    amount: 65,
    type: "expense",
    category: "Ăn uống",
    icon: <UtensilsIcon className="h-4 w-4 text-rose-500" />,
  },
  {
    id: "t9",
    date: "2023-05-09",
    description: "Vé xem phim",
    amount: 30,
    type: "expense",
    category: "Giải trí",
    icon: <HeartIcon className="h-4 w-4 text-rose-500" />,
  },
  {
    id: "t10",
    date: "2023-05-10",
    description: "Thanh toán thẻ tín dụng",
    amount: 200,
    type: "expense",
    category: "Nợ",
    icon: <CreditCardIcon className="h-4 w-4 text-rose-500" />,
  },
]

function TransactionsList({ limit, showAll = false }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredTransactions = transactions
    .filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((transaction) =>
      filterType === "all"
        ? true
        : filterType === "income"
          ? transaction.type === "income"
          : transaction.type === "expense"
    )

  const limitedTransactions = filteredTransactions.slice(0, limit || filteredTransactions.length)

  return (
    <div className="space-y-4">
      {showAll && (
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Tìm giao dịch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:max-w-[250px]"
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="sm:max-w-[180px]">
              <SelectValue placeholder="Lọc theo loại" />
            </SelectTrigger>
            <SelectContent
                position="popper"
                    align="start"
                    className="w-[var(--radix-select-trigger-width)]"
            >
              <SelectItem value="all">Tất cả giao dịch</SelectItem>
              <SelectItem value="income">Chỉ thu nhập</SelectItem>
              <SelectItem value="expense">Chỉ chi tiêu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        {limitedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800">
                {transaction.icon}
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("vi-VN")} • {transaction.category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={transaction.type === "income" ? "text-emerald-600 font-medium" : "text-rose-500 font-medium"}
              >
                {transaction.type === "income" ? "+" : "-"}₫{transaction.amount.toLocaleString("vi-VN")}
              </span>
              <Badge variant={transaction.type === "income" ? "outline" : "secondary"} className="ml-2">
                {transaction.type === "income" ? "Thu nhập" : "Chi tiêu"}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {limit && transactions.length > limit && (
        <div className="flex justify-center mt-4">
          <Button variant="outline">Xem tất cả giao dịch</Button>
        </div>
      )}
    </div>
  )
}

export { TransactionsList }
export default TransactionsList