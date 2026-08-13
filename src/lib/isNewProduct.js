// محصول «جدید» از createdAt حساب می‌شود، نه از یک فیلد ذخیره‌شده.
// مدل بک‌اند فیلدی به نام isNew ندارد و اضافه کردنش هم درست نبود: یک بولینِ
// دستی بعد از مدتی کهنه می‌شود و کسی یادش نمی‌ماند خاموشش کند. createdAt
// روی همه‌ی محصولات هست (timestamps: true) و خودبه‌خود قدیمی می‌شود.
export const NEW_PRODUCT_DAYS = 30;

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export default function isNewProduct(product, days = NEW_PRODUCT_DAYS) {
  if (!product?.createdAt) return false;

  const createdAt = new Date(product.createdAt).getTime();

  if (Number.isNaN(createdAt)) return false;

  return Date.now() - createdAt <= days * DAY_IN_MS;
}
