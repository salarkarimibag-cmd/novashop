import Link from "next/link";

import AuthLayout from "@/components/auth/AuthLayout";

// بازیابی خودکار رمز عبور (پیامک/ایمیل) هنوز روی بک‌اند پیاده نشده؛
// تا اون موقع فقط کاربر رو صادقانه به پشتیبانی هدایت می‌کنیم به‌جای
// نمایش یک فرم که کاری انجام نمی‌دهد.
export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="بازیابی رمز عبور"
      description="این قابلیت هنوز راه‌اندازی نشده. برای بازیابی رمز عبور با پشتیبانی تماس بگیرید."
      footerText="یادت اومد؟"
      footerLink="/login"
      footerLinkText="بازگشت به ورود"
    >
      <Link
        href="/contact"
        className="block w-full rounded-xl bg-black py-3 text-center font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        تماس با پشتیبانی
      </Link>
    </AuthLayout>
  );
}
