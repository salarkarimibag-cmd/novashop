import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/products?category=${encodeURIComponent(category)}`}
      className="
      flex cursor-pointer
      items-center justify-center
      rounded-2xl border
      border-gray-200
      bg-white p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-indigo-600
      hover:shadow-lg
      dark:border-gray-800
      dark:bg-gray-900
      dark:hover:border-indigo-500
      "
    >
      <h3 className="font-semibold">{category}</h3>
    </Link>
  );
}
