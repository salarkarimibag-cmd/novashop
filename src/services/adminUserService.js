import apiClient from "@/lib/apiClient";

// مثل adminProductService: نیازمند احراز هویت و نقش ادمین است، پس از
// apiClient استفاده می‌کند نه fetch خام. بک‌اند این مسیر را بعد از
// authMiddleware با adminMiddleware می‌بندد.
const adminUserService = {
  list({ page = 1, limit = 20 } = {}) {
    const params = new URLSearchParams({ page, limit });

    return apiClient(`/api/auth/users?${params.toString()}`);
  },

  updateStatus(id, isActive) {
    return apiClient(`/api/auth/users/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
    });
  },

  updateRole(id, role) {
    return apiClient(`/api/auth/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  },
};

export default adminUserService;
