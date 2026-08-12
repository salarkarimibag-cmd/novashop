// هزینه‌ای که واقعاً از کاربر گرفته می‌شود.
// این فرمول باید عیناً با محاسبه‌ی بک‌اند یکی باشد
// (order.service.js → FREE_SHIPPING_THRESHOLD و SHIPPING_COST)؛
// اگر آنجا عوض شد، اینجا هم باید عوض شود وگرنه مبلغ نمایش‌داده‌شده
// با فاکتور نمی‌خواند.
//
// بک‌اند فقط همین یک نرخ ثابت را می‌شناسد و روش ارسال ندارد: نه در
// اسکیمای اعتبارسنجی سفارش، نه در مدل دیتابیس. پس در فرانت هم
// نباید چند روش ارسال با قیمت‌های جداگانه نمایش داده شود.
export const FREE_SHIPPING_THRESHOLD = 5000000;

export const FLAT_SHIPPING_COST = 150000;

export function getShippingCost(subtotal) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_COST;
}
