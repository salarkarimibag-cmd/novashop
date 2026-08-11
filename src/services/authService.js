import apiClient from "@/lib/apiClient";

// این بک‌اند بعضی پاسخ‌ها را داخل data می‌پیچد و بعضی را مستقیم می‌دهد؛
// نرمال‌سازی همین‌جا انجام می‌شود تا بقیه‌ی برنامه یک شکل ثابت ببیند
function unwrap(response) {
  return response?.data ?? response;
}

const authService = {
  async login(credentials) {
    const payload = unwrap(
      await apiClient("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    );

    const session = {
      user: payload?.user ?? null,
      token: payload?.token ?? null,
    };

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
    const payload = unwrap(
      await apiClient("/api/auth/profile", {
        // بررسی پس‌زمینه است؛ نباید کاربر را به صفحه‌ی ورود بفرستد
        redirectOnUnauthorized: false,
      }),
    );

    return payload?.user ?? payload;
  },

  async logout() {
    return true;
  },
};

export default authService;
