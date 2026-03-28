import {useMemo, useState} from "react"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import TransactionItem from "@/features/transactions/components/TransactionItem.jsx";
import {useNavigate} from "react-router";
import { useSelector} from "react-redux";
import {
    selectTransactionsWithCategories
} from "@/store/slices/transactionSlice.js";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll.js";
import LoadMore from "@/components/common/LoadMore.jsx";

function TransactionList({limit, showAll = false, onEdit}) {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("all")

    const transactionsWithCategory = useSelector(selectTransactionsWithCategories) || [];

    // BỌC TOÀN BỘ LOGIC LỌC VÀO useMemo
    const limitedTransactions = useMemo(() => {
        // B1: Lọc
        const filtered = transactionsWithCategory.filter((transaction) => {
            const matchesSearch =
                transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.category.categoryName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = filterType === "all" || transaction.type === filterType;

            return matchesSearch && matchesType;
        });

        // B2: Cắt limit (nếu có)
        return limit ? filtered.slice(0, limit) : filtered;

    }, [transactionsWithCategory, searchTerm, filterType, limit]); // CHỈ TÍNH TOÁN LẠI KHI CÁC BIẾN NÀY THAY ĐỔI

    // Custom hook infinite scroll
    // mỗi lần cuộn sẽ tải thêm 10 items
    const {visibleItems, hasMore, loadMoreRef} = useInfiniteScroll(limitedTransactions);

    if (transactionsWithCategory.length === 0) {
        return <p className="text-center py-4 text-sm text-muted-foreground">Chưa có giao dịch nào.</p>;
    }

    return (
        <div className="space-y-4">
            {showAll && (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Input
                        placeholder="Tìm giao dịch..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:flex-1 sm:max-w-[250px] text-xs sm:text-sm"
                    />
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-full sm:w-auto sm:max-w-[180px] text-xs sm:text-sm">
                            <SelectValue placeholder="Lọc theo loại"/>
                        </SelectTrigger>
                        <SelectContent
                            position="popper"
                            align="start"
                            className="w-[var(--radix-select-trigger-width)]"
                        >
                            <SelectItem value="all">Tất cả giao dịch</SelectItem>
                            <SelectItem value="income">Chỉ thu nhập</SelectItem>
                            <SelectItem value="expense">Chỉ chi tiêu</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}

            <div
                className={`space-y-2 sm:space-y-3 ${showAll && 'max-h-[500px] md:max-h-[450px]'} overflow-y-auto pr-2 custom-scrollbar`}>
                {visibleItems.map(transaction =>
                    <TransactionItem key={transaction.id} transaction={transaction} onEdit={onEdit}/>
                )}
                {hasMore && (
                    <LoadMore loadMoreRef={loadMoreRef}/>
                )}
            </div>

            {limit && transactionsWithCategory.length > limit && (
                <div className="flex justify-center mt-8 sm:mt-10">
                    <Button onClick={() => navigate("/transactions")} variant="outline" className="w-full sm:w-auto">Xem
                        tất cả giao dịch</Button>
                </div>
            )}
        </div>
    )
}

export default TransactionList