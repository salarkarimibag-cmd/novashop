export default function formatPrice(price) {
  if (price === null || price === undefined) {
    return "0 تومان";
  }

  return `${Number(price).toLocaleString("fa-IR")} تومان`;
}
