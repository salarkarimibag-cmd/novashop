import apiClient from "@/lib/apiClient";

// این بک‌اند پاسخ‌ها را داخل data می‌پیچد؛ نرمال‌سازی همین‌جا انجام می‌شود
// تا کامپوننت مصرف‌کننده مجبور نباشد شکل پاسخ خام را بشناسد
function unwrap(response) {
  return response?.data ?? response;
}

const profileService = {
  async getProfile() {
    return unwrap(await apiClient("/api/auth/profile"));
  },

  async updateProfile(data) {
    const user = unwrap(
      await apiClient("/api/auth/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    );

    // بدون کاربر معتبر، بروزرسانی انجام نشده — نباید موفقیت گزارش شود
    if (!user?._id) {
      throw new Error("پاسخ سرور شامل اطلاعات کاربر نبود");
    }

    return user;
  },
};

export default profileService;
