import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; 
import { 
  ArrowUpCircle, 
  Home, 
  UtensilsCrossed, 
  Briefcase, 
  Car 
} from "lucide-react";

const transactions = [
  {
    name: "Lương tháng",
    date: "01/01/2026",
    category: "Thu nhập",
    amount: "+4,395,000",
    type: "income",
    icon: <ArrowUpCircle className="text-emerald-500 size-5" />,
    iconBg: "bg-emerald-50"
  },
  {
    name: "Tiền thuê nhà",
    date: "02/01/2026",
    category: "Nhà ở",
    amount: "-850,000",
    type: "expense",
    icon: <Home className="text-rose-500 size-5" />,
    iconBg: "bg-rose-50"
  },
  {
    name: "Mua thực phẩm",
    date: "03/01/2026",
    category: "Ăn uống",
    amount: "-120,000",
    type: "expense",
    icon: <UtensilsCrossed className="text-rose-500 size-5" />,
    iconBg: "bg-rose-50"
  },
  {
    name: "Làm thêm Freelance",
    date: "04/01/2026",
    category: "Thu nhập",
    amount: "+350,000",
    type: "income",
    icon: <Briefcase className="text-emerald-500 size-5" />,
    iconBg: "bg-emerald-50"
  },
  {
    name: "Đổ xăng",
    date: "05/01/2026",
    category: "Di chuyển",
    amount: "-45,000",
    type: "expense",
    icon: <Car className="text-rose-500 size-5" />,
    iconBg: "bg-rose-50"
  }
];

const RecentTransactions = () => {
  return (
    <Card className="py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Giao dịch gần đây
        </CardTitle>
        <p className="text-[14px] text-muted-foreground">
          Các hoạt động tài chính mới nhất của bạn
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {transactions.map((t, i) => (
          <div 
            key={i} 
            className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50/50 transition-colors duration-300 ease-in-out hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 bg-slate-100 rounded-full ${t.iconBg}`}>
                {t.icon}
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-[16px]">{t.name}</p>
                <p className="text-[14px] text-muted-foreground">
                  {t.date} • {t.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={cn(
                "font-bold text-[16px]",
                t.type === "income" ? "text-emerald-600" : "text-rose-500"
              )}>
                {t.amount}
              </span>
              
              <Badge 
                variant="secondary" 
                className={cn(
                  "px-3 py-3 font-semibold transition-all text-[12px]",
                  t.type === "income" 
                    ? "bg-white border border-slate-200 text-slate-700" // Nền trắng, có border cho Thu nhập
                    : "bg-slate-100 text-slate-700 border-transparent"           // Nền xám cho Chi tiêu
                )}
              >
                {t.type === "income" ? "Thu nhập" : "Chi tiêu"}
              </Badge>
            </div>
          </div>
        ))}

        <div className="pt-2 flex justify-center">
          <Button variant="outline" className="w-fit px-8 py-4 rounded-lg font-medium border-slate-200">
            Xem tất cả giao dịch
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;