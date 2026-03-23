import {useSelector} from "react-redux";
import {getCategoriesStatus, selectCategoriesItems} from "@/store/slices/categorySlice.js";
import {getBudgetsStatus, selectBudgetsWithCategories} from "@/store/slices/budgetSlice.js";
import {getTransactionsStatus} from "@/store/slices/transactionSlice.js";

export const useBudgetsData = () => {
    // Lấy dữ liệu
    const budgetsWithCategory = useSelector(selectBudgetsWithCategories) || [];
    const categories = useSelector(selectCategoriesItems) || [];

    // Lấy trạng thái
    const budgetStatus = useSelector(getBudgetsStatus);
    const categoryStatus = useSelector(getCategoriesStatus);
    const transactionStatus = useSelector(getTransactionsStatus);

    // Gom trạng thái loading lại thành 1 biến duy nhất cho dễ dùng
    const isLoading = budgetStatus === 'loading' || categoryStatus === 'loading' || transactionStatus === 'loading';

    // Trả ra những dữ liệu mà Component cần
    return {
        budgetsWithCategory,
        categories,
        isLoading
    };
}