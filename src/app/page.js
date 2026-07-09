import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import { ProductList } from "@/components/home/Products";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <ProductList />
      </main>
    </>
  );
}
