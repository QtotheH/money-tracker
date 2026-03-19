import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FinancialChartFilter from "@/features/dashboard/components/FinancialChartFilter.jsx";
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
  // Dữ liệu biểu đồ
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Thu nhập",
        data: [3200, 3500, 3800, 4000, 4200, 4500],
        backgroundColor: "#10b981", // Màu nền (cho cột) hoặc điểm (cho đường)
        borderColor: "#10b981",     // Màu đường kẻ (cho Line Chart)
        borderRadius: 6,           // Độ bo góc nếu quay lại dùng Bar Chart
        tension: 0.4,              // Độ cong của đường kẻ (0 = thẳng, 0.4 = mượt)
        pointRadius: 4,            // Kích thước điểm nút trên đường
        pointHoverRadius: 6,       // Kích thước điểm nút khi di chuột vào
      },
      {
        label: "Chi tiêu",
        data: [2100, 2300, 2200, 2400, 2000, 2150],
        backgroundColor: "#ef4444",
        borderColor: "#ef4444",
        borderRadius: 6,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  }

  // Cấu hình hiển thị
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Quan trọng: Cho phép biểu đồ co giãn theo chiều cao h-[320px]

    scales: {
      x: {
        grid: {
          display: false        // Ẩn các đường lưới dọc để biểu đồ sạch hơn
        },
        // Các thông số dưới đây chủ yếu dùng cho Bar Chart nhưng không gây lỗi cho Line Chart
        categoryPercentage: 0.6, // Tỷ lệ chiều rộng nhóm (giảm để các tháng xa nhau)
        barPercentage: 0.7,      // Tỷ lệ chiều rộng cột (giảm để cột Thu nhập/Chi tiêu xa nhau)
      },
      y: {
        beginAtZero: true,      // Luôn bắt đầu trục Y từ số 0
        grid: {
          color: "#e5e7eb",     // Màu của các đường lưới ngang
          drawTicks: false,     // Không vẽ các vạch nhỏ nhô ra ở trục
        },
        ticks: {
          padding: 10,          // Khoảng cách giữa chữ số và trục Y
          // Định dạng hiển thị tiền tệ
          callback: (value) => "$" + value.toLocaleString() 
        }
      }
    },

    plugins: {
      legend: {
        position: "top",        // Vị trí chú thích: trên cùng
        align: "end",           // Căn lề chú thích sang bên phải (end)
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
        backgroundColor: "#111827", // Màu nền hộp thông tin 
        padding: 12,                // Khoảng đệm bên trong hộp
        cornerRadius: 8,            // Bo góc hộp thông tin
        titleFont: { size: 14 },    // Cỡ chữ tiêu đề trong tooltip
        bodyFont: { size: 13 }      // Cỡ chữ nội dung trong tooltip
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
                  <FinancialChartFilter />
                </div>

            </div>
        </CardHeader>

    {/* Phần biểu đồ */}
      <CardContent className="h-[250px] sm:h-[320px] pt-2 sm:pt-4 px-2 sm:px-6">
        {/* Render biểu đồ cột Bar -> Nếu muốn đổi biểu đồ đường thì Line */}
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  )
}

export default FinancialOverviewChart