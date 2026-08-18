import apiClient from "@/lib/apiClient";

// برخلاف productService.js (که fetch خام و بدون احراز هویت است، برای
// صفحات عمومی)، این عملیات‌ها فقط برای ادمین‌اند و باید Authorization
// header داشته باشند — پس از apiClient استفاده می‌کنند، نه fetch مستقیم.
// بک‌اند این سه مسیر را بعد از authMiddleware با adminMiddleware
// می‌بندد؛ کاربر غیرادمین اینجا با پاسخ ۴۰۳ مواجه می‌شود که apiClient
// آن را به همان پیام فارسی سرور تبدیل می‌کند.
const adminProductService = {
  create(data) {
    return apiClient("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // PUT بک‌اند جایگزینی کامل است، نه patch جزئی: هر فیلدی که اینجا
  // فرستاده نشود، سمت سرور به مقدار پیش‌فرضش برمی‌گردد (مثلاً
  // discountPrice به null، آرایه‌ها به [])، نه اینکه دست‌نخورده بماند.
  // فرم ویرایش باید همیشه شیء کامل محصول را بفرستد.
  update(id, data) {
    return apiClient(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  remove(id) {
    return apiClient(`/api/products/${id}`, {
      method: "DELETE",
    });
  },
};

export default adminProductService;
