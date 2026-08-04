import { getCategories } from "@/services/categoryService";
import CategoryCard from "./CategoryCard";

export default async function Categories() {
  const categories = await getCategories();

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
