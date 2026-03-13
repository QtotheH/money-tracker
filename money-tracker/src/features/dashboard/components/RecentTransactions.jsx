import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {useNavigate} from "react-router";

import {
    ArrowUpCircle,
    Home,
    UtensilsCrossed,
    Briefcase,
    Car
} from "lucide-react"

import TransactionList from "@/features/dashboard/components/TransactionList.jsx";

const transactions = [
    {
        name: "Lương tháng",
        date: "01/01/2026",
        category: "Thu nhập",
        amount: "+4,395,000",
        type: "income",
        icon: <ArrowUpCircle className="text-emerald-500 size-5"/>,
        iconBg: "bg-emerald-50"
    },
    {
        name: "Lương tháng",
        date: "01/01/2026",
        category: "Thu nhập",
        amount: "+4,395,000",
        type: "income",
        icon: <ArrowUpCircle className="text-emerald-500 size-5"/>,
        iconBg: "bg-emerald-50"
    },
    {
        name: "Lương tháng",
        date: "01/01/2026",
        category: "Thu nhập",
        amount: "+4,395,000",
        type: "income",
        icon: <ArrowUpCircle className="text-emerald-500 size-5"/>,
        iconBg: "bg-emerald-50"
    },
    {
        name: "Tiền thuê nhà",
        date: "02/01/2026",
        category: "Nhà ở",
        amount: "-850,000",
        type: "expense",
        icon: <Home className="text-rose-500 size-5"/>,
        iconBg: "bg-rose-50"
    },
    {
        name: "Mua thực phẩm",
        date: "03/01/2026",
        category: "Ăn uống",
        amount: "-120,000",
        type: "expense",
        icon: <UtensilsCrossed className="text-rose-500 size-5"/>,
        iconBg: "bg-rose-50"
    },
    {
        name: "Làm thêm Freelance",
        date: "04/01/2026",
        category: "Thu nhập",
        amount: "+350,000",
        type: "income",
        icon: <Briefcase className="text-emerald-500 size-5"/>,
        iconBg: "bg-emerald-50"
    },
    {
        name: "Đổ xăng",
        date: "05/01/2026",
        category: "Di chuyển",
        amount: "-45,000",
        type: "expense",
        icon: <Car className="text-rose-500 size-5"/>,
        iconBg: "bg-rose-50"
    }
]

const RecentTransactions = () => {
    const navigate = useNavigate();

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

                <TransactionList transactions={transactions}/>

                <div className="pt-4 flex justify-center">
                    <Button
                        onClick={() => navigate("/transactions")}
                        variant="outline"
                        className="w-fit px-8 py-4 rounded-lg font-medium border-slate-200"
                    >
                        Xem tất cả giao dịch
                    </Button>
                </div>

            </CardContent>

        </Card>
    )
}

export default RecentTransactions