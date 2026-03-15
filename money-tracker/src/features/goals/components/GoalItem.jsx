import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import GoalProgressBar from "@/features/goals/components/GoalProgressBar.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddFundDialog from "@/features/goals/components/AddFundDialog";
import {getDaysLeft} from "@/lib/goalUtils.js";
import {formatDateToVNDate} from "@/lib/helpers.js";

const GoalItem = ({goal, isDashboard = false}) => {
    const [isAddFundOpen, setIsAddFundOpen] = useState(false);
    const remaining = goal.target - goal.current;
    const progress = Math.round((goal.current / goal.target) * 100);
    const daysLeft = getDaysLeft(goal.targetDate);
    return (
        <div className="space-y-1">
            {/* Dòng 1 */}
            <div className="flex items-center justify-between">
                <div className="flex items-stretch gap-2">
                    <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                        {/* Render icon từ iconClass  */}
                        {goal?.iconClass ? <i className={goal.iconClass} /> : null}
                    </div>
                    <div>
                        <h4 className="font-semibold text-[16px] text-slate-900 leading-none mb-1">
                            {goal.name}
                        </h4>

                        <p className="text-xs text-slate-400 font-medium">
                            Ngày mục tiêu: {formatDateToVNDate(goal.targetDate)}
                        </p>
                    </div>

                </div>

                <div className="text-right">
                    {!isDashboard ? (
                            <>
                                <Button
                                    onClick={() => {
                                        setIsAddFundOpen(true);
                                    }}
                                    variant="outline"
                                    size="sm"
                                >
                                    Thêm tiền
                                </Button>
                                <AddFundDialog open={isAddFundOpen} setOpenChange={setIsAddFundOpen}/>
                            </>
                        ) :
                        <p className="text-xs text-slate-400 font-medium mb-1">
                            Còn lại {daysLeft} ngày
                        </p>
                    }

                    <div className="text-sm font-medium">
                        <span className="text-slate-900">
                          ₫{goal.current.toLocaleString()}
                        </span>

                        <span className="text-muted-foreground">
                          {" "} / ₫{goal.target.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Progress */}
            {/* <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
                <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-700 ease-out"
                    style={{width: `${percentage}%`}}
                />
            </div> */}
            <GoalProgressBar value={progress}/>

            {/* Footer */}
            <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">
                  {progress}% đã đạt
                </span>
                <span className="text-slate-500">
                  {remaining.toLocaleString()} VNĐ còn lại
                </span>
            </div>

        </div>
    )
};

export default GoalItem;
