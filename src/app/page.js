import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import { Products } from "@/components/home/Products";
import SpecialOffers from "@/components/home/SpecialOffers";
import { Features } from "@/components/home/Features";
import { Brands } from "@/components/home/Brands";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";

export default function Home() {
  return (
    <>
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
