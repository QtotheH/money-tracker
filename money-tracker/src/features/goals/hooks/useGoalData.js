import {useDispatch, useSelector} from "react-redux";
import {fetchGoals, getGoalsStatus, selectAllGoals} from "@/store/slices/goalSlice.js";
import {useEffect} from "react";

export const useGoalData = () => {
    const dispatch = useDispatch();

    const goals = useSelector(selectAllGoals) || [];
    const status = useSelector(getGoalsStatus);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGoals());
        }
    }, [status, dispatch]);

    const isLoading = status === 'loading';

    return {
        goals,
        isLoading
    };
}