import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddGoalModal = ({ open, setOpen }) => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

  

  const handleAddGoal = () => {
    if (!goalName || !targetAmount || !targetDate) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
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
          <div className="flex items-center gap-4">
            <label className="w-52 text-sm font-medium">Tên mục tiêu:</label>
            <Input
              type="text"
              placeholder="Vd: Xe mới, shopping, ..."
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
            ></Input>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-52 text-sm font-medium">
              Số tiền mục tiêu:
            </label>
            <Input
              type="number"
              placeholder="Vd: 0 VND"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            ></Input>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-52 text-sm font-medium">
              Số tiền hiện tại:
            </label>
            <Input
              type="number"
              placeholder="Vd: 0 VND"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
            ></Input>
          </div>
          <div className="flex items-center gap-4">
            <label className="w-52 text-sm font-medium">Ngày hoàn thành:</label>
            <Input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            ></Input>
          </div>
        </div>

        {/* 2 nút button */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
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
  );
};

export default AddGoalModal;
