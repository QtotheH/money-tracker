import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useDispatch} from "react-redux";
import {toast} from "sonner";
import {addGoalFund} from "@/store/slices/goalSlice.js";
import {Label} from "@/components/ui/label.jsx";
import {useCurrency} from "@/hooks/useCurrency.js";

const AddFundDialog = ({open, setOpenChange, goalId}) => {
    const dispatch = useDispatch();

    const { symbol } = useCurrency();

    const [amount, setAmount] = useState("");

    // State xử lý form
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset states khi mở dialog (component được mount)
    useEffect(() => {
        if (!open) {
            setAmount("");
            setErrors({});
        }
    }, [open]);

    const validateForm = () => {
        const newErrors = {};
        console.log(amount)
        if (!amount) {
            newErrors.amount = "Vui lòng nhập số tiền!";
        } else if (amount && isNaN(amount)) {
            newErrors.amount = "Số tiền không hợp lệ.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true)

        try {
            await dispatch(addGoalFund({
                id: goalId,
                amount,
            })).unwrap();

            toast.success("Thêm thành công!", {description: `Số tiền "${amount}" đã được thêm.`});
            setOpenChange(false);
        } catch (error) {
            toast.error("Lỗi hệ thống!", {description: error});
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Thêm tiền</DialogTitle>
                    <DialogDescription>
                        Hãy thêm vào số tiền mà bạn muốn
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-6">
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="amount" className="mt-3">
                                Số tiền:
                            </Label>
                            <div className="col-span-3">
                                <div className="relative">
                                        <span
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                                            {symbol}
                                        </span>
                                    <Input
                                        id="amount"
                                        className={`pl-7 ${errors.amount ? "border-rose-500" : ""}`}
                                        type="number"
                                        min="0"
                                        value={amount}
                                        placeholder={0}
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                            if (errors.amount) setErrors({...errors, amount: null})
                                        }}
                                    />
                                </div>
                                {errors.amount &&
                                    <p className="col-span-3 text-rose-500 text-xs mt-1">{errors.amount}</p>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            disabled={isSubmitting}
                        >
                            Thêm
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddFundDialog;
