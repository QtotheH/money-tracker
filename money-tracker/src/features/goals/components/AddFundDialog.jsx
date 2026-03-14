import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const AddFundDialog = ({ open, setOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={setOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Thêm tiền</DialogTitle>
          <DialogDescription>
            Hãy thêm vào số tiền mà bạn muốn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <label className="w-20 font-medium text-sm">Số tiền</label>
            <Input
              type="number"
              placeHolder="VD: 10000"
              className="w-65"
            ></Input>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpenChange(false)}>
            Hủy
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Thêm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundDialog;
