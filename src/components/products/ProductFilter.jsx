"use client";

export default function ProductFilter() {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h2 className="mb-5 text-lg font-bold">فیلتر محصولات</h2>

      <div className="mb-5">
        <label className="mb-2 block text-sm">جستجو</label>

        <input
          type="text"
          placeholder="نام محصول..."
          className="
w-full
rounded-xl
border
px-3
py-2
outline-none
"
        />
      </div>

      <div className="mb-5">
        <h3 className="mb-3 font-semibold">دسته‌بندی</h3>

        <label className="block">
          <input type="checkbox" />
          کفش
        </label>

        <label className="block">
          <input type="checkbox" />
          ساعت
        </label>

        <label className="block">
          <input type="checkbox" />
          لباس
        </label>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">برند</h3>

        <label className="block">
          <input type="checkbox" />
          Nike
        </label>

        <label className="block">
          <input type="checkbox" />
          Adidas
        </label>

        <label className="block">
          <input type="checkbox" />
          Puma
        </label>
      </div>
    </div>
  );
}
