export default function ProductDescription({ description = "" }) {
  return (
    <div className="rounded-2xl border bg-white p-6 leading-8">
      <h2 className="mb-4 text-xl font-bold">
        توضیحات محصول
      </h2>

      <p className="text-gray-700">
        {description || "توضیحی برای این محصول ثبت نشده است."}
      </p>
    </div>
  );
}