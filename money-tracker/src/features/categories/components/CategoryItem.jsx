import {Button} from "@/components/ui/button.jsx";

const CategoryItem = ({category, onEdit}) => {
    const {id, categoryName, icon} = category;
    return (
        <div
            onClick={() => onEdit(category)}
            className="flex items-center justify-between p-3 rounded-lg border
                 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer
                 transition-colors hover:shadow-md"
        >
            {/* Bên trái: Icon + Thông tin */}
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800">
                    {/* {icon} */}
                    <i className={category.iconClass}></i>
                </div>
                <div>
                    <p className="font-medium">{categoryName}</p>
                </div>
            </div>

            {/* Bên phải: Nút chỉnh sửa */}
            <div>
                <Button variant="outline"
                        onClick={(e) => {
                            e.stopPropagation() // Ngăn sự kiện click lan ra div cha
                            onEdit(category)
                        }}
                >
                    <i className="fa-regular fa-pencil"></i>
                </Button>
            </div>
        </div>
    )
}
export default CategoryItem
