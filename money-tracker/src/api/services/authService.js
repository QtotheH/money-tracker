import axiosClient from "@/api/axiosConfig.js";

export const authService = {
    // Tìm user bằng email để kiểm tra tránh trùng lặp
    getUserByEmail: (email) => axiosClient.get(`/users?email=${email}`),
    // Đăng ký
    register: (payload) => axiosClient.post("/users", payload),
    // Dùng PATCH để chỉ cập nhật một phần dữ liệu của User
    updateSettings: (userId, newSettings) => axiosClient.patch(`/users/${userId}`, {
        settings: newSettings
    }),
    // Cập nhật thông tin Profile User - Hàm này dùng luôn cho thay đổi password
    updatePersonalInfo: (userId, payload) => axiosClient.put(`/users/${userId}`, payload),

}