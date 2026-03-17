import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Eye} from "lucide-react"
import {useNavigate} from "react-router";

import GoalList from "@/features/goals/components/GoalList.jsx";
import {nanoid} from "@reduxjs/toolkit";

const goals = [
    {
        id: nanoid(),
        name: "Quỹ khẩn cấp",
        targetDate: "01/01/2026",
        current: 6500,
        target: 10000,
        iconClass: "fa-regular fa-house",
        iconName: "house",
    },
    {
        id: nanoid(),
        name: "Du lịch",
        targetDate: "09/06/2026",
        current: 6500,
        target: 10000,
        iconClass: "fa-regular fa-house",
        iconName: "house",
    },
    {
        id: nanoid(),
        name: "Mua nhà",
        targetDate: "08/17/2026",
        current: 6500,
        target: 10000,
        iconClass: "fa-regular fa-house",
        iconName: "house",
    },
    {
        id: nanoid(),
        name: "Học phí đại học",
        targetDate: "09/05/2026",
        current: 6500,
        target: 10000,
        iconClass: "fa-regular fa-house",
        iconName: "house",
    },
    {
        id: nanoid(),
        name: "Mua xe máy",
        targetDate: "04/30/2026",
        current: 6500,
        target: 10000,
        iconClass: "fa-regular fa-house",
        iconName: "house",
    },
];

const GoalProgress = () => {
    const navigate = useNavigate();

    const topGoals = [...goals]
        .sort((a, b) => (b.current / b.target) - (a.current / a.target))
        .slice(0, 3);

    return (
        <Card className="h-full py-4 sm:py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">

            <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 space-y-0 pb-2 px-4 sm:px-6">

                <div className="space-y-1 min-w-0 flex-1">
                    <CardTitle className="text-lg sm:text-2xl font-bold tracking-tight">
                        Tiến độ mục tiêu
                    </CardTitle>

                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        Tiến trình mục tiêu tiết kiệm của bạn
                    </p>
                </div>

                <button
                    onClick={() => navigate("/goals")}
                    title="Xem chi tiết"
                    className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                >
                    <Eye size={20}/>
                </button>

            </CardHeader>

            <CardContent className="px-4 sm:px-6">
                <GoalList goals={topGoals} isDashboard={true} />
            </CardContent>

        </Card>
    )
}

export default GoalProgress