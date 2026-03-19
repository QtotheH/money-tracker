import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ExpenseChartFilter from "@/features/dashboard/components/ExpenseChartFilter.jsx";

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
  // Dữ liệu biểu đồ (Đã Việt hóa nhãn và giá trị)
  const data = {
    labels: [
      "Nhà ở", 
      "Ăn uống", 
      "Di chuyển", 
      "Giải trí", 
      "Tiền ích (Điện/Nước)", 
      "Khác"
    ],
    datasets: [
      {
        data: [40, 20, 15, 10, 10, 5],
        backgroundColor: [
          "#3ecf8e", // Màu xanh lá (Nhà ở)
          "#40a9ff", // Màu xanh dương (Ăn uống)
          "#b37feb", // Màu tím (Di chuyển)
          "#ffa940", // Màu cam (Giải trí)
          "#ff7875", // Màu đỏ/hồng (Tiện ích)
          "#bfbfbf"  // Màu xám (Khác)
        ],
        borderWidth: 2,
        borderColor: "#ffffff", // Viền trắng giữa các miếng bánh để nhìn rõ hơn
        hoverOffset: 8          // Hiệu ứng đẩy ra khi di chuột vào
      }
    ]
  }

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
  }

  return (
    <Card className="py-4 sm:py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="flex flex-col lg:flex-row lg:items- lg:justify-between gap-2 md:gap-3 lg:gap-4 space-y-0 pb-2 md:pb-3 lg:pb-4 px-4 sm:px-6">
            <div className="space-y-1 min-w-0 flex-1">
                <CardTitle className="text-lg sm:text-2xl font-semibold tracking-tight">
                    Chi tiêu theo hạng mục
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    Phân bổ ngân sách của bạn trong tháng này
                </p>
            </div>
            
            {/* Thanh lọc */}
            <div className="flex-shrink-0">
              <ExpenseChartFilter />  
            </div>
           
        </CardHeader>
        {/* Phần biểu đồ */}
        <CardContent className="h-[250px] sm:h-[320px] pt-2 sm:pt-4 px-2 sm:px-6">
            <Doughnut data={data} options={options} />
        </CardContent>
    </Card>
  )
}

export default ExpenseCategoryChart