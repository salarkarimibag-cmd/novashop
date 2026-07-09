import features from "@/data/features";
import FeatureCard from "./FeatureCard";
import Container from "@/components/common/Container";

export default function Features() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
