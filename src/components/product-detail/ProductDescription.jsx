export default function ProductDescription({ description = "" }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 leading-8 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-bold">
        توضیحات محصول
      </h2>

      <p className="text-gray-700 dark:text-gray-300">
        {description || "توضیحی برای این محصول ثبت نشده است."}
      </p>
    </div>
  );
}