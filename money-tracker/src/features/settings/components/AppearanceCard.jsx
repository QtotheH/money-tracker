import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import CurrencySelect from "@/features/settings/components/CurrencySelect";
import { Toggle } from "@/components/ui/toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";

const AppearanceCard = () => {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-2xl">Appearance</CardTitle>
        <CardDescription>
          Tùy chỉnh giao diện và trải nghiệm của người dùng
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-lg">Màn hình</p>
            <p className="text-muted-foreground">Chọn chế độ sáng hoặc tối</p>
          </div>

          <div>
            <Toggle className="border-1">
              <FontAwesomeIcon icon={faSun} />
            </Toggle>
          </div>
        </div>
        <CurrencySelect />
      </CardContent>
    </Card>
  );
};

export default AppearanceCard;
