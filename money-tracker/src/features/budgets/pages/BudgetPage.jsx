
import {useMemo, useState} from "react"
import { Plus, Utensils, Car, Heart, Home, ShoppingCart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BudgetList from "@/features/budgets/components/BudgetList"
import AddBudgetDialog from "@/features/budgets/components/AddBudgetDialog"
import {nanoid} from "@reduxjs/toolkit";
import {buildCategoryById, withCategory} from "@/lib/budgetUtils.js";

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
const initialBudgets = [
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

const BudgetPage = () => {
  const [budgets, setBudgets] = useState(initialBudgets)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Tạo 1 bảng tra cứu category theo id
  // chỉ thay đổi (tính toán lại) khi mảng categories thay đổi (useMemo)
  const categoryById = useMemo(() => buildCategoryById(categories), [categories]);

  // hàm này chỉ tính toán lại khi budgets và categoryById thay đổi
  const budgetsWithCategory = useMemo(
      () => withCategory(budgets, categoryById),
      [budgets, categoryById]
  )

  // danh sách categoryId đã có budget (để chặn duplicate)
  // useMemo(..) tránh tính toán lại khi component re-render trừ khi một trong các dependencies có thay đổi
  const existingCategoryIds = useMemo(
      () => budgets.map((b) => String(b.categoryId)),
      [budgets]
  );

  const handleAdd = ({ categoryId, total }) => {
    const normalizedCategoryId = String(categoryId);

    // chặn trùng categoryId
    if (existingCategoryIds.includes(normalizedCategoryId)) {
      return;
    }

    setBudgets((prev) => [
      ...prev,
      {
        id: nanoid(), // mock id; sau này backend sẽ trả id
        categoryId: normalizedCategoryId,
        spent: 0,
        total,
      },
    ])
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">

        {/* Tiêu đề + nút thêm */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
              Ngân sách
            </h1>
            <p className="text-muted-foreground">
              Thiết lập và theo dõi giới hạn chi tiêu hàng tháng của bạn
            </p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm ngân sách
          </Button>
        </div>

        {/* Danh sách ngân sách */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Ngân sách hàng tháng</CardTitle>
            <CardDescription>Theo dõi chi tiêu theo từng danh mục</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetList budgets={budgetsWithCategory} />
          </CardContent>
        </Card>

      </div>

      <AddBudgetDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAdd}
        categories={categories}
        existingCategories={budgets.map((budget) => budget.categoryId)}
      />
    </main>
  )
}

export default BudgetPage