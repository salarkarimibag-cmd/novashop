import { Star } from "lucide-react";

// امتیاز از بک‌اند می‌آید (فیلد rating روی محصول)، ولی سیستم نظرات هنوز
// وجود ندارد — نه مدلی در بک‌اند و نه endpointی. پس اینجا هیچ شماری
// نمایش داده نمی‌شود؛ عددی که پشتوانه ندارد بدتر از نبودنش است.
export default function ProductReviews({ product }) {
  return (
    <div className="rounded-2xl border p-6">
      <div className="mb-6 flex items-center gap-2">
        <Star size={20} className="fill-yellow-400 text-yellow-400" />

        <span className="text-xl font-bold">{product.rating || 0}</span>

        <span className="text-gray-500">امتیاز محصول</span>
      </div>

      <p className="text-gray-600">هنوز نظری برای این محصول ثبت نشده است.</p>
    </div>
  );
}
