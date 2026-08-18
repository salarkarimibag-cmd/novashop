import * as Yup from "yup";

// رشته‌ی کاما‌دارِ ورودیِ کاربر (برای لینک تصاویر، رنگ‌ها، سایزها) را
// به آرایه‌ی تمیز تبدیل می‌کند. هم اینجا برای اعتبارسنجی لازم است، هم
// در فرم (مرحله بعد) برای ساختن بدنه‌ی درخواست — یک تابع، یک قانون،
// تا «چطور رشته‌ی کاما‌دار می‌خوانیم» در دو جا از هم فاصله نگیرد.
export const parseCommaList = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

// فیلدهایی مثل images/colors/sizes در فرم به‌صورت یک ورودی متنیِ
// ساده (کاما‌دار) نگه داشته می‌شوند، نه آرایه — چون این پروژه هنوز
// کامپوننتی برای ورودیِ چندمقداری (chips/tags) ندارد و ساختنش برای
// همین یک فرم اضافه‌کاری بود. specifications هم عمداً در این نسخه از
// فرم نیست: چیزی جز اسکریپت seed آن را پر نمی‌کند و افزودن یک ویرایشگر
// کلید/مقدار برای یک فیلد کم‌کاربرد، فراتر از چیزی است که الان لازم
// است.
const productSchema = Yup.object({
  title: Yup.string().trim().required("عنوان محصول الزامی است"),

  description: Yup.string().trim(),

  price: Yup.number()
    .typeError("قیمت باید عدد باشد")
    .positive("قیمت باید بزرگ‌تر از صفر باشد")
    .required("قیمت الزامی است"),

  // transform لازم است چون ورودیِ خالی از یک <input type="number"> یک
  // رشته‌ی خالی است، نه null — بدون این، یوپ رشته‌ی خالی را قبل از
  // رسیدن به nullable() به NaN تبدیل می‌کند و پیام «باید عدد باشد» را
  // برای یک فیلدِ اختیاریِ خالی نشان می‌دهد.
  discountPrice: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value,
    )
    .typeError("قیمت تخفیف‌خورده باید عدد باشد")
    .positive("قیمت تخفیف‌خورده باید بزرگ‌تر از صفر باشد")
    .nullable()
    .test(
      "less-than-price",
      "قیمت تخفیف‌خورده باید کمتر از قیمت اصلی باشد",
      function (value) {
        if (value === null || value === undefined) return true;

        return value < this.parent.price;
      },
    ),

  stock: Yup.number()
    .typeError("موجودی باید عدد باشد")
    .integer("موجودی باید عدد صحیح باشد")
    .min(0, "موجودی نمی‌تواند منفی باشد")
    .required("موجودی الزامی است"),

  brand: Yup.string().trim(),

  category: Yup.string().trim(),

  images: Yup.string().test(
    "valid-urls",
    "همه‌ی لینک‌های تصویر باید با http:// یا https:// شروع شوند",
    (value) => parseCommaList(value).every((url) => /^https?:\/\/.+/.test(url)),
  ),

  colors: Yup.string(),

  sizes: Yup.string(),

  isFeatured: Yup.boolean().default(false),
});

export default productSchema;
