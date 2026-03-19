import {useEffect, useMemo, useState} from "react"
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
import {nanoid} from "@reduxjs/toolkit";
import TransactionItem from "@/features/transactions/components/TransactionItem.jsx";
import {buildCategoryById, withCategory} from "@/lib/helpers.js";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectAllCategoriesState} from "@/store/slices/categorySlice.js";
import {
  fetchAllTransactions,
  getTransactionsStatus,
  selectAllTransactions,
  selectTransactionsWithCategories
} from "@/store/slices/transactionSlice.js";
// // TODO: delete mock data
// const categories = [
//   {
//     id: "1",
//     categoryName: "Ăn uống",
//     iconClass: "fa-regular fa-utensils",
//     iconName: "utensils",
//     icon: <i className="fa-regular fa-utensils"></i>,
//   },
//   {
//     id: "2",
//     categoryName: "Lương",
//     iconClass: "fa-regular fa-dollar-sign",
//     iconName: "dollar-sign",
//     icon: <i className="fa-regular fa-dollar-sign"></i>,
//   },
//   {
//     id: "3",
//     categoryName: "Thuê nhà",
//     iconClass: "fa-regular fa-house",
//     iconName: "house",
//     icon: <i className="fa-regular fa-house"></i>,
//   },
//   {
//     id: "4",
//     categoryName: "Học phí",
//     iconClass: "fa-regular fa-graduation-cap",
//     iconName: "graduation-cap",
//     icon: <i className="fa-regular fa-graduation-cap"></i>,
//   },
//   {
//     id: "5",
//     categoryName: "Quà sinh nhật",
//     iconClass: "fa-regular fa-gift",
//     iconName: "gift",
//     icon: <i className="fa-regular fa-gift"></i>,
//   },
//   {
//     id: "6",
//     categoryName: "Gói đăng ký Youtube",
//     iconClass: "fa-brands fa-youtube",
//     iconName: "youtube",
//     icon: <i className="fa-brands fa-youtube"></i>,
//   },
//   {
//     id: "7",
//     categoryName: "Gói đăng ký Spotify",
//     iconClass: "fa-brands fa-spotify",
//     iconName: "spotify",
//     icon: <i className="fa-brands fa-spotify"></i>,
//   },
//   {
//     id: "8",
//     categoryName: "Vé xem phim",
//     iconClass: "fa-regular fa-film",
//     iconName: "film",
//     icon: <i className="fa-regular fa-film"></i>,
//   },
//   {
//     id: "9",
//     categoryName: "Đổ xăng",
//     iconClass: "fa-regular fa-gas-pump",
//     iconName: "gas-pump",
//     icon: <i className="fa-regular fa-gas-pump"></i>,
//   },
//   {
//     id: "10",
//     categoryName: "Bảo dưỡng xe",
//     iconClass: "fa-regular fa-screwdriver-wrench",
//     iconName: "screwdriver-wrench",
//     icon: <i className="fa-regular fa-screwdriver-wrench"></i>,
//   },
// ];
// const transactions = [
//   {
//     id: nanoid(),
//     date: "02/28/2026",
//     description: "Nhận lương",
//     amount: 5000000,
//     type: "income",
//     categoryId: "2"
//   },
//   {
//     id: nanoid(),
//     date: "03/14/2026",
//     description: "Thanh toán tiền thuê nhà",
//     amount: 2500000,
//     type: "expense",
//     categoryId: "3"
//   },
//   {
//     id: nanoid(),
//     date: "03/01/2026",
//     description: "Ăn trưa",
//     amount: 75000,
//     type: "expense",
//     categoryId: "1"
//   },
//   {
//     id: nanoid(),
//     date: "03/02/2026",
//     description: "Đổ xăng xe máy",
//     amount: 120000,
//     type: "expense",
//     categoryId: "9"
//   },
//   {
//     id: nanoid(),
//     date: "03/03/2026",
//     description: "Xem phim CGV",
//     amount: 180000,
//     type: "expense",
//     categoryId: "8"
//   },
//   {
//     id: nanoid(),
//     date: "03/04/2026",
//     description: "Spotify tháng 3",
//     amount: 59000,
//     type: "expense",
//     categoryId: "7"
//   },
//   {
//     id: nanoid(),
//     date: "03/05/2026",
//     description: "Youtube Premium",
//     amount: 79000,
//     type: "expense",
//     categoryId: "6"
//   },
//   {
//     id: nanoid(),
//     date: "03/06/2026",
//     description: "Ăn tối cùng bạn",
//     amount: 220000,
//     type: "expense",
//     categoryId: "1"
//   },
//   {
//     id: nanoid(),
//     date: "03/07/2026",
//     description: "Quà sinh nhật Minh",
//     amount: 300000,
//     type: "expense",
//     categoryId: "5"
//   },
//   {
//     id: nanoid(),
//     date: "03/08/2026",
//     description: "Đổ xăng",
//     amount: 100000,
//     type: "expense",
//     categoryId: "9"
//   },
//   {
//     id: nanoid(),
//     date: "03/09/2026",
//     description: "Bảo dưỡng xe máy",
//     amount: 450000,
//     type: "expense",
//     categoryId: "10"
//   },
//   {
//     id: nanoid(),
//     date: "03/10/2026",
//     description: "Ăn sáng",
//     amount: 40000,
//     type: "expense",
//     categoryId: "1"
//   },
//   {
//     id: nanoid(),
//     date: "03/11/2026",
//     description: "Nhận lương freelance",
//     amount: 2000000,
//     type: "income",
//     categoryId: "2"
//   },
//   {
//     id: nanoid(),
//     date: "03/12/2026",
//     description: "Ăn trưa văn phòng",
//     amount: 85000,
//     type: "expense",
//     categoryId: "1"
//   },
//   {
//     id: nanoid(),
//     date: "03/13/2026",
//     description: "Xem phim cuối tuần",
//     amount: 200000,
//     type: "expense",
//     categoryId: "8"
//   },
//   {
//     id: nanoid(),
//     date: "03/15/2026",
//     description: "Đổ xăng",
//     amount: 110000,
//     type: "expense",
//     categoryId: "9"
//   },
//   {
//     id: nanoid(),
//     date: "03/16/2026",
//     description: "Ăn tối",
//     amount: 160000,
//     type: "expense",
//     categoryId: "1"
//   },
//   {
//     id: nanoid(),
//     date: "03/17/2026",
//     description: "Quà sinh nhật mẹ",
//     amount: 500000,
//     type: "expense",
//     categoryId: "5"
//   },
//   {
//     id: nanoid(),
//     date: "03/18/2026",
//     description: "Thanh toán học phí",
//     amount: 3000000,
//     type: "expense",
//     categoryId: "4"
//   },
//   {
//     id: nanoid(),
//     date: "03/19/2026",
//     description: "Spotify tháng 4",
//     amount: 59000,
//     type: "expense",
//     categoryId: "7"
//   },
//   {
//     id: nanoid(),
//     date: "03/20/2026",
//     description: "Ăn trưa",
//     amount: 90000,
//     type: "expense",
//     categoryId: "1"
//   },
//   {
//     id: nanoid(),
//     date: "03/21/2026",
//     description: "Youtube Premium",
//     amount: 79000,
//     type: "expense",
//     categoryId: "6"
//   },
//   {
//     id: nanoid(),
//     date: "03/22/2026",
//     description: "Đổ xăng",
//     amount: 120000,
//     type: "expense",
//     categoryId: "9"
//   },
//   {
//     id: nanoid(),
//     date: "03/23/2026",
//     description: "Bảo dưỡng xe",
//     amount: 350000,
//     type: "expense",
//     categoryId: "10"
//   },
//   {
//     id: nanoid(),
//     date: "03/24/2026",
//     description: "Ăn tối",
//     amount: 210000,
//     type: "expense",
//     categoryId: "1"
//   },
//   {
//     id: nanoid(),
//     date: "03/25/2026",
//     description: "Xem phim",
//     amount: 180000,
//     type: "expense",
//     categoryId: "8"
//   },
//   {
//     id: nanoid(),
//     date: "03/26/2026",
//     description: "Thưởng dự án",
//     amount: 1500000,
//     type: "income",
//     categoryId: "2"
//   }
// ];

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