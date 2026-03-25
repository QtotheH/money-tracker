import BalanceCardItem from "@/features/dashboard/components/BalanceCardItem.jsx";
import { Wallet, ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency.js";
import { selectDashboardCards } from "@/store/slices/transactionSlice";
import { useSelector } from "react-redux";

const BalanceCardList = () => {
  const {balance, income, expense, savingsRate} = useSelector(selectDashboardCards) || {
    balance: 0,
    income: 0,
    expense: 0,
    savingsRate: 0,
  };
  const { formatMoney } = useCurrency();

  const cards = [
    {
      title: "Tổng số dư",
      value: formatMoney(balance),
      icon: Wallet,
      color: "text-emerald-600",
    },
    {
      title: "Thu nhập",
      value: formatMoney(income),
      icon: ArrowUp,
      color: "text-emerald-600",
    },
    {
      title: "Chi tiêu",
      value: formatMoney(expense),
      icon: ArrowDown,
      color: "text-red-500",
    },
    {
      title: "Tỷ lệ tiết kiệm",
      value: `${savingsRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card, i) => (
        <BalanceCardItem key={i} card={card} />
      ))}
    </div>
  );
};

export default BalanceCardList;
