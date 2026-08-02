import apiClient from "@/lib/apiClient";

const profileService = {
  getProfile() {
    return apiClient("/api/auth/profile");
  },

  updateProfile(data) {
    return apiClient("/api/auth/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

export default profileService;
