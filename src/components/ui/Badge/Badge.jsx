const variants = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  primary: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  success: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  new: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  // فقط روی تصویر اسلایدر هیرو استفاده می‌شود که همیشه یک لایه‌ی تیره
  // رویش دارد (bg-black/70)، مستقل از تم سایت؛ پس رنگش عمداً به دارک‌مود
  // واکنش نشان نمی‌دهد — وگرنه روی همان پس‌زمینه‌ی همیشه‌تیره تقریباً
  // محو می‌شد
  sale: "bg-rose-100 text-rose-700",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
