import {useMemo, useState} from "react";
import iconList from "../../../assets/icons/icons.js";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.jsx";
import {Input} from "@/components/ui/input.jsx";
import {cn} from "@/lib/utils.js";

const IconPicker = ({ open, onOpenChange, onSelectIcon, selectedIcon }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Lọc icon theo từ khóa tìm kiếm
    const filteredIcons = useMemo(() => {
        if (!searchTerm.trim()) return iconList
        const lower = searchTerm.toLowerCase()
        return iconList.filter((icon) =>
            icon.name.toLowerCase().includes(lower)
        )
    }, [searchTerm])

    const handleSelect = (icon) => {
        onSelectIcon(icon)
        onOpenChange(false)
        setSearchTerm("")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-emerald-600">Chọn Icon</DialogTitle>
                </DialogHeader>

                {/* Ô tìm kiếm icon */}
                <Input
                    placeholder="Tìm kiếm icon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Danh sách icon dạng grid */}
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar mt-2">
                    {filteredIcons.map((icon, index) => (
                        <button
                            key={`${icon.name}-${icon.className}-${index}`}
                            type="button"
                            onClick={() => handleSelect(icon)}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 p-3 rounded-lg border",
                                "hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:border-emerald-300",
                                "transition-colors cursor-pointer",
                                selectedIcon?.name === icon.name
                                    ? "bg-emerald-100 dark:bg-emerald-900 border-emerald-500 ring-2 ring-emerald-500"
                                    : "border-slate-200 dark:border-slate-700"
                            )}
                            title={icon.name}
                        >
                            <i className={cn(icon.className, "text-xl")}></i>
                            <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                {icon.name}
              </span>
                        </button>
                    ))}

                    {/* Không tìm thấy */}
                    {filteredIcons.length === 0 && (
                        <div className="col-span-full text-center py-8 text-muted-foreground">
                            Không tìm thấy icon nào phù hợp
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default IconPicker
