import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner"; // 1. Import toast từ sonner

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.jsx";
import { Input } from "@/components/ui/input.jsx";
import { cn } from "@/lib/utils.js";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import IconPicker from "@/features/categories/components/IconPicker.jsx";
import { createCategory, updateCategory } from "@/store/slices/categorySlice.js";

const AddCategoryDialog = ({ open, onOpenChange, mode = "add", category = null }) => {
    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditMode = mode === "edit";

    useEffect(() => {
        if (open && isEditMode && category) {
            setCategoryName(category.categoryName || "")
            setSelectedIcon(
                category.iconClass
                    ? { name: category.iconName || "", className: category.iconClass }
                    : null
            )
            setErrors({}) // Reset lỗi
        }
        if (open && !isEditMode) {
            setCategoryName("")
            setSelectedIcon(null)
            setErrors({}) // Reset lỗi
        }
    }, [open, isEditMode, category])

    // Xóa lỗi khi dialog đóng/mở
    useEffect(() => {
        if (!open) {
            setErrors({})
        }
    }, [open])

    // Hàm validate trả về object errors
    const validateForm = () => {
        const newErrors = {};

        if (!categoryName.trim()) {
            newErrors.categoryName = "Vui lòng nhập tên danh mục.";
        }

        if (!selectedIcon?.name || !selectedIcon?.className) {
            newErrors.icon = "Vui lòng chọn icon cho danh mục.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            if (!isEditMode) {
                await dispatch(createCategory({ categoryName, selectedIcon })).unwrap();

                // Toast thành công
                toast.success("Thêm thành công!", {
                    description: `Danh mục "${categoryName}" đã được tạo.`,
                });
            } else {
                await dispatch(updateCategory({
                    id: category?.id,
                    categoryName,
                    selectedIcon,
                })).unwrap();

                toast.success("Cập nhật thành công!", {
                    description: `Danh mục "${categoryName}" đã được cập nhật.`,
                });
            }

            setCategoryName("");
            setSelectedIcon(null);
            setErrors({});
            onOpenChange(false);
        } catch (err) {
            // Toast thất bại
            toast.error("Lỗi hệ thống!", {
                description: err || (isEditMode ? "Cập nhật danh mục thất bại!" : "Thêm danh mục thất bại!"),
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditMode ? "Sửa danh mục" : "Thêm danh mục mới"}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditMode
                                ? "Chỉnh sửa thông tin danh mục bên dưới."
                                : "Nhập thông tin để tạo danh mục mới."}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Thêm noValidate để tắt tooltip trình duyệt */}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid gap-5 py-4">

                            {/* Tên danh mục */}
                            {/* Điều chỉnh grid để nhét thẻ <p> báo lỗi xuống dưới Input */}
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="categoryName" className="text-right mt-3 font-medium">
                                    Tên danh mục
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="categoryName"
                                        value={categoryName}
                                        onChange={(e) => {
                                            setCategoryName(e.target.value);
                                            // Xóa lỗi khi gõ lại
                                            if (errors.categoryName) setErrors({ ...errors, categoryName: null });
                                        }}
                                        className={errors.categoryName ? "border-rose-500 focus-visible:ring-rose-500" : ""}
                                        placeholder="Ví dụ: Ăn uống, Lương, ..."
                                    />
                                    {errors.categoryName && <p className="text-rose-500 text-xs mt-1">{errors.categoryName}</p>}
                                </div>
                            </div>

                            {/* Chọn icon */}
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right mt-3 font-medium">Icon</Label>
                                <div className="col-span-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                "flex items-center justify-center w-10 h-10 rounded-lg border",
                                                selectedIcon
                                                    ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-300"
                                                    : "bg-slate-50 dark:bg-slate-800 border-dashed border-slate-300",
                                                errors.icon && !selectedIcon ? "border-rose-500 bg-rose-50 dark:bg-rose-950" : ""
                                            )}
                                        >
                                            {selectedIcon ? (
                                                <i className={cn(selectedIcon.className, "text-lg text-emerald-600")}></i>
                                            ) : (
                                                <i className={cn("fa-solid fa-question", errors.icon ? "text-rose-500" : "text-slate-400")}></i>
                                            )}
                                        </div>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsIconPickerOpen(true)}
                                            className={cn("flex-1", errors.icon ? "border-rose-500 text-rose-500 hover:text-rose-600" : "")}
                                        >
                                            <i className="fa-solid fa-icons mr-2"></i>
                                            {selectedIcon ? `Đã chọn: ${selectedIcon.name}` : "Chọn icon"}
                                        </Button>
                                    </div>
                                    {errors.icon && <p className="text-rose-500 text-xs mt-1">{errors.icon}</p>}
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
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Đang xử lý..." : isEditMode ? "Lưu thay đổi" : "Thêm"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Icon Picker Dialog */}
            <IconPicker
                open={isIconPickerOpen}
                onOpenChange={setIsIconPickerOpen}
                onSelectIcon={(icon) => {
                    setSelectedIcon(icon);
                    // Xóa lỗi khi chọn icon xong
                    if (errors.icon) setErrors({ ...errors, icon: null });
                }}
                selectedIcon={selectedIcon}
            />
        </>
    )
}

export default AddCategoryDialog;
