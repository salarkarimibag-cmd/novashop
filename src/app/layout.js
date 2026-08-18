import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import { HydrationProvider, AuthProvider } from "@/components/providers";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import Script from "next/script";

import "./globals.css";

// قبل از هیدریت شدن ری‌اکت اجرا می‌شود تا کلاس "dark" روی <html> همان
// لحظه‌ی اول (بدون چشمک لحظه‌ای تم اشتباه) تنظیم شود
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var STORAGE_KEY = "nova-theme";
    var stored = localStorage.getItem(STORAGE_KEY);
    var theme;

    if (stored) {
      theme = JSON.parse(stored).state.theme;
    } else {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ state: { theme: theme }, version: 0 })
      );
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (error) {}
})();
`;

const vazir = localFont({
  src: [
    {
      path: "../assets/fonts/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],

  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="fa" data-scroll-behavior="smooth" dir="rtl">
      <body className={vazir.className}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />

        <HydrationProvider>
          <AuthProvider>
            <Header />

            <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
              {children}
            </main>

            <Footer />

            <Toaster position="top-center" richColors dir="rtl" />
          </AuthProvider>
        </HydrationProvider>
      </body>
    </html>
  );
}
