import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import {useDispatch} from "react-redux";
import {useCurrency} from "@/hooks/useCurrency.js";
import {useCurrencies} from "@/hooks/useCurrencies.js";
import {syncCurrencyToDB} from "@/store/slices/authSlice.js";
import {toast} from "sonner";
const CurrencySelect = () => {
  const dispatch = useDispatch();

  // Lấy currencyCode hiện tại của user
  const { currencyCode } = useCurrency();

  // Lấy danh sách currencies từ db
  const { currencies, isLoading } = useCurrencies();

  const handleCurrencyChange = async (newCode) => {
    try {
      await dispatch(syncCurrencyToDB(newCode)).unwrap();
      toast.success("Cập nhật thành công!");
    } catch (error) {
      console.error("Có lỗi khi cập nhật đơn vị tiền tệ: ", error);
      toast.error("Lỗi cập nhật!");
    }
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-medium text-lg">Tiền tệ</p>
        <p className="text-muted-foreground">
          Chọn loại tiền tệ bạn muốn sử dụng
        </p>
      </div>
      <Select value={currencyCode} onValueChange={handleCurrencyChange} disabled={isLoading}>
        <SelectTrigger className="w-full md:max-w-65">
          <SelectValue
              placeholder={isLoading ? "Đang tải..." : "Chọn tiền tệ"}>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {currencies.map(currency =>
              <SelectItem key={currency.id} value={currency.code}>
                {currency.name} ({currency.symbol})
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelect;
