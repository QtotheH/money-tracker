import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"// Đăng ký các thành phần cần thiết cho biểu đồ hình tròn


const ExpenseChartFilter = () => {
  return (
    <div className="flex items-center border rounded-full p-0.5 sm:p-1 bg-white shadow-sm gap-0.5 sm:gap-0 dark:bg-slate-800">
        {/* Nút Thu nhập */}
        <button title="Xem Thu Nhập" className="flex items-center justify-center w-8 h-7 sm:w-10 sm:h-8 rounded-full bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-100 dark:bg-slate-900 dark:text-emerald-400 dark:hover:bg-slate-950">
            <ArrowDownToLine size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
        </button>

        <div className="w-[0.5px] sm:w-[1px] h-3 sm:h-4 bg-slate-200 mx-0.5 sm:mx-1" />

        {/* Nút Chi tiêu */}
        <button title="Xem Chi Tiêu" className="flex items-center justify-center w-8 h-7 sm:w-10 sm:h-8 rounded-full text-orange-500 transition-colors hover:bg-orange-50 dark:bg-slate-800 dark:text-orange-400 dark:hover:bg-slate-950">
            <ArrowUpFromLine size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
        </button>
    </div>
  )
}

export default ExpenseChartFilter
     
