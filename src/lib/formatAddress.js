// آدرس در بک‌اند سه تکه‌ی جدا دارد: street، plaque و unit.
// هیچ فیلدی به اسم address وجود ندارد، پس نمایش آن همیشه خالی درمی‌آید.
// این تابع همان سه تکه را به یک خط خوانا تبدیل می‌کند تا هر جای برنامه
// که آدرس نشان می‌دهد، یک شکل واحد داشته باشد.
export default function formatAddress(address) {
  if (!address) return "";

  const parts = [
    address.street,
    address.plaque && `پلاک ${address.plaque}`,
    address.unit && `واحد ${address.unit}`,
  ];

  return parts.filter(Boolean).join("، ");
}
