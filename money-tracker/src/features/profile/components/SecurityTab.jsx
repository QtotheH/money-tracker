import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useSelector } from "react-redux";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {toast} from "sonner";
import {changePassword} from "@/store/slices/authSlice";
import { Save } from "lucide-react";



const SecurityTab = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate
  const validateForm = () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại.";
    }

    if (!newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    if (!user?.id) {
      toast.error("Không tìm thấy user!");
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(changePassword({
        currentPassword,
        newPassword
      })).unwrap();

      toast.success("Đổi mật khẩu thành công!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      toast.error("Đã xảy ra lỗi!", { description: error });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">

      <CardHeader>
        <CardTitle>Bảo mật</CardTitle>

        <p className="text-sm text-muted-foreground">
          Thay đổi mật khẩu của bạn
        </p>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <label className="text-sm font-medium">
            Mật khẩu hiện tại
          </label>

          <Input
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              if (errors.currentPassword) setErrors({ ...errors, currentPassword: null });
            }}
            type="password"
            className={`mt-1 ${errors.currentPassword ? "border-rose-500" : ""}`}
          />
          {errors.currentPassword && <p className="text-rose-500 text-xs mt-1">{errors.currentPassword}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">
            Mật khẩu mới
          </label>

          <Input
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (errors.newPassword) setErrors({ ...errors, newPassword: null });
            }}
            type="password"
            className={`mt-1 ${errors.newPassword ? "border-rose-500" : ""}`}
          />
          {errors.newPassword && <p className="text-rose-500 text-xs mt-1">{errors.newPassword}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">
            Xác nhận mật khẩu mới
          </label>

          <Input
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
            }}
            type="password"
            className={`mt-1 ${errors.confirmPassword ? "border-rose-500" : ""}`}
          />
          {errors.confirmPassword && <p className="text-rose-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        <Button
          onClick={handleChangePassword}
          disabled={isSubmitting}
          className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 dark:text-white"
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
        </Button>

      </CardContent>

    </Card>
  )
}

export default SecurityTab