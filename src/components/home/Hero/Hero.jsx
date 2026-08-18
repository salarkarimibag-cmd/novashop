import Container from "@/components/common/Container";
import HeroSlider from "./HeroSlider";
import HeroBanner from "./HeroBanner";

export default function Hero() {
  return (
    <section className="mt-4">
      <Container>
        <div
          className="
          rounded-3xl border border-gray-200 bg-white p-3
          shadow-sm
          sm:p-4
          dark:border-gray-800 dark:bg-gray-900
          "
        >
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <HeroSlider />
            </div>

            <HeroBanner />
          </div>
        </div>
      </Container>
    </section>
  );
}
