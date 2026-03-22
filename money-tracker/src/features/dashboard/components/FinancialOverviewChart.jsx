import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FinancialChartFilter from "@/features/dashboard/components/FinancialChartFilter.jsx";
import { useSelector } from "react-redux";
import { selectTransactionsWithCategories } from "@/store/slices/transactionSlice";
import { useMemo,useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext.jsx";
import {
  Chart as ChartJS,
  CategoryScale,   // Trục X (tháng)
  LinearScale,     // Trục Y (số tiền)
  BarElement,      // Thành phần để vẽ cột
  PointElement,    // Thành phần để vẽ điểm (cho Line Chart)
  LineElement,     // Thành phần để vẽ đường (cho Line Chart)
  Tooltip,         // Hiển thị thông tin khi di chuột vào
  Legend,          // Chú thích màu sắc
} from "chart.js"
import { Bar } from "react-chartjs-2" // Đã đổi từ Bar sang Line
import { useCurrency } from "@/hooks/useCurrency";

// Đăng ký các thành phần bắt buộc của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

const FinancialOverviewChart = () => {
  const { isDark } = useContext(ThemeContext);
  const colors = {
  light: {
    gridColor: "#e5e7eb",
    textColor: "#111827",
    axisLabelColor: "#64748b"
  },
  dark: {
    gridColor: "#334155",
    textColor: "#f1f5f9",
    axisLabelColor: "#cbd5e1"
  }
};

const theme = isDark ? colors.dark : colors.light;
  const [filter, setFilter] = useState('6months');
  const {formatMoney} = useCurrency();
  const monthsToShow = {
    '1month': 1,
    '3months': 3,
    '6months': 6,
    '1year': 12
  };
  // Dữ liệu biểu đồ
  const transactions = useSelector(selectTransactionsWithCategories);
  // Tính toán dữ liệu theo tháng cho biểu đồ
  const chartData = useMemo(() => {
    const monthlyData = {};
    const currentDate = new Date();
    const monthsCount = monthsToShow[filter];
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    // Lấy dữ liệu N tháng gần nhất
    if (monthsCount === 1) {
      // Tháng trước
      const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
      const key = `${lastMonthDate.getFullYear()}-${lastMonthDate.getMonth() + 1}`;
      monthlyData[key] = { income: 0, expense: 0 };
      
    } else if (monthsCount === 12) {
      // 12 tháng của năm ngoái
      const lastYear = currentYear - 1;
      for (let i = 1; i <= 12; i++) {
        monthlyData[`${lastYear}-${i}`] = { income: 0, expense: 0 };
      }
      
    } else {
      // 3 tháng hoặc 6 tháng gần nhất
      for (let i = monthsCount - 1; i >= 0; i--) {
        const date = new Date(currentYear, currentMonth - i, 1);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}`; 
        monthlyData[key] = { income: 0, expense: 0 };
      }
    }
    // Nhóm giao dịch theo tháng và loại (thu nhập/chi tiêu)
    transactions.forEach(t => {
      const transactionDate = new Date(t.date);
      const key = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
      if (monthlyData[key]) {
        if (t.type === 'income') {
          monthlyData[key].income += t.amount;
        } else if (t.type === 'expense') {
          monthlyData[key].expense += t.amount;
        }
      }
    });

    // Chuyển đổi dữ liệu thành định dạng cho Chart.js
    const labels = Object.keys(monthlyData).map(key => {
      const [year, month] = key.split("-");
      return `${month}/${year}`;
    });

    const incomeData = Object.values(monthlyData).map(data => data.income);
    const expenseData = Object.values(monthlyData).map(data => data.expense);
    return {
        labels,
        datasets: [
            {
                label: "Thu nhập",
                data: incomeData,
                borderColor: "#10b981",
                backgroundColor: "#10b981",
                borderRadius: 6,
                tension: 0.4,
                pointRadius: 4
            },
            {
                label: "Chi tiêu",
                data: expenseData,
                borderColor: "#ef4444",
                backgroundColor: "#ef4444",
                borderRadius: 6,
                tension: 0.4,
                pointRadius: 4
            }
        ]
    };
  }, [transactions, filter]);

  // Cấu hình hiển thị
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        grid: {
          display: false
        },
        categoryPercentage: 0.6,
        barPercentage: 0.7,
        title: {
          display: true,
          text: 'Thời gian (tháng)',
          color: theme.textColor 
        },
        ticks: {
          color: theme.textColor 
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: theme.gridColor, 
          drawTicks: false,
        },
        ticks: {
          padding: 10,
          color: theme.textColor,
          callback: (value) => formatMoney(value)
        },
        title: {
          display: true,
          text: 'Số tiền',
          color: theme.textColor 
        }
      }
    },

    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          padding: 20,
          font: {
            size: 13,
            family: "'Inter', sans-serif"
          },
          color: theme.textColor
        }
      },
      tooltip: {
        backgroundColor: isDark ? "#1e293b" : "#111827",
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        titleColor: theme.textColor,
        bodyColor: theme.textColor
      }
    }
  }

  return (
    <Card className="py-4 sm:py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="pb-2 sm:pb-4 px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row lg:items- lg:justify-between gap-3 md:gap-4 lg:gap-4">
                
                {/* Bên trái */}
                <div className="space-y-1 flex-1 min-w-0">
                <CardTitle className="text-lg sm:text-2xl font-semibold tracking-tight">
                    Tổng quan tài chính
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    Thu nhập và chi tiêu các tháng gần đây
                </p>
                </div>

                {/*  Filter */}
                <div className="flex-shrink-0">
                  <FinancialChartFilter filter={filter} setFilter={setFilter} />
                </div>

            </div>
        </CardHeader>

    {/* Phần biểu đồ */}
      <CardContent className="h-[250px] sm:h-[320px] pt-2 sm:pt-4 px-2 sm:px-6">
        {/* Render biểu đồ cột Bar -> Nếu muốn đổi biểu đồ đường thì Line */}
        <Bar data={chartData} options={options} />
      </CardContent>
    </Card>
  )
}

export default FinancialOverviewChart