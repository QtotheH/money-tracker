import {Progress} from "@/components/ui/progress.jsx";
import React from "react";

const BudgetProgressBar = ({ value, progressColor }) => {
    return <Progress value={value} indicatorClassName={progressColor} />
}
export default BudgetProgressBar
