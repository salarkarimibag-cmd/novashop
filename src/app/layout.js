import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import { HydrationProvider, AuthProvider } from "@/components/providers";
import { Toaster } from "sonner";
import localFont from "next/font/local";

import "./globals.css";

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
        <HydrationProvider>
          <AuthProvider>
            <Header />

            <main className="min-h-screen bg-gray-50">{children}</main>

            <Footer />

            <Toaster position="top-center" richColors dir="rtl" />
          </AuthProvider>
        </HydrationProvider>
      </body>
    </html>
  );
}
