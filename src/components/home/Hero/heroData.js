const heroData = [
  {
    id: 1,
    image: "/images/hero/iPhone-17-Pro-Wallpaper-2-1024x576.webp",
    badge: "پیشنهاد ویژه",
    title: "تخفیف ویژه موبایل",
    subtitle: "تا ۳۰٪ تخفیف روی گوشی‌های هوشمند منتخب",
    link: `/products?category=${encodeURIComponent("موبایل")}`,
    cta: "خرید موبایل",
  },
  {
    id: 2,
    image: "/images/hero/laptop-price.webp",
    badge: "تازه‌ترین‌ها",
    title: "جدیدترین لپ‌تاپ‌ها",
    subtitle: "قدرت و کارایی برای کار و بازی",
    link: `/products?category=${encodeURIComponent("لپ تاپ")}`,
    cta: "مشاهده لپ‌تاپ‌ها",
  },
  {
    id: 3,
    image: "/images/hero/small_product-TLP-117998_e860602c-3558-11f0-9a9e-c30d0f13d8c0.webp",
    badge: "کیفیت برتر",
    title: "هدفون‌های حرفه‌ای",
    subtitle: "صدای بی‌نظیر با راحتی تمام‌روز",
    link: `/products?category=${encodeURIComponent("هدفون")}`,
    cta: "مشاهده هدفون‌ها",
  },
];

export default heroData;
