export default function formatPrice(price) {
  if (!price) return "0 تومان";

  return `${Number(price).toLocaleString("fa-IR")} تومان`;
}
