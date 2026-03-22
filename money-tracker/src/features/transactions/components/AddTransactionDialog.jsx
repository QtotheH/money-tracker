import {useEffect, useState} from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useDispatch, useSelector} from "react-redux";
import {selectCategoriesItems} from "@/store/slices/categorySlice.js";

import {toast} from "sonner"
import {createTransaction, updateTransaction} from "@/store/slices/transactionSlice.js";
import {useCurrency} from "@/hooks/useCurrency.js";
import {PlusIcon} from "lucide-react";
import AddCategoryDialog from "@/features/categories/components/AddCategoryDialog.jsx";

function AddTransactionDialog({open, onOpenChange, mode = 'add', transaction = null}) {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategoriesItems);
    const {symbol} = useCurrency();

    const [transactionType, setTransactionType] = useState("expense")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [date, setDate] = useState(new Date().toISOString().split("T")[0])

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)

    // quản lý đóng mở dialog thêm category
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

    const isEditMode = mode === "edit";

    // Khi mở dialog ở chế độ sửa → điền dữ liệu cũ vào form
    useEffect(() => {
        if (open && isEditMode && transaction) {
            setTransactionType(transaction.type);
            setAmount(transaction.amount);
            setDate(new Date(transaction.date).toISOString().split("T")[0]);
            setDescription(transaction.description);
            setCategory(transaction.categoryId);

            setErrors({});
        }
        // Khi mở dialog ở chế độ thêm → reset form
        if (open && !isEditMode) {
            setTransactionType("expense");
            setAmount("");
            setDate(new Date().toISOString().split("T")[0]);
            setDescription("");
            setCategory("");

            setErrors({});
        }
    }, [open, isEditMode, transaction])

    // Xóa lỗi khi dialog đóng/mở
    useEffect(() => {
        if (!open) {
            setErrors({})
        }
    }, [open])

    // Hàm Validate
    const validateForm = () => {
        const newErrors = {}

        // Validate Số tiền: Không được rỗng, phải là số và lớn hơn 0
        if (!amount) {
            newErrors.amount = "Vui lòng nhập số tiền."
        } else if (isNaN(amount) || Number(amount) <= 0) {
            newErrors.amount = "Số tiền phải lớn hơn 0."
        }

        // Validate Mô tả: Không được rỗng hoặc chỉ chứa khoảng trắng
        if (!description || description.trim() === "") {
            newErrors.description = "Vui lòng nhập mô tả giao dịch."
        } else if (description.trim().length > 200) {
            newErrors.description = "Mô tả không được vượt quá 200 ký tự."
        }

        // Validate Danh mục: Phải được chọn
        if (!category) {
            newErrors.category = "Vui lòng chọn danh mục."
        }

        // Validate Ngày: Phải hợp lệ
        if (!date) {
            newErrors.date = "Vui lòng chọn ngày."
        }

        setErrors(newErrors)

        // Nếu object newErrors không có key nào (length === 0) => Form hợp lệ (true)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Chạy hàm validate, nếu có lỗi thì dừng lại không chạy tiếp
        if (!validateForm()) {
            return
        }

        setIsSubmitting(true);

        try {
            if (!isEditMode) {
                await dispatch(createTransaction({
                    type: transactionType,
                    amount: Number(amount),
                    description: description,
                    category: category,
                    date: new Date(date).toISOString()
                })).unwrap();

                toast.success("Thêm thành công!", {
                    description: `Giao dịch ${amount}₫ đã được ghi nhận.`,
                })
            } else {
                await dispatch(updateTransaction({
                        id: transaction.id,
                        transaction: {
                            type: transactionType,
                            amount: Number(amount),
                            description: description,
                            category: category,
                            date: new Date(date).toISOString()
                        }
                    }
                )).unwrap();

                toast.success("Cập nhật thành công!", {
                    description: `Giao dịch ${description} đã được cập nhật.`,
                })
            }

            setAmount("")
            setDescription("")
            setCategory("")
            setDate(new Date().toISOString().split("T")[0])
            setErrors({})
            onOpenChange(false)

        } catch (error) {
            toast.error("Lỗi hệ thống!", {
                description: error || "Không thể thêm giao dịch lúc này. Vui lòng thử lại sau.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
    <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Sửa giao dịch" : "Thêm giao dịch mới"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? "Chỉnh sửa thông tin giao dịch bên dưới."
                            : "Nhập thông tin để tạo giao dịch mới."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} noValidate> {/* noValidate để tắt tooltip mặc định của HTML */}
                    <div className="grid gap-4 py-4">
                        <RadioGroup value={transactionType} onValueChange={setTransactionType}
                                    className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 rounded-md border p-3">
                                <RadioGroupItem value="expense" id="expense"
                                                className="border-emerald-600 text-emerald-600"/>
                                <Label htmlFor="expense" className="flex-1">
                                    Chi tiêu
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 rounded-md border p-3">
                                <RadioGroupItem value="income" id="income"
                                                className="border-emerald-600 text-emerald-600"/>
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
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {symbol}
                                </span>
                                    <Input
                                        id="amount"
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(e.target.value)
                                            if (errors.amount) setErrors({...errors, amount: null}) // Xóa lỗi khi người dùng bắt đầu nhập
                                        }}
                                        className={`pl-7 ${errors.amount ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                                        placeholder="0"
                                        type="number"
                                        step="0.01"
                                    />
                                </div>
                                {errors.amount && <p className="text-rose-500 text-xs mt-1">{errors.amount}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Mô tả
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="description"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                        if (errors.description) setErrors({...errors, description: null})
                                    }}
                                    className={errors.description ? "border-rose-500 focus-visible:ring-rose-500" : ""}
                                    placeholder="Giao dịch này dùng cho việc gì?"
                                />
                                {errors.description &&
                                    <p className="text-rose-500 text-xs mt-1">{errors.description}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Danh mục
                            </Label>
                            <div className="col-span-3">
                                <div className="flex gap-1">
                                    <Select
                                        value={category}
                                        onValueChange={(val) => {
                                            setCategory(val)
                                            if (errors.category) setErrors({...errors, category: null})
                                        }}
                                    >
                                        <SelectTrigger id="category"
                                                       className={`max-w-full ${errors.category ? "border-rose-500 focus:ring-rose-500" : ""}`}>
                                            <SelectValue placeholder="Chọn danh mục"/>
                                        </SelectTrigger>
                                        <SelectContent
                                            position="popper"
                                            align="start"
                                            className="max-w-full"
                                        >
                                            {categories && categories.length > 0 ? (
                                                categories.map(c => (
                                                    <SelectItem key={c.id} value={c.id}>
                                                        {c.categoryName}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="none" disabled>Không có danh mục nào</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        onClick={() => setIsAddCategoryOpen(true)}
                                        type="button"
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                    >
                                        <PlusIcon className="h-4 w-4"/>
                                        Thêm danh mục
                                    </Button>
                                </div>
                                {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Ngày
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value)
                                        if (errors.date) setErrors({...errors, date: null})
                                    }}
                                    className={errors.date ? "border-rose-500 focus-visible:ring-rose-500" : ""}
                                />
                                {errors.date && <p className="text-rose-500 text-xs mt-1">{errors.date}</p>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Hủy
                        </Button>
                        <Button
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Đang xử lý..." : isEditMode ? "Lưu thay đổi" : "Thêm"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        {/* Dialog Thêm / Sửa */}
        <AddCategoryDialog
            open={isAddCategoryOpen}
            onOpenChange={setIsAddCategoryOpen}
        />
    </>
    )
}

export {AddTransactionDialog}
export default AddTransactionDialog