import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import { HydrationProvider } from "@/components/providers";
import { Toaster } from "sonner";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazir.className}>
        <HydrationProvider>
          <Header />

          <main className="min-h-screen bg-gray-50">{children}</main>

          <Footer />

          <Toaster position="top-center" richColors dir="rtl" />
        </HydrationProvider>
      </body>
    </html>
  );
}
