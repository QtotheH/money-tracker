import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label.jsx";
import {cn} from "@/lib/utils.js";
import IconPicker from "@/features/categories/components/IconPicker.jsx";
import {useDispatch} from "react-redux";
import {createGoal} from "@/store/slices/goalSlice.js";
import {toast} from "sonner";

const AddGoalDialog = ({open, setOpenChange}) => {
    const dispatch = useDispatch();

    const [goalName, setGoalName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [currentAmount, setCurrentAmount] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

    // State xử lý form
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset states khi mở dialog (component được mount)
    useEffect(() => {
        if (!open) {
            setGoalName("");
            setTargetAmount("");
            setCurrentAmount("");
            setTargetDate("");
            setSelectedIcon(null);
            setErrors({});
        }
    }, [open]);

    const validateForm = () => {
        const newErrors = {};
        if (!goalName.trim()) {
            newErrors.goalName = "Vui lòng nhập tên mục tiêu.";
        }
        if (!targetAmount || isNaN(targetAmount) || Number(targetAmount) <= 0) {
            newErrors.targetAmount = "Số tiền mục tiêu phải > 0.";
        }
        if (currentAmount && isNaN(currentAmount)) {
            newErrors.currentAmount = "Số tiền hiện tại không hợp lệ.";
        }
        if (!targetDate) {
            newErrors.targetDate = "Vui lòng chọn ngày hoàn thành.";
        }
        if (!selectedIcon) {
            newErrors.icon = "Vui lòng chọn biểu tượng.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddGoal = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await dispatch(createGoal({
                name: goalName,
                target: targetAmount,
                current: currentAmount || 0,
                targetDate: targetDate,
                iconClass: selectedIcon.className,
                iconName: selectedIcon.name
            })).unwrap();

            toast.success("Thêm thành công!", {description: `Mục tiêu "${goalName}" đã được tạo.`});
            setOpenChange(false);
        } catch (error) {
            toast.error("Lỗi hệ thống!", {description: error});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpenChange}>
                <DialogContent className="sm:max-w-[600px]">
                    {/* HEADER DIALOG */}
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Thêm mục tiêu tiết kiệm
                        </DialogTitle>
                        <DialogDescription>
                            Tạo mục tiêu tài chính mới để theo dõi tiến trình của bạn
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleAddGoal} noValidate>
                        <div className="space-y-5 mt-3">
                            {/* Tên mục tiêu */}
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="goalName" className="mt-3 font-medium">
                                    Tên mục tiêu:
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="goalName"
                                        value={goalName}
                                        onChange={(e) => {
                                            setGoalName(e.target.value);
                                            if (errors.goalName) setErrors({...errors, goalName: null});
                                        }}
                                        className={errors.goalName ? "border-rose-500" : ""}
                                        placeholder="Ví dụ: Du lịch, Mua nhà"
                                    />
                                    {errors.goalName && <p className="text-rose-500 text-xs mt-1">{errors.goalName}</p>}
                                </div>
                            </div>

                            {/* Icon */}
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="mt-3 font-medium">Icon:</Label>
                                <div className="col-span-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn("flex items-center justify-center w-10 h-10 rounded-lg border", selectedIcon ? "bg-emerald-50 border-emerald-300" : "bg-slate-50 border-dashed border-slate-300", errors.icon && !selectedIcon ? "border-rose-500 bg-rose-50" : "")}>
                                            {selectedIcon ?
                                                <i className={cn(selectedIcon.className, "text-lg text-emerald-600")}></i> :
                                                <i className="fa-solid fa-question text-slate-400"></i>}
                                        </div>
                                        <Button type="button" variant="outline"
                                                onClick={() => setIsIconPickerOpen(true)}
                                                className={cn("flex-1", errors.icon ? "border-rose-500 text-rose-500" : "")}>
                                            <i className="fa-solid fa-icons mr-2"></i> {selectedIcon ? `Đã chọn: ${selectedIcon.name}` : "Chọn icon"}
                                        </Button>
                                    </div>
                                    {errors.icon && <p className="text-rose-500 text-xs mt-1">{errors.icon}</p>}
                                </div>
                            </div>

                            {/* Tiền hiện tại */}
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="current-amount" className="mt-3">Tiền hiện tại:</Label>
                                <div className="col-span-3">
                                    <div className="relative">
                                        <span
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                            ₫
                                        </span>
                                        <Input
                                            id="current-amount"
                                            className={`pl-7 ${errors.currentAmount ? "border-rose-500" : ""}`}
                                            type="number"
                                            min="0"
                                            value={currentAmount}
                                            placeholder={0}
                                            onChange={(e) => {
                                                setCurrentAmount(e.target.value);
                                                if (errors.currentAmount) setErrors({...errors, currentAmount: null})
                                            }}
                                        />
                                    </div>
                                    {errors.currentAmount &&
                                        <p className="text-rose-500 text-xs mt-1">{errors.currentAmount}</p>}
                                </div>
                            </div>

                            {/* Tiền mục tiêu */}
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="target-amount" className="mt-3">
                                    Tiền mục tiêu:
                                </Label>
                                <div className="col-span-3">
                                    <div className="relative">
                                        <span
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                            ₫
                                        </span>
                                        <Input
                                            id="target-amount"
                                            className={`pl-7 ${errors.targetAmount ? "border-rose-500" : ""}`}
                                            type="number"
                                            min="0"
                                            value={targetAmount}
                                            placeholder={0}
                                            onChange={(e) => {
                                                setTargetAmount(e.target.value);
                                                if (errors.targetAmount) setErrors({...errors, targetAmount: null})
                                            }}
                                        />
                                    </div>
                                    {errors.targetAmount &&
                                        <p className="col-span-3 text-rose-500 text-xs mt-1">{errors.targetAmount}</p>}
                                </div>
                            </div>

                            {/* Ngày */}
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="target-date" className="mt-3 font-medium">
                                    Ngày mục tiêu:
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="target-date"
                                        className={errors.targetDate ? "border-rose-500" : ""}
                                        type="date" value={targetDate}
                                        onChange={(e) => {
                                            setTargetDate(e.target.value);
                                            if (errors.targetDate) setErrors({...errors, targetDate: null});
                                        }}
                                    />
                                    {errors.targetDate &&
                                        <p className="text-rose-500 text-xs mt-1">{errors.targetDate}</p>}
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => setOpenChange(false)}
                                    disabled={isSubmitting}>Hủy</Button>
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                    disabled={isSubmitting}>
                                {isSubmitting ? "Đang xử lý..." : "Thêm"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Phần thông tin
                    <div className="space-y-5 mt-3">
                        <div className="grid grid-cols-4 items-r gap-4">
                            <Label htmlFor="goalName" className="text-right font-medium">Tên mục tiêu:</Label>
                            <Input
                                id="goalName"
                                value={goalName}
                                onChange={(e) => setGoalName(e.target.value)}
                                className="col-span-3"
                                placeholder="Ví dụ: Du lịch, Mua nhà"
                                required
                            />
                        </div>

                        Chọn icon
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-medium">Icon:</Label>
                            <div className="col-span-3 flex items-center gap-3">
                                Hiển thị icon đã chọn
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

                                Nút mở Icon Picker
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

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="current-amount" className="text-right">Số tiền hiện tại:</Label>
                            <div className="col-span-3 relative">
                                <span
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₫</span>
                                <Input
                                    id="current-amount"
                                    className="pl-7"
                                    placeholder="0"
                                    type="number"
                                    min="0"
                                    value={currentAmount}
                                    onChange={(e) => setCurrentAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="target-amount" className="text-right">Số tiền mục tiêu:</Label>
                            <div className="col-span-3 relative">
                                <span
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₫</span>
                                <Input
                                    id="target-amount"
                                    className="pl-7"
                                    placeholder="0"
                                    type="number"
                                    min="0"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="target-date" className="text-right font-medium">
                                Ngày hoàn thành:
                            </Label>
                            <Input
                                id="target-date"
                                className="col-span-3"
                                type="date"
                                value={targetDate}
                                onChange={(e) => setTargetDate(e.target.value)}
                            ></Input>
                        </div>
                    </div>

                    2 nút button
                    <div className="flex justify-end gap-2 mt-6">
                        <Button variant="outline" onClick={() => setOpenChange(false)}>
                            Hủy
                        </Button>
                        <Button
                            onClick={handleAddGoal}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            Thêm
                        </Button>
                    </div>
                </DialogContent>
            </Dialog> */}
            {/* Icon Picker Dialog (mở chồng lên) */}
            <IconPicker
                open={isIconPickerOpen}
                onOpenChange={setIsIconPickerOpen}
                onSelectIcon={(icon) => {
                    setSelectedIcon(icon);
                    if (errors.icon) setErrors({...errors, icon: null});
                }}
                selectedIcon={selectedIcon}
            />
        </>
    );
};

export default AddGoalDialog;
