import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import GoalProgressBar from "@/features/goals/components/GoalProgressBar.jsx";
import AddFundDialog from "@/features/goals/components/AddFundDialog";
import {getDaysLeft} from "@/lib/goalUtils.js";
import {calculatePercent, formatDateToVNDate} from "@/lib/helpers.js";
import {useCurrency} from "@/hooks/useCurrency.js";

const GoalItem = ({goal, isDashboard = false}) => {
    const [isAddFundOpen, setIsAddFundOpen] = useState(false);
    const remaining = goal.target - goal.current;
    // Làm tròn đến 2 chữ số thập phân, nhưng .toFixed trả về String nên cần chuyển về lại Number
    const progress = Number(calculatePercent(goal.current, goal.target).toFixed(2));
    const daysLeft = getDaysLeft(goal.targetDate);

    const { formatMoney } = useCurrency();

    return (
        <div className="space-y-1">
            {/* Dòng 1 */}
            <div className="flex flex-row items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-start gap-2 min-w-0 flex-1">
                    <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-600 dark:text-slate-300 shrink-0">
                        {/* Render icon từ iconClass  */}
                        {goal?.iconClass ? <i className={goal.iconClass} /> : null}
                    </div>
                    <div className="min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white leading-none mb-1 truncate">
                            {goal.name}
                        </h4>

                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate">
                            Ngày mục tiêu: {formatDateToVNDate(goal.targetDate)}
                        </p>
                    </div>

                </div>

                <div className="text-right shrink-0">
                    {!isDashboard ? (
                            <>
                                <Button
                                    onClick={() => {
                                        setIsAddFundOpen(true);
                                    }}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs sm:text-sm w-full sm:w-auto mb-2"
                                >
                                    Thêm tiền
                                </Button>
                                <AddFundDialog open={isAddFundOpen} setOpenChange={setIsAddFundOpen} goalId={goal.id} />
                            </>
                        ) :
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-1">
                            Còn lại {daysLeft} ngày
                        </p>
                    }

                    <div className="text-xs sm:text-sm font-medium">
                        <span className="text-slate-900 dark:text-white">
                          {formatMoney(goal.current)}
                        </span>

                        <span className="text-muted-foreground dark:text-slate-400">
                          {" "} / {formatMoney(goal.target)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <GoalProgressBar value={progress}/>

            {/* Footer */}
            <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground dark:text-slate-400">
                  {progress}% đã đạt
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-right">
                  {formatMoney(remaining)} còn lại
                </span>
            </div>

        </div>
    )
};

export default GoalItem;
