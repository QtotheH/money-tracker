import axiosClient from "@/api/axiosConfig.js";

export const dashboardService = {
  getDashboardCards: (userId) =>
    axiosClient.get(`/transactions?userId=${userId}`),
};
