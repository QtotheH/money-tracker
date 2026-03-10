import { Input } from '@/components/ui/input.jsx';
const CategoryFilter = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            {/* Ô tìm kiếm */}
            <Input
                placeholder="Tìm kiếm danh mục"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="sm:max-w-[250px]"
            />
        </div>
    )
}
export default CategoryFilter
