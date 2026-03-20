import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, getCategoriesStatus, selectCategoriesItems} from "@/store/slices/categorySlice.js";
import {fetchBudgets, getBudgetsStatus, selectBudgetsWithCategories} from "@/store/slices/budgetSlice.js";
import {fetchAllTransactions, getTransactionsStatus} from "@/store/slices/transactionSlice.js";
import {useEffect} from "react";

export const useBudgetsData = () => {
    const dispatch = useDispatch();

    // Lấy dữ liệu
    const budgetsWithCategory = useSelector(selectBudgetsWithCategories) || [];
    const categories = useSelector(selectCategoriesItems) || [];

    // Lấy trạng thái
    const budgetStatus = useSelector(getBudgetsStatus);
    const categoryStatus = useSelector(getCategoriesStatus);
    const transactionStatus = useSelector(getTransactionsStatus);

    // Tự động gọi API nếu chưa có dữ liệu
    useEffect(() => {
        if (budgetStatus === 'idle') dispatch(fetchBudgets());
        if (categoryStatus === 'idle') dispatch(fetchCategories());
        if (transactionStatus === 'idle') dispatch(fetchAllTransactions());
    }, [budgetStatus, categoryStatus, transactionStatus, dispatch]);

    // Gom trạng thái loading lại thành 1 biến duy nhất cho dễ dùng
    const isLoading = budgetStatus === 'loading' || categoryStatus === 'loading' || transactionStatus === 'loading';

    // Trả ra những dữ liệu mà Component cần
    return {
        budgetsWithCategory,
        categories,
        isLoading
    };
}