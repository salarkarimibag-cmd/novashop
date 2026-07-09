export default function FooterLinks() {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      <div>
        <h3 className="mb-4 text-xl font-bold">NovaShop</h3>

        <p className="text-gray-400">
          فروشگاه اینترنتی مدرن با بهترین قیمت و سریع‌ترین ارسال.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-bold">لینک‌های سریع</h3>

        <ul className="space-y-3 text-gray-400">
          <li>خانه</li>
          <li>محصولات</li>
          <li>درباره ما</li>
          <li>تماس با ما</li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 font-bold">تماس با ما</h3>

        <ul className="space-y-3 text-gray-400">
          <li>021-12345678</li>
          <li>info@novashop.ir</li>
          <li>تهران، ایران</li>
        </ul>
      </div>
    </div>
  );
}
