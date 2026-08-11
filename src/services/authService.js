import apiClient from "@/lib/apiClient";

// این بک‌اند بعضی پاسخ‌ها را داخل data می‌پیچد و بعضی را مستقیم می‌دهد؛
// نرمال‌سازی همین‌جا انجام می‌شود تا بقیه‌ی برنامه یک شکل ثابت ببیند
function extractSession(response) {
  const payload = response?.data ?? response;

  return {
    user: payload?.user ?? null,
    token: payload?.token ?? null,
  };
}

const authService = {
  async login(credentials) {
    const response = await apiClient("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const session = extractSession(response);

    // بدون توکن، ورود انجام نشده — پیام موفقیت نباید نمایش داده شود
    if (!session.token) {
      throw new Error("پاسخ سرور شامل توکن نبود");
    }

    return session;
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
