import CategoryFilter from "@/features/categories/components/CategoryFilter.jsx";
import {useMemo, useState} from "react";
import CategoryItem from "@/features/categories/components/CategoryItem.jsx";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll.js";
import LoadMore from "@/components/common/LoadMore.jsx";

const CategoryList = ({categories, onEdit}) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Lọc danh mục theo từ khóa, bọc trong useMemo để tránh lỗi reset infinite scroll
    const filteredCategories = useMemo(() => {
        return categories.filter(c =>
            c.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    // custom hook infinite scroll
    const { visibleItems, hasMore, loadMoreRef } = useInfiniteScroll(filteredCategories);

    return (
        <div className="space-y-6">
            {/*   Search   */}
            <CategoryFilter searchTerm={searchTerm} onSearchChange={setSearchTerm}/>

            {/* Danh sách danh mục */}
            <div className="space-y-2 max-h-[500px] md:max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {visibleItems.map((category) => (
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

                {/* THẺ MỎ NEO KÍCH HOẠT LOAD MORE */}
                {hasMore && <LoadMore loadMoreRef={loadMoreRef} />}
            </div>
        </div>
    )
}
export default CategoryList
