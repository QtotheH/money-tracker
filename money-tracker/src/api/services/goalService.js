import axiosClient from "@/api/axiosConfig.js";

export const goalService = {
    getAll: () => axiosClient.get("/goals"),
    create: (payload) => axiosClient.post("/goals", payload),
    updateAmount: (id, payload) => axiosClient.put(`/goals/${id}`, payload),
}