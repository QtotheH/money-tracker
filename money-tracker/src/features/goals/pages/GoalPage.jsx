import React, {useState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import AddGoalDialog from "@/features/goals/components/AddGoalDialog.jsx";
import GoalList from "@/features/goals/components/GoalList.jsx";
import {useGoalData} from "@/features/goals/hooks/useGoalData.js";
import Loading from "@/components/common/Loading.jsx";

const GoalsPage = () => {
    const [isAddGoalDialogOpen, setIsAddGoalDialogOpen] = useState(false);

    const {goals, isLoading} = useGoalData();

    return (
        <main
            className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Chia 2 thành phần */}
            <div className="container mx-auto px-4 py-8">
                {/* Thành phần thứ nhất */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
                            Mục tiêu tiết kiệm
                        </h1>
                        <p className="text-muted-foreground">
                            Đặt ra và theo dõi mục tiêu tài chính của bạn
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddGoalDialogOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                        <PlusIcon className="mr-2 h-4 w-4"/>
                        Thêm mục tiêu
                    </Button>
                </div>
                {/* CARD */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Mục tiêu tiết kiệm của bạn</CardTitle>
                        <CardDescription>Theo dõi tiến độ đạt được các mục tiêu tài chính của bạn</CardDescription>
                    </CardHeader>

                    <CardContent>
                        {isLoading ? <Loading/> :
                            goals.length === 0 ?
                                <p className="text-center">Không có dữ liệu</p> :
                            <GoalList goals={goals}/>
                        }
                    </CardContent>
                </Card>
            </div>

            <AddGoalDialog open={isAddGoalDialogOpen} setOpenChange={setIsAddGoalDialogOpen}/>
        </main>
    );
};

export default GoalsPage;
