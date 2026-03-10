import CategoryFilter from "@/features/categories/components/CategoryFilter.jsx";
import {useState} from "react";
import CategoryItem from "@/features/categories/components/CategoryItem.jsx";

const categories = [
    {
        id: "1",
        categoryName: "Ăn uống",
        iconClass: "fa-regular fa-utensils",
        iconName: "utensils",
        icon: <i className="fa-regular fa-utensils"></i>,
    },
    {
        id: "2",
        categoryName: "Lương",
        iconClass: "fa-regular fa-dollar-sign",
        iconName: "dollar-sign",
        icon: <i className="fa-regular fa-dollar-sign"></i>,
    },
    {
        id: "3",
        categoryName: "Thuê nhà",
        iconClass: "fa-regular fa-house",
        iconName: "house",
        icon: <i className="fa-regular fa-house"></i>,
    },
    {
        id: "4",
        categoryName: "Học phí",
        iconClass: "fa-regular fa-graduation-cap",
        iconName: "graduation-cap",
        icon: <i className="fa-regular fa-graduation-cap"></i>,
    },
    {
        id: "5",
        categoryName: "Quà sinh nhật",
        iconClass: "fa-regular fa-gift",
        iconName: "gift",
        icon: <i className="fa-regular fa-gift"></i>,
    },
    {
        id: "6",
        categoryName: "Gói đăng ký Youtube",
        iconClass: "fa-brands fa-youtube",
        iconName: "youtube",
        icon: <i className="fa-brands fa-youtube"></i>,
    },
    {
        id: "7",
        categoryName: "Gói đăng ký Spotify",
        iconClass: "fa-brands fa-spotify",
        iconName: "spotify",
        icon: <i className="fa-brands fa-spotify"></i>,
    },
    {
        id: "8",
        categoryName: "Vé xem phim",
        iconClass: "fa-regular fa-film",
        iconName: "film",
        icon: <i className="fa-regular fa-film"></i>,
    },
    {
        id: "9",
        categoryName: "Đổ xăng",
        iconClass: "fa-regular fa-gas-pump",
        iconName: "gas-pump",
        icon: <i className="fa-regular fa-gas-pump"></i>,
    },
    {
        id: "10",
        categoryName: "Bảo dưỡng xe",
        iconClass: "fa-regular fa-screwdriver-wrench",
        iconName: "screwdriver-wrench",
        icon: <i className="fa-regular fa-screwdriver-wrench"></i>,
    },
]

const CategoryList = ({onEdit}) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Lọc danh mục theo từ khóa
    const filteredCategories = categories.filter((cat) =>
        cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-4">
            {/*   Search   */}
            <CategoryFilter searchTerm={searchTerm} onSearchChange={setSearchTerm}/>

            {/* Danh sách danh mục */}
            <div className="space-y-2 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCategories.map((category) => (
                    <CategoryItem
                        key={category.id}
                        category={category}
                        onEdit={onEdit}
                    />
                ))}

                {filteredCategories.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                        Không tìm thấy danh mục nào
                    </p>
                )}
            </div>
        </div>
    )
}
export default CategoryList
