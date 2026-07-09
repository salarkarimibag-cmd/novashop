import Container from "@/components/common/Container";
import HeroSlider from "./HeroSlider";
import HeroBanner from "./HeroBanner";

export default function Hero() {
  return (
    <section className="mt-4">
      <Container>
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <HeroSlider />
          </div>

          <HeroBanner />
        </div>
      </Container>
    </section>
  );
}
