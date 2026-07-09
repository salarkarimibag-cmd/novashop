import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import { ProductList } from "@/components/home/Products";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Categories />
        <ProductList />
      </main>
    </>
  );
}
