import axiosClient from "@/api/axiosConfig.js";

export const transactionService = {
    getAll: () => axiosClient.get("/transactions"),
    create: (payload) => axiosClient.post("/transactions", payload),
    update: (id, payload) => axiosClient.put(`/transactions/${id}`, payload),
}