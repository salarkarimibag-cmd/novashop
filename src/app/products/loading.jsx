import ProductGridSkeleton from "@/components/ui/Skeleton/ProductGridSkeleton";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <div
          className="
          h-10
          w-48
          animate-pulse
          rounded-xl
          bg-gray-200
          dark:bg-gray-800
          "
        />
      </div>

      <div
        className="
        grid
        gap-8
        lg:grid-cols-4
        "
      >
        {/* Sidebar */}

        <aside
          className="
          hidden
          rounded-2xl
          border
          border-gray-200
          p-5
          lg:block
          dark:border-gray-800
          "
        >
          <div className="space-y-5">
            {Array.from({
              length: 8,
            }).map((_, i) => (
              <div
                key={i}
                className="
                h-5
                animate-pulse
                rounded
                bg-gray-200
                dark:bg-gray-800
                "
              />
            ))}
          </div>
        </aside>

        {/* Products */}

        <section className="lg:col-span-3">
          <ProductGridSkeleton />
        </section>
      </div>
    </main>
  );
}
