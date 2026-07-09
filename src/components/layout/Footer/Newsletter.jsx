export default function Newsletter() {
  return (
    <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between">
      <div>
        <h2 className="text-3xl font-bold">عضویت در خبرنامه</h2>

        <p className="mt-2 text-gray-400">
          از جدیدترین محصولات و تخفیف‌ها باخبر شوید.
        </p>
      </div>

      <div className="flex w-full max-w-md gap-3">
        <input
          type="email"
          placeholder="ایمیل خود را وارد کنید"
          className="flex-1 rounded-xl border border-gray-600 bg-gray-800 px-4 py-3 outline-none focus:border-indigo-500"
        />

        <button className="rounded-xl bg-indigo-600 px-6 font-semibold transition hover:bg-indigo-700">
          عضویت
        </button>
      </div>
    </div>
  );
}
