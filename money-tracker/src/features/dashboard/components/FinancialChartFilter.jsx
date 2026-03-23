import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FinancialChartFilter = ({ filter, setFilter }) => {
  return (
     <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-full sm:w-[180px] lg:w-[200px] text-xs sm:text-sm">
            <SelectValue placeholder="Chọn thời gian" />
        </SelectTrigger>

        <SelectContent>
            <SelectItem value="1month">Tháng trước</SelectItem>
            <SelectItem value="3months">3 tháng gần đây</SelectItem>
            <SelectItem value="6months">6 tháng gần đây</SelectItem>
            <SelectItem value="1year">Năm trước</SelectItem>
        </SelectContent>
    </Select>
  )
}

export default FinancialChartFilter
     
