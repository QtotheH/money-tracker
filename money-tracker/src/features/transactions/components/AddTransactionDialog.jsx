import {useEffect, useState} from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, selectAllCategoriesState} from "@/store/slices/categorySlice.js";

function AddTransactionDialog({ open, onOpenChange }) {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(selectAllCategoriesState);

  const [transactionType, setTransactionType] = useState("expense")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      type: transactionType,
      amount: Number.parseFloat(amount),
      description,
      category,
      date,
    })

    setAmount("")
    setDescription("")
    setCategory("")
    setDate(new Date().toISOString().split("T")[0])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm giao dịch mới</DialogTitle>
          <DialogDescription>Nhập thông tin chi tiết cho giao dịch của bạn bên dưới.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <RadioGroup value={transactionType} onValueChange={setTransactionType} className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="expense" id="expense" className="border-emerald-600 text-emerald-600" />
                <Label htmlFor="expense" className="flex-1">
                  Chi tiêu
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="income" id="income" className="border-emerald-600 text-emerald-600" />
                <Label htmlFor="income" className="flex-1">
                  Thu nhập
                </Label>
              </div>
            </RadioGroup>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Số tiền
              </Label>
              <div className="col-span-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">₫</span>
                  <Input
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-7"
                    placeholder="0"
                    type="number"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Mô tả
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="Giao dịch này dùng cho việc gì?"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Danh mục
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category" className="col-span-3 max-w-full">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent
                    position="popper"
                    align="start"
                    className="max-w-full"
                >
                  {items.length > 0 &&
                      items.map(c => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.categoryName}
                          </SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Ngày
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" type="submit">Thêm giao dịch</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { AddTransactionDialog }
export default AddTransactionDialog