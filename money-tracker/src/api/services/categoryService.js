import axiosClient from "@/api/axiosConfig.js";

export const categoryService = {
    getAll: () => axiosClient.get('/categories'),
    getByNameAndUserId: (name, userId) => axiosClient.get(`/categories?categoryName=${name}&userId=${userId}`),
    create: (payload) => axiosClient.post("/categories", payload),
    update: (id, payload) => axiosClient.put(`/categories/${payload.id}`, payload),
}