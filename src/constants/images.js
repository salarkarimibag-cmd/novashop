// تصویر جایگزین وقتی محصول عکسی ندارد
export const PLACEHOLDER_IMAGE = "/images/placeholder.png";

// هاست مجاز برای عکس‌های مطلق، همان هاستی که next.config.mjs به next/image معرفی کرده
const ALLOWED_IMAGE_HOST = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000")
      .host;
  } catch {
    return null;
  }
})();

// مسیر نسبی (سرو شده از همین اپ) یا آدرس مطلقی که هاستش با next.config.mjs هماهنگ است
function isAllowedImage(url) {
  if (!url) return false;

  if (url.startsWith("/")) return true;

  try {
    return new URL(url).host === ALLOWED_IMAGE_HOST;
  } catch {
    return false;
  }
}

// اولین تصویر معتبر محصول را برمی‌گرداند و در نبود آن یا هاست غیرمجاز، تصویر جایگزین
// (بک‌اند گاهی داده‌ی تستی با آدرس هاست دیگر برمی‌گرداند که next/image روی آن کرش می‌کند)
export function getProductImage(product) {
  const image = product?.images?.[0] || product?.image;

  return isAllowedImage(image) ? image : PLACEHOLDER_IMAGE;
}
