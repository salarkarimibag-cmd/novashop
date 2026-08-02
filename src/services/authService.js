import apiClient from "@/lib/apiClient";

const authService = {
  async login(data) {
    return apiClient("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async register(data) {
    return apiClient("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async me() {
    return apiClient("/api/auth/profile");
  },

  async logout() {
    return true;
  },
};

export default authService;
