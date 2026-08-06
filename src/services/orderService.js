import apiClient from "@/lib/apiClient";

const orderService = {
  createOrder: async (data) => {
    return await apiClient("/api/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getOrders: async () => {
    return await apiClient("/api/orders", {
      method: "GET",
    });
  },

  getOrderById: async (id) => {
    return await apiClient(`/api/orders/${id}`, {
      method: "GET",
    });
  },
};

export default orderService;
