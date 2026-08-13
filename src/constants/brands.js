// لوگوهایی که در public/brands/ موجودند.
// نام برند از API می‌آید و ممکن است فاصله داشته باشد ("New Balance")،
// ولی نام فایل‌ها یک‌تکه و کوچک است.
const BRAND_LOGOS = new Set([
  "adidas",
  "apple",
  "asus",
  "microsoft",
  "newbalance",
  "nike",
  "philips",
  "puma",
  "reebok",
  "samsung",
  "sony",
]);

// مسیر لوگو، یا null برای برندی که لوگو ندارد تا فراخوان بتواند
// به نمایش متنی برگردد. برند جدید بدون لوگو نباید کارت را خالی کند.
export function getBrandLogo(brand) {
  const key = String(brand || "")
    .toLowerCase()
    .replace(/\s+/g, "");

  return BRAND_LOGOS.has(key) ? `/brands/${key}.svg` : null;
}
