import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/store/slices/authSlice.js";

// Từ điển symbol (Chạy ở client, không cần gọi API)
const CURRENCY_SYMBOLS = {
    vnd: "₫",
    usd: "$",
    eur: "€",
    gbp: "£",
    kwr: "₩",
    jpy: "¥",
    cny: "CN¥",
};

export const useCurrency = () => {
    const user = useSelector(selectCurrentUser);
    const currencyCode = user?.settings?.currency || "vnd";
    const symbol = CURRENCY_SYMBOLS[currencyCode] || "₫";

    const formatMoney = (amount) => {
        if (amount === undefined || amount === null) return `${symbol}0`;
        return `${symbol}${amount.toLocaleString()}`;
    };

    return {currencyCode, symbol, formatMoney};
};