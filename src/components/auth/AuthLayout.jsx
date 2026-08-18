import Link from "next/link";
import Logo from "@/components/common/Logo";

export default function AuthLayout({
  title,
  description,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <h1 className="mb-3 text-center text-2xl font-bold">{title}</h1>

        {description && (
          <p className="mb-8 text-center text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}

        {children}

        {/* صفحه‌هایی مثل بازیابی رمز لینک پایین ندارند */}
        {footerLink && (
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            {footerText}{" "}
            <Link
              href={footerLink}
              className="font-medium text-black hover:underline dark:text-white"
            >
              {footerLinkText}
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
