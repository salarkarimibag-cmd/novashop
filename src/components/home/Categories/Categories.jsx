import { getCategories } from "@/services/categoryService";
import CategoryCard from "./CategoryCard";

export default async function Categories() {
  let categories = [];

  try {
    categories = await getCategories();
  } catch (error) {
    // خطاهای کنترلی خود Next (رندر داینامیک، redirect، notFound) با digest
    // مشخص می‌شوند؛ بلعیدن آن‌ها جریان داخلی Next را می‌شکند
    if (error?.digest) {
      throw error;
    }

    console.error(error);

    // خطای این بخش نباید کل صفحه‌ی اصلی را از کار بیندازد
    return null;
  }

  if (!categories.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold">دسته‌بندی محصولات</h2>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <CategoryCard key={category} category={category} />
        ))}
      </div>
    </section>
  );
}
