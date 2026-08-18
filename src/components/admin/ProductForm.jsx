"use client";

import { useFormik } from "formik";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

import productSchema, { parseCommaList } from "@/validations/productSchema";

const DEFAULT_VALUES = {
  title: "",
  description: "",
  price: "",
  discountPrice: "",
  stock: 0,
  brand: "",
  category: "",
  images: "",
  colors: "",
  sizes: "",
  isFeatured: false,
};

// هم فرم ساخت و هم فرم ویرایش همین کامپوننت را با یک onSubmit متفاوت
// صدا می‌زنند — نه دو کپی جدا. تنها فرقشان initialValues است (خالی
// در برابر مقادیر فعلیِ محصول).
//
// خطا اینجا (داخل فرم) گرفته و toast می‌شود، ولی موفقیت را onSubmit
// خودش مدیریت می‌کند (پیام موفقیت + انتقال به لیست) — چون آن رفتار
// بین ساخت و ویرایش فرق دارد (مثلاً می‌تواند پیام یا مسیر متفاوتی
// داشته باشد)، درحالی‌که رفتار خطا برای هر دو یکی است.
export default function ProductForm({
  initialValues,
  onSubmit,
  submitLabel = "ذخیره",
}) {
  const formik = useFormik({
    initialValues: { ...DEFAULT_VALUES, ...initialValues },

    validationSchema: productSchema,

    // initialValues در فرم ویرایش اول خالی است و بعد از دریافتِ
    // محصول (async) پر می‌شود؛ بدون این، Formik فقط مقدار اولیه‌ی
    // اولین رندر را نگه می‌داشت و مقادیر واقعیِ محصول هرگز در فرم
    // ظاهر نمی‌شدند.
    enableReinitialize: true,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit({
          title: values.title,
          description: values.description,
          price: Number(values.price),
          discountPrice:
            values.discountPrice === "" ? null : Number(values.discountPrice),
          stock: Number(values.stock),
          brand: values.brand,
          category: values.category,
          images: parseCommaList(values.images),
          colors: parseCommaList(values.colors),
          sizes: parseCommaList(values.sizes),
          isFeatured: values.isFeatured,
        });
      } catch (error) {
        toast.error(error.message || "ذخیره محصول انجام نشد");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <Input
        label="عنوان محصول"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && formik.errors.title}
      />

      <Textarea
        label="توضیحات"
        rows={4}
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && formik.errors.description}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="قیمت (تومان)"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && formik.errors.price}
        />

        <Input
          label="قیمت تخفیف‌خورده (اختیاری)"
          name="discountPrice"
          type="number"
          value={formik.values.discountPrice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.discountPrice && formik.errors.discountPrice}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="موجودی"
          name="stock"
          type="number"
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.stock && formik.errors.stock}
        />

        <Input
          label="برند (اختیاری)"
          name="brand"
          value={formik.values.brand}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.brand && formik.errors.brand}
        />
      </div>

      <Input
        label="دسته‌بندی (اختیاری)"
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.category && formik.errors.category}
      />

      <Input
        label="لینک تصاویر (با کاما جدا کنید)"
        name="images"
        placeholder="https://example.com/1.jpg, https://example.com/2.jpg"
        value={formik.values.images}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.images && formik.errors.images}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="رنگ‌ها (اختیاری، با کاما جدا کنید)"
          name="colors"
          placeholder="قرمز, آبی, مشکی"
          value={formik.values.colors}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.colors && formik.errors.colors}
        />

        <Input
          label="سایزها (اختیاری، با کاما جدا کنید)"
          name="sizes"
          placeholder="S, M, L"
          value={formik.values.sizes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.sizes && formik.errors.sizes}
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isFeatured"
          checked={formik.values.isFeatured}
          onChange={formik.handleChange}
        />
        محصول ویژه
      </label>

      <Button type="submit" disabled={formik.isSubmitting} className="w-full">
        {formik.isSubmitting ? "در حال ذخیره..." : submitLabel}
      </Button>
    </form>
  );
}
