import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import TransactionList from "@/features/transactions/components/TransactionList.jsx";

const RecentTransactions = () => {
    return (
        <Card className="h-full pt-4 sm:pt-6 pb-6 sm:pb-9 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="space-y-1 px-4 sm:px-6 pt-0">
                <CardTitle className="text-lg sm:text-2xl font-bold tracking-tight">
                    Giao dịch gần đây
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground">
                    Các hoạt động tài chính mới nhất của bạn
                </p>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
                <TransactionList limit={7}/>
            </CardContent>
        </Card>
    )
}

export default RecentTransactions