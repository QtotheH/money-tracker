import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye} from "lucide-react"

import BudgetList from "@/features/budgets/components/BudgetList.jsx"
import {nanoid} from "@reduxjs/toolkit";
import {useMemo} from "react";
import { useNavigate } from "react-router";
import {buildCategoryById, getUsedPercent, withCategory} from "@/lib/budgetUtils.js";

// TODO: delete mock data
const categories = [
  {
    id: "1",
    categoryName: "Ăn uống",
    iconClass: "fa-regular fa-utensils",
    iconName: "utensils",
    icon: <i className="fa-regular fa-utensils"></i>,
  },
  {
    id: "2",
    categoryName: "Lương",
    iconClass: "fa-regular fa-dollar-sign",
    iconName: "dollar-sign",
    icon: <i className="fa-regular fa-dollar-sign"></i>,
  },
  {
    id: "3",
    categoryName: "Thuê nhà",
    iconClass: "fa-regular fa-house",
    iconName: "house",
    icon: <i className="fa-regular fa-house"></i>,
  },
  {
    id: "4",
    categoryName: "Học phí",
    iconClass: "fa-regular fa-graduation-cap",
    iconName: "graduation-cap",
    icon: <i className="fa-regular fa-graduation-cap"></i>,
  },
  {
    id: "5",
    categoryName: "Quà sinh nhật",
    iconClass: "fa-regular fa-gift",
    iconName: "gift",
    icon: <i className="fa-regular fa-gift"></i>,
  },
  {
    id: "6",
    categoryName: "Gói đăng ký Youtube",
    iconClass: "fa-brands fa-youtube",
    iconName: "youtube",
    icon: <i className="fa-brands fa-youtube"></i>,
  },
  {
    id: "7",
    categoryName: "Gói đăng ký Spotify",
    iconClass: "fa-brands fa-spotify",
    iconName: "spotify",
    icon: <i className="fa-brands fa-spotify"></i>,
  },
  {
    id: "8",
    categoryName: "Vé xem phim",
    iconClass: "fa-regular fa-film",
    iconName: "film",
    icon: <i className="fa-regular fa-film"></i>,
  },
  {
    id: "9",
    categoryName: "Đổ xăng",
    iconClass: "fa-regular fa-gas-pump",
    iconName: "gas-pump",
    icon: <i className="fa-regular fa-gas-pump"></i>,
  },
  {
    id: "10",
    categoryName: "Bảo dưỡng xe",
    iconClass: "fa-regular fa-screwdriver-wrench",
    iconName: "screwdriver-wrench",
    icon: <i className="fa-regular fa-screwdriver-wrench"></i>,
  },
]
const budgets = [
  {
    id: nanoid(),
    categoryId: "1",
    spent: 45000,
    total: 90000,
  },
  {
    id: nanoid(),
    categoryId: "2",
    spent: 30000,
    total: 300000,
  },
  {
    id: nanoid(),
    categoryId: "10",
    spent: 300000,
    total: 300000,
  },
  {
    id: nanoid(),
    categoryId: "8",
    spent: 1500000,
    total: 1000000,
  },
  {
    id: nanoid(),
    categoryId: "6",
    spent: 131204,
    total: 19980817,
  },
  {
    id: nanoid(),
    categoryId: "7",
    spent: 150000,
    total: 600000,
  },
]

const BudgetProgress = () => {
  const navigate = useNavigate();

  const categoryById = useMemo(() => buildCategoryById(categories), [categories]);

  const topBudgets = useMemo(() => {
    const enriched = withCategory(budgets, categoryById)

    // sort theo % used giảm dần
    enriched.sort((a, b) => getUsedPercent(b) - getUsedPercent(a))

    // lấy tối đa 5
    return enriched.slice(0, 3)
  }, [budgets, categoryById])

  return (
    <Card className="py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">

      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">

        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Tiến độ ngân sách
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Chi tiêu của bạn so với ngân sách hàng tháng
          </p>
        </div>

        <button
          title="Xem tất cả ngân sách"
          onClick={() => navigate("/budgets")}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Eye size={24} />
        </button>

      </CardHeader>

      <CardContent>
        <BudgetList budgets={topBudgets} />
      </CardContent>

    </Card>
  )
}

export default BudgetProgress