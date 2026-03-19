import {useEffect, useState} from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TransactionItem from "@/features/transactions/components/TransactionItem.jsx";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchAllTransactions,
  getTransactionsStatus,
  selectTransactionsWithCategories
} from "@/store/slices/transactionSlice.js";

function TransactionList({ limit, showAll = false, onEdit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

/*   // Tạo 1 bảng tra cứu category theo id
  // chỉ thay đổi (tính toán lại) khi mảng categories thay đổi (useMemo)
  const categoryById = useMemo(() => buildCategoryById(categories), [categories]);

  // hàm này chỉ tính toán lại khi budgets và categoryById thay đổi
  const transactionsWithCategory = useMemo(
      () => withCategory(transactions, categoryById),
      [transactions, categoryById]
  ); */
  const transactionsStatus = useSelector(getTransactionsStatus);

  useEffect(() => {
    if (transactionsStatus === 'idle') {
      dispatch(fetchAllTransactions());
    }
  }, [transactionsStatus, dispatch]);

  const transactionsWithCategory = useSelector(selectTransactionsWithCategories) || [];

  const filteredTransactions = transactionsWithCategory
    .filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Input
            placeholder="Tìm giao dịch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:flex-1 sm:max-w-[250px] text-xs sm:text-sm"
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-auto sm:max-w-[180px] text-xs sm:text-sm">
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

      <div className={`space-y-2 sm:space-y-3 ${showAll && 'max-h-[600px] md:max-h-[500px]'} overflow-y-auto pr-2 custom-scrollbar`}>
        {limitedTransactions.map(transaction =>
          <TransactionItem key={transaction.id} transaction={transaction} onEdit={onEdit} />
        )}
      </div>

      {limit && transactionsWithCategory.length > limit && (
        <div className="flex justify-center mt-8 sm:mt-10">
          <Button onClick={() => navigate("/transactions")} variant="outline" className="w-full sm:w-auto">Xem tất cả giao dịch</Button>
        </div>
      )}
    </div>
  )
}
export default TransactionList