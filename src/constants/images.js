// تصویر جایگزین وقتی محصول عکسی ندارد
export const PLACEHOLDER_IMAGE = "/images/placeholder.png";

// اولین تصویر معتبر محصول را برمی‌گرداند و در نبود آن، تصویر جایگزین
export function getProductImage(product) {
  return product?.images?.[0] || product?.image || PLACEHOLDER_IMAGE;
}
