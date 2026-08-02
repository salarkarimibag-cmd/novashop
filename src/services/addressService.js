import apiClient from "@/lib/apiClient";

const addressService = {
  getAll() {
    return apiClient("/api/addresses");
  },

  create(data) {
    return apiClient("/api/addresses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id, data) {
    return apiClient(`/api/addresses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  remove(id) {
    return apiClient(`/api/addresses/${id}`, {
      method: "DELETE",
    });
  },
};

export default addressService;
