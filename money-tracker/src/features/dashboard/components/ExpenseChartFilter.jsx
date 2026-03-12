import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"// Đăng ký các thành phần cần thiết cho biểu đồ hình tròn


const ExpenseChartFilter = () => {
  return (
    <div className="flex items-center border rounded-full p-1 bg-white shadow-sm">
        {/* Nút Thu nhập */}
        <button title="Xem Thu Nhập" className="flex items-center justify-center w-10 h-8 rounded-full bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-100">
            <ArrowDownToLine size={18} strokeWidth={2.5} />
        </button>

        <div className="w-[1px] h-4 bg-slate-200 mx-1" />

        {/* Nút Chi tiêu */}
        <button title="Xem Chi Tiêu" className="flex items-center justify-center w-10 h-8 rounded-full text-orange-500 transition-colors hover:bg-orange-50">
            <ArrowUpFromLine size={18} strokeWidth={2.5} />
        </button>
    </div>
  )
}

export default ExpenseChartFilter
     
