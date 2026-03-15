import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import TransactionList from "@/features/transactions/components/TransactionList.jsx";

const RecentTransactions = () => {
    return (
        <Card className="pt-6 pb-9 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Giao dịch gần đây
                </CardTitle>
                <p className="text-[14px] text-muted-foreground">
                    Các hoạt động tài chính mới nhất của bạn
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <TransactionList limit={7}/>
                {/* <div className="pt-4 flex justify-center"> */}
                {/*     <Button */}
                {/*         onClick={() => navigate("/transactions")} */}
                {/*         variant="outline" */}
                {/*         className="w-fit px-8 py-4 rounded-lg font-medium border-slate-200" */}
                {/*     > */}
                {/*         Xem tất cả giao dịch */}
                {/*     </Button> */}
                {/* </div> */}
            </CardContent>
        </Card>
    )
}

export default RecentTransactions