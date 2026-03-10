import {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.jsx";
import {Input} from "@/components/ui/input.jsx";
import {cn} from "@/lib/utils.js";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import IconPicker from "@/features/categories/components/IconPicker.jsx";


/**
 * Dialog Thêm / Sửa danh mục.
 *
 * Props:
 *   - open: boolean          → Dialog đang mở hay không
 *   - onOpenChange: function → Hàm đóng/mở dialog
 *   - mode: "add" | "edit"   → Chế độ thêm hoặc sửa
 *   - category: object|null  → Dữ liệu danh mục cần sửa (null nếu mode = "add")
 *                               { id, categoryName, iconClass }
 */
const AddCategoryDialog = ({ open, onOpenChange, mode = "add", category = null }) => {
    const [categoryName, setCategoryName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null); // { name, className }
    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

    const isEditMode = mode === "edit";

    // Khi mở dialog ở chế độ sửa → điền dữ liệu cũ vào form
    useEffect(() => {
        if (open && isEditMode && category) {
            setCategoryName(category.categoryName || "")
            setSelectedIcon(
                category.iconClass
                    ? { name: category.iconName || "", className: category.iconClass }
                    : null
            )
        }
        // Khi mở dialog ở chế độ thêm → reset form
        if (open && !isEditMode) {
            setCategoryName("")
            setSelectedIcon(null)
        }
    }, [open, isEditMode, category])

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            categoryName,
            iconClass: selectedIcon?.className || "",
            iconName: selectedIcon?.name || "",
        }

        if (isEditMode) {
            // TODO: Gọi API hoặc dispatch Redux action để cập nhật
            console.log("Cập nhật danh mục:", { id: category?.id, ...data })
        } else {
            // TODO: Gọi API hoặc dispatch Redux action để thêm mới
            console.log("Thêm danh mục:", data)
        }

        // Reset form & đóng dialog
        setCategoryName("")
        setSelectedIcon(null)
        onOpenChange(false)
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

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-5 py-4">
                            {/* Tên danh mục */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="categoryName" className="text-right font-medium">
                                    Tên danh mục
                                </Label>
                                <Input
                                    id="categoryName"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Ví dụ: Ăn uống, Lương, ..."
                                    required
                                />
                            </div>

                            {/* Chọn icon */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right font-medium">Icon</Label>
                                <div className="col-span-3 flex items-center gap-3">
                                    {/* Hiển thị icon đã chọn */}
                                    <div
                                        className={cn(
                                            "flex items-center justify-center w-10 h-10 rounded-lg border",
                                            selectedIcon
                                                ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-300"
                                                : "bg-slate-50 dark:bg-slate-800 border-dashed border-slate-300"
                                        )}
                                    >
                                        {selectedIcon ? (
                                            <i className={cn(selectedIcon.className, "text-lg text-emerald-600")}></i>
                                        ) : (
                                            <i className="fa-solid fa-question text-slate-400"></i>
                                        )}
                                    </div>

                                    {/* Nút mở Icon Picker */}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsIconPickerOpen(true)}
                                        className="flex-1"
                                    >
                                        <i className="fa-solid fa-icons mr-2"></i>
                                        {selectedIcon ? `Đã chọn: ${selectedIcon.name}` : "Chọn icon"}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                {isEditMode ? "Lưu thay đổi" : "Thêm"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Icon Picker Dialog (mở chồng lên) */}
            <IconPicker
                open={isIconPickerOpen}
                onOpenChange={setIsIconPickerOpen}
                onSelectIcon={setSelectedIcon}
                selectedIcon={selectedIcon}
            />
        </>
    )
}
export default AddCategoryDialog
