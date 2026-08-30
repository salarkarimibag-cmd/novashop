// قیمت نهایی محصول: قیمت تخفیف‌خورده اگر واقعاً از قیمت اصلی کمتر باشد، وگرنه قیمت اصلی
export default function getFinalPrice(product) {
  return product.discountPrice && product.discountPrice < product.price
    ? product.discountPrice
    : product.price;
}
