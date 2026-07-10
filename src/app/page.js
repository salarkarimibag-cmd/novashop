import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import { ProductList } from "@/components/home/Products";
import SpecialOffers from "@/components/home/SpecialOffers";
import { Features } from "@/components/home/Features";
import { BrandSlider } from "@/components/home/Brands";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";

export default function Home() {
  return (
    <>
      <main>
        <Hero />

        <Categories />

        <NewArrivals />

        <SpecialOffers />

        <BestSellers />

        <ProductList />

        <Features />

        <BrandSlider />
      </main>
    </>
  );
}