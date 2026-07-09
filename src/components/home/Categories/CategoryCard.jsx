export default function CategoryCard({ category }) {
  const Icon = category.icon;

  return (
    <div className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-600 hover:shadow-lg">
      <Icon className="text-4xl text-indigo-600" />

      <h3 className="font-semibold">{category.title}</h3>
    </div>
  );
}
