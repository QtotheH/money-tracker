import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
const CurrencySelect = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-lg">Tiền tệ</p>
        <p className="text-muted-foreground">
          Chọn loại tiền tệ bạn muốn sử dụng
        </p>
      </div>
      <Select defaultValue="vnd">
        <SelectTrigger className="max-w-65">
          <SelectValue placeholder="VNĐ"></SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="vnd">Việt Nam Đồng (₫)</SelectItem>
            <SelectItem value="usd">USD ($)</SelectItem>
            <SelectItem value="eur">Euro (€)</SelectItem>
            <SelectItem value="gbp">Bảng Anh (£)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      
    </div>
  );
};

export default CurrencySelect;
