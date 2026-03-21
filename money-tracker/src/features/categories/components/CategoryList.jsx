import CategoryFilter from "@/features/categories/components/CategoryFilter.jsx";
import {useState} from "react";
import CategoryItem from "@/features/categories/components/CategoryItem.jsx";

const CategoryList = ({categories, onEdit}) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Lọc danh mục theo từ khóa
    const filteredCategories = categories.filter((cat) =>
        cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/*   Search   */}
            <CategoryFilter searchTerm={searchTerm} onSearchChange={setSearchTerm}/>

            {/* Danh sách danh mục */}
            <div className="space-y-2 max-h-[500px] md:max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCategories.map((category) => (
                    <CategoryItem
                        key={category.id}
                        category={category}
                        onEdit={onEdit}
                    />
                ))}

                {filteredCategories.length === 0 && (
                    <p className="text-center py-4 text-sm text-muted-foreground">
                        Không có danh mục.
                    </p>
                )}
            </div>
        </div>
    )
}
export default CategoryList
