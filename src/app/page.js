import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import { ProductList } from "@/components/home/Products";
import SpecialOffers from "@/components/home/SpecialOffers";
import { Features } from "@/components/home/Features";
import { BrandSlider } from "@/components/home/Brands";
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Categories />
        <SpecialOffers />
        <ProductList />
        <Features />
        <BrandSlider />
      </main>
    </>
  );
}
