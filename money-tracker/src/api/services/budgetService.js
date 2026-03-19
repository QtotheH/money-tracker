import axiosClient from "@/api/axiosConfig.js";

export const budgetService = {
    getAll: () => axiosClient.get("/budgets"),
    create: (payload) => axiosClient.post("/budgets", payload),
}