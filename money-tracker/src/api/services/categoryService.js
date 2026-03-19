import axiosClient from "@/api/axiosConfig.js";

export const categoryService = {
    getAll: () => axiosClient.get('/categories'),
    create: (payload) => axiosClient.post("/categories", payload),
    update: (id, payload) => axiosClient.put(`/categories/${payload.id}`, payload),
}