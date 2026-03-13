import { useState } from "react"
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"

const categoryOptions = [
  { value: "housing", label: "Nhà ở" },
  { value: "food", label: "Ăn uống" },
  { value: "transportation", label: "Di chuyển" },
  { value: "entertainment", label: "Giải trí" },
  { value: "utilities", label: "Tiện ích" },
  { value: "shopping", label: "Mua sắm" },
  { value: "other", label: "Khác" },
]

const AddBudgetDialog = ({ isOpen, onClose, onAdd, existingCategories = [] }) => {
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [period, setPeriod] = useState("monthly")

  const normalizedExistingCategories = existingCategories.map((item) => item.toLowerCase())
  const selectedCategory = categoryOptions.find((option) => option.value === category)
  const isDuplicateCategory = selectedCategory
    ? normalizedExistingCategories.includes(selectedCategory.label.toLowerCase())
    : false

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!category || !amount || isDuplicateCategory) return

    onAdd?.({
      category,
      categoryLabel: selectedCategory?.label ?? category,
      amount: Number(amount),
      period,
    })
    setCategory("")
    setAmount("")
    setPeriod("monthly")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm ngân sách mới</DialogTitle>
          <DialogDescription>
            Tạo danh mục ngân sách mới để theo dõi chi tiêu của bạn
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Danh mục</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="col-span-3 w-full">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  align="start"
                  className="w-[var(--radix-select-trigger-width)]"
                >
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isDuplicateCategory && (
              <div className="grid grid-cols-4 gap-4 -mt-2">
                <div />
                <p className="col-span-3 text-sm text-destructive">
                  Danh mục này đã có ngân sách. Hãy chọn danh mục khác.
                </p>
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Số tiền</Label>
              <div className="col-span-3 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₫</span>
                <Input
                  id="amount"
                  className="pl-7"
                  placeholder="0"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
            <Button
              type="submit"
              disabled={isDuplicateCategory}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Thêm ngân sách
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddBudgetDialog
