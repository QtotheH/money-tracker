import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardCards,
  selectDashboardCards,
  getCardsStatus,
} from "@/store/slices/dashboardSlice";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { selectAllTransactions } from "@/store/slices/transactionSlice";

export const useDashboardCardsData = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const transactions = useSelector(selectAllTransactions);      

  const dashboardData = useSelector(selectDashboardCards) || {
    balance: 0,
    income: 0,
    expense: 0,
    savingsRate: 0,
  };

  const status = useSelector(getCardsStatus) || "idle";
  const isLoading = status === "loading";

  useEffect(() => {
    if (currentUser?.id && status === "idle") {
      dispatch(fetchDashboardCards(currentUser.id));
    }
  }, [currentUser?.id, status, dispatch, transactions]); 

  return { ...dashboardData, isLoading };
};
