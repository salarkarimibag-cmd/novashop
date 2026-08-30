import Hero from "@/components/home/Hero";
import PromoBanner from "@/components/home/PromoBanner";
import Categories from "@/components/home/Categories";
import { Products } from "@/components/home/Products";
import SpecialOffers from "@/components/home/SpecialOffers";
import { Features } from "@/components/home/Features";
import { Brands } from "@/components/home/Brands";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* صرفاً برای سئو/screen reader؛ چون هدر بصری صفحه توسط Hero
          پوشش داده می‌شود، این h1 به‌جای بزرگ‌نمایی توی طراحی، فقط در DOM
          حضور دارد */}
      <h1 className="sr-only">
        NovaShop | خرید آنلاین محصولات دیجیتال و لوازم خانگی
      </h1>

      <PromoBanner />

      <Hero />

      <Categories />

      <NewArrivals />

      <SpecialOffers />

      <BestSellers />

      <Products />

      <Features />

      <Brands />
    </>
  );
}
