import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"

const ExpenseChartFilter = ({ transactionType = 'expense', onTypeChange }) => {
  return (
    <div className="flex items-center border rounded-full p-0.5 sm:p-1 bg-white shadow-sm gap-0.5 sm:gap-0 dark:bg-slate-800">
        {/* Nút Thu nhập */}
        <button 
          title="Xem Thu Nhập" 
          onClick={() => onTypeChange('income')}
          className={`flex items-center justify-center w-8 h-7 sm:w-10 sm:h-8 rounded-full transition-colors ${
            transactionType === 'income'
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400'
              : 'text-slate-400 hover:bg-slate-50 dark:text-slate-500 dark:hover:bg-slate-700'
          }`}
        >
            <ArrowDownToLine size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
        </button>

        <div className="w-[0.5px] sm:w-[1px] h-3 sm:h-4 bg-slate-200 mx-0.5 sm:mx-1" />

        {/* Nút Chi tiêu */}
        <button 
          title="Xem Chi Tiêu" 
          onClick={() => onTypeChange('expense')}
          className={`flex items-center justify-center w-8 h-7 sm:w-10 sm:h-8 rounded-full transition-colors ${
            transactionType === 'expense'
              ? 'bg-orange-50 text-orange-500 dark:bg-orange-900 dark:text-orange-400'
              : 'text-slate-400 hover:bg-slate-50 dark:text-slate-500 dark:hover:bg-slate-700'
          }`}
        >
            <ArrowUpFromLine size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
        </button>
    </div>
  )
}

export default ExpenseChartFilter
     
