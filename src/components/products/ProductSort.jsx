export default function ProductSort() {
  return (
    <div className="mb-6 flex justify-between">
      <p className="font-semibold">۱۲ محصول</p>

      <select className="rounded-xl border px-4 py-2">
        <option>جدیدترین</option>

        <option>ارزان‌ترین</option>

        <option>گران‌ترین</option>
      </select>
    </div>
  );
}
