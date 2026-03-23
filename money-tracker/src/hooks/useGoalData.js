import {useSelector} from "react-redux";
import {getGoalsStatus, selectAllGoals} from "@/store/slices/goalSlice.js";

export const useGoalData = () => {
    const goals = useSelector(selectAllGoals) || [];
    const status = useSelector(getGoalsStatus);

    const isLoading = status === 'loading';

    return {
        goals,
        isLoading
    };
}