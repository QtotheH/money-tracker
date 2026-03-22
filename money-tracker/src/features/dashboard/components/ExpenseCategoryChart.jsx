import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ExpenseChartFilter from "@/features/dashboard/components/ExpenseChartFilter.jsx";
import { useSelector } from "react-redux";
import { selectTransactionsWithCategories } from "@/store/slices/transactionSlice";
import { selectCategoriesItems } from "@/store/slices/categorySlice";
import { useMemo,useState} from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import { Doughnut } from "react-chartjs-2"
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

const ExpenseCategoryChart = () => {
  const [transactionType, setTransactionType] = useState('expense');

  // Lấy dữ liệu từ Redux
  const transactions = useSelector(selectTransactionsWithCategories);
  
  // Tính toán dữ liệu cho biểu đồ
  const chartData = useMemo(() => {
    const categoryAmounts = {};
    let totalAmount = 0;
    
    // Lọc theo transactionType (expense hoặc income) và nhóm theo category
    transactions
        .filter(t => t.type === transactionType)
        .forEach(t => {
            const catName = t.category?.categoryName || 'Khác';
            categoryAmounts[catName] = (categoryAmounts[catName] || 0) + t.amount;
            totalAmount += t.amount;
        });
        
    // Tính phần trăm
    const labels = Object.keys(categoryAmounts);
    const percentages = labels.map(cat => 
        Math.round((categoryAmounts[cat] / totalAmount) * 100)
    );
    
    return {
        labels,
        datasets: [{
            data: percentages,
            backgroundColor: ["#3ecf8e", "#40a9ff", "#b37feb", "#ffa940", "#ff7875", "#bfbfbf"],
            borderWidth: 2,
            borderColor: "#ffffff",
            hoverOffset: 8
        }]
    };
  }, [transactions, transactionType]);

  // Cấu hình hiển thị
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%", // Giúp vòng tròn mỏng và thanh thoát (Dạng Doughnut)
    plugins: {
      legend: {
        position: "right", // Đặt chú thích bên phải
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded", // Hình ô vuông bo góc nhỏ cho hiện đại
          padding: 20,
          font: {
            size: 13,
            family: "'Inter', sans-serif"
          },
          color: "#64748b" // Màu xám đen (slate-500)
        }
      },
      tooltip: {
        backgroundColor: "#111827",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          // Hiển thị thêm ký hiệu % trong hộp thông tin
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            return ` ${label}: ${value}%`;
          }
        }
      }
    }
  };

  return (
    <Card className="py-4 sm:py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="flex flex-col lg:flex-row lg:items- lg:justify-between gap-2 md:gap-3 lg:gap-4 space-y-0 pb-2 md:pb-3 lg:pb-4 px-4 sm:px-6">
            <div className="space-y-1 min-w-0 flex-1">
                <CardTitle className="text-lg sm:text-2xl font-semibold tracking-tight">
                    {transactionType === 'expense' ? 'Chi tiêu' : 'Thu nhập'} theo hạng mục
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    Phân bổ {transactionType === 'expense' ? 'chi tiêu' : 'thu nhập'} của bạn trong tháng này
                </p>
            </div>
            
            {/* Thanh lọc */}
            <div className="flex-shrink-0">
              <ExpenseChartFilter transactionType={transactionType} onTypeChange={setTransactionType} />  
            </div>
           
        </CardHeader>
        {/* Phần biểu đồ */}
        <CardContent className="h-[250px] sm:h-[320px] pt-2 sm:pt-4 px-2 sm:px-6">
            <Doughnut data={chartData} options={options} />
        </CardContent>
    </Card>
  )
}

export default ExpenseCategoryChart