import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label.jsx";
import {cn} from "@/lib/utils.js";
import IconPicker from "@/features/categories/components/IconPicker.jsx";

const AddGoalDialog = ({open, setOpenChange}) => {
    const [goalName, setGoalName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [currentAmount, setCurrentAmount] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);


    const handleAddGoal = () => {
        if (!goalName || !targetAmount || !targetDate) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        setOpenChange(false);
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

                    {/* Phần thông tin */}
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

                        {/* Chọn icon */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-medium">Icon:</Label>
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
                                    onChange={(e) => setTargetDate(e.target.value)}
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

                    {/* 2 nút button */}
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
            </Dialog>
            {/* Icon Picker Dialog (mở chồng lên) */}
            <IconPicker
                open={isIconPickerOpen}
                onOpenChange={setIsIconPickerOpen}
                onSelectIcon={setSelectedIcon}
                selectedIcon={selectedIcon}
            />
        </>
    );
};

export default AddGoalDialog;
