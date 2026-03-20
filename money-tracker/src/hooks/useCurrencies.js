import { useState, useEffect } from "react";
import axiosClient from "@/api/axiosConfig.js";

// Lấy danh sách currencies từ db
export const useCurrencies = () => {
    const [currencies, setCurrencies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const res = await axiosClient.get("/currencies");
                setCurrencies(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCurrencies();
    }, []);

    return { currencies, isLoading };
};