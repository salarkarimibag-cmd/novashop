import Container from "@/components/common/Container";

export default function Hero() {
  return (
    <section className="mt-4">
      <Container>
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="h-96 rounded-2xl bg-gray-200 lg:col-span-3">
            Slider
          </div>

          <div className="flex flex-col gap-4">
            <div className="h-46 rounded-2xl bg-gray-200">Banner 1</div>

            <div className="h-46 rounded-2xl bg-gray-200">Banner 2</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
