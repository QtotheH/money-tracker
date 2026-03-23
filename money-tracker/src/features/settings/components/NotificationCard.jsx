import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, syncAlertSettingsToDB} from "@/store/slices/authSlice.js";
import {toast} from "sonner";

const NotificationCard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const handleToggle = async (type, value) => {
      try {
        await dispatch(syncAlertSettingsToDB({ type, value })).unwrap();
      } catch (error) {
        toast.error("Lỗi cập nhật!", { description: error });
      }
  }

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-2xl">Thông báo</CardTitle>
        <CardDescription>Quản lý thông báo yêu thích của bạn</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-lg">Thông báo ngân sách</p>
            <p className="text-muted-foreground">
              Nhận thông báo khi bạn sắp đạt đến giới hạn ngân sách
            </p>
          </div>
          <div>
            <Switch
                checked={user?.settings?.budgetsAlert || false}
                onCheckedChange={(val) => handleToggle("budgetsAlert", val)}
                className="data-[state=checked]:bg-green-600"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-lg">Nhắc nhở đạt mục tiêu</p>
            <p className="text-muted-foreground">
              Nhận thông báo nhắc nhở khi sắp đạt mục tiêu tiết kiệm
            </p>
          </div>
          <div>
            <Switch
                checked={user?.settings?.goalsAlert || false}
                onCheckedChange={(val) => handleToggle("goalsAlert", val)}
                className="data-[state=checked]:bg-green-600"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
