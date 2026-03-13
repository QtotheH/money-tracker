import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CategoryList from "@/features/categories/components/CategoryList.jsx";
import AddCategoryDialog from "@/features/categories/components/AddCategoryDialog.jsx";
const CategoryPage = () => {
  // State cho dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" hoặc "edit"
  const [editingCategory, setEditingCategory] = useState(null);

  // Mở dialog ở chế độ THÊM
  const handleAdd = () => {
    setDialogMode("add");
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  // Mở dialog ở chế độ SỬA
  const handleEdit = (category) => {
    setDialogMode("edit");
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Page */}
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
                Danh mục
              </h1>
              <p className="text-muted-foreground">
                Xem và quản lý tất cả danh mục thu chi của bạn
              </p>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Thêm danh mục
            </Button>
          </div>

          {/* Danh sách giao dịch */}
          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle>Tất cả danh mục</CardTitle>
              <CardDescription>
                Danh sách các danh mục phân loại thu chi sẵn có
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryList onEdit={handleEdit} />
            </CardContent>
          </Card>

          {/* Dialog Thêm / Sửa */}
          <AddCategoryDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            mode={dialogMode}
            category={editingCategory}
          />
        </div>
      </div>
    </main>
  );
};
export default CategoryPage;
