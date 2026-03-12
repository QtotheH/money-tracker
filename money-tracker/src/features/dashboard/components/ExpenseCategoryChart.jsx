import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ExpenseChartFilter from "@/features/dashboard/components/ExpenseChartFilter.jsx";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"// Đăng ký các thành phần cần thiết cho biểu đồ hình tròn
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
    <Card className="py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-">
            <div className="space-y-1.5">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                    Chi tiêu theo hạng mục
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Phân bổ ngân sách của bạn trong tháng này
                </p>
            </div>
            
            {/* Thanh lọc */}
            <ExpenseChartFilter />  
           
        </CardHeader>
        {/* Phần biểu đồ */}
        <CardContent className="h-[320px] pt-4">
            <Doughnut data={data} options={options} />
        </CardContent>
    </Card>
  )
}

export default ExpenseCategoryChart