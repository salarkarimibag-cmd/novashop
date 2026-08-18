export default function Newsletter() {
  return (
    <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between">
      <div>
        <h2 className="text-3xl font-bold">عضویت در خبرنامه</h2>

        <p className="mt-2 text-gray-400">
          از جدیدترین محصولات و تخفیف‌ها باخبر شوید.
        </p>
      </div>

      <div className="flex w-full max-w-md flex-col gap-2">
        <div className="flex gap-3">
          <input
            type="email"
            disabled
            placeholder="ایمیل خود را وارد کنید"
            className="flex-1 cursor-not-allowed rounded-xl border border-gray-600 bg-gray-800 px-4 py-3 opacity-60 outline-none"
          />

          <button
            disabled
            className="cursor-not-allowed rounded-xl bg-indigo-600 px-6 font-semibold opacity-60"
          >
            عضویت
          </button>
        </div>

        <p className="text-sm text-gray-500">این قابلیت به‌زودی فعال می‌شود.</p>
      </div>
    </div>
  );
}
