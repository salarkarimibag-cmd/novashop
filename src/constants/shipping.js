// هزینه‌ای که واقعاً از کاربر گرفته می‌شود.
// این فرمول باید عیناً با محاسبه‌ی بک‌اند یکی باشد؛ اگر آنجا عوض شد،
// اینجا هم باید عوض شود وگرنه مبلغ نمایش‌داده‌شده با فاکتور نمی‌خواند.
export const FREE_SHIPPING_THRESHOLD = 5000000;

export const FLAT_SHIPPING_COST = 150000;

export function getShippingCost(subtotal) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_COST;
}

// قیمت‌های نمایشی بخش «روش ارسال».
// هشدار: این اعداد در مبلغ نهایی اثری ندارند و روش انتخابی هم به بک‌اند
// فرستاده نمی‌شود؛ تا وقتی بک‌اند shippingMethod را نپذیرد، ناهماهنگ می‌مانند.
export const SHIPPING_PRICES = {
  normal: 60000,
  express: 120000,
  pickup: 0,
};
