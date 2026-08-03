export default function CategoryCard({ category }) {
  return (
    <div
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
      "
    >
      <h3 className="font-semibold">{category}</h3>
    </div>
  );
}
