import {useMemo, useState} from "react"
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"

const AddBudgetDialog = ({
                             isOpen,
                             onClose,
                             onAdd,
                             categories = [],
                             existingCategoryIds = [],
                         }) => {
    const [categoryId, setCategoryId] = useState("")
    const [amount, setAmount] = useState("")

    //  chuẩn hóa mọi phần tử trong mảng thành string
    const normalizedExisting = useMemo(
        () => existingCategoryIds.map(String),
        [existingCategoryIds]
    );

    // kiểm tra xem category đó đã được tạo budget chưa?
    const isDuplicate = categoryId ? normalizedExisting.includes(String(categoryId)) : false;

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!categoryId || !amount || isDuplicate) return

        onAdd?.({
            categoryId: String(categoryId),
            total: Number(amount),
        })

        setCategoryId("")
        setAmount("")
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
                            <Select value={categoryId} onValueChange={setCategoryId}>
                                <SelectTrigger id="category" className="col-span-3 w-full">
                                    <SelectValue placeholder="Chọn danh mục"/>
                                </SelectTrigger>
                                <SelectContent
                                    position="popper"
                                    align="start"
                                    className="w-[var(--radix-select-trigger-width)]"
                                >
                                    {categories.map((c) => (
                                        <SelectItem key={String(c.id)} value={String(c.id)}>
                                            {c.categoryName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {isDuplicate && (
                            <div className="grid grid-cols-4 gap-4 -mt-2">
                                <div/>
                                <p className="col-span-3 text-sm text-destructive">
                                    Danh mục này đã có ngân sách. Hãy chọn danh mục khác.
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">Số tiền</Label>
                            <div className="col-span-3 relative">
                                <span
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₫</span>
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
                            disabled={isDuplicate}
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
