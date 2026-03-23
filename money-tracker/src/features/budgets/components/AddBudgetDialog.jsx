import {useEffect, useMemo, useState} from "react"
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
import {createBudget} from "@/store/slices/budgetSlice.js";
import {useDispatch} from "react-redux";
import {toast} from "sonner";
import {useCurrency} from "@/hooks/useCurrency.js";

const AddBudgetDialog = ({
                             isOpen,
                             onClose,
                             categories = [],
                             existingCategoryIds = [],
                         }) => {
    const dispatch = useDispatch();

    const { symbol } = useCurrency();

    const [categoryId, setCategoryId] = useState("")
    const [amount, setAmount] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    //  chuẩn hóa mọi phần tử trong mảng thành string
    const normalizedExisting = useMemo(
        () => existingCategoryIds.map(String),
        [existingCategoryIds]
    );

    // kiểm tra xem category đó đã được tạo budget chưa?
    const isDuplicate = categoryId ? normalizedExisting.includes(String(categoryId)) : false;

    // Reset lỗi khi đóng/mở Dialog
    useEffect(() => {
        if (!isOpen) {
            setErrors({});
            setCategoryId("");
            setAmount("");
        }
    }, [isOpen]);

    // Hàm Validate
    const validateForm = () => {
        const newErrors = {};

        // Validate Danh mục
        if (!categoryId) {
            newErrors.categoryId = "Vui lòng chọn danh mục.";
        } else if (isDuplicate) {
            newErrors.categoryId = "Danh mục này đã có ngân sách. Hãy chọn danh mục khác.";
        }

        // Validate Số tiền
        if (!amount) {
            newErrors.amount = "Vui lòng nhập số tiền.";
        } else if (isNaN(amount) || Number(amount) <= 0) {
            newErrors.amount = "Số tiền phải lớn hơn 0.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Gọi hàm validate trước khi submit
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await dispatch(createBudget({
                categoryId,
                total: amount
            })).unwrap();

            toast.success("Tạo ngân sách thành công!", {
                description: `Ngân sách mới đã được thiết lập.`,
            });

            setCategoryId("")
            setAmount("")
            setErrors({});
            onClose()
        } catch (error) {
            toast.error("Lỗi hệ thống!", {
                description: error || "Không thể tạo ngân sách lúc này."
            });
        } finally {
            setIsSubmitting(false);
        }
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

                <form onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category">Danh mục</Label>
                            <div className="col-span-3">
                                <Select
                                    value={categoryId}
                                    onValueChange={(val) => {
                                        setCategoryId(val);
                                        // Xóa lỗi khi người dùng chọn lại danh mục
                                        if (errors.categoryId) setErrors({ ...errors, categoryId: null });
                                    }}
                                >
                                    <SelectTrigger
                                        id="category"
                                        className={`w-full ${errors.categoryId ? "border-rose-500 focus:ring-rose-500" : ""}`}
                                    >
                                        <SelectValue placeholder="Chọn danh mục" />
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
                                {errors.categoryId && <p className="text-rose-500 text-xs mt-1">{errors.categoryId}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount">Số tiền</Label>
                            <div className="col-span-3">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                                        {symbol}
                                    </span>
                                    <Input
                                        id="amount"
                                        className={`pl-7 ${errors.amount ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                                        placeholder="0"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                            // Xóa lỗi khi người dùng bắt đầu nhập lại
                                            if (errors.amount) setErrors({ ...errors, amount: null });
                                        }}
                                    />
                                </div>
                                {errors.amount && <p className="text-rose-500 text-xs mt-1">{errors.amount}</p>}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            {isSubmitting ? "Đang xử lý..." : "Thêm ngân sách"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddBudgetDialog
