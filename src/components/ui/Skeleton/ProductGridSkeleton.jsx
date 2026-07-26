import Skeleton from "./Skeleton";

function ProductCardSkeleton() {
  return (
    <div
      className="
      overflow-hidden
      rounded-2xl
      border
      bg-white
      p-4
      shadow-sm
      "
    >
      {/* Image */}
      <Skeleton className="h-56 w-full rounded-xl" />

      {/* Title */}
      <Skeleton className="mt-5 h-5 w-3/4" />

      <Skeleton className="mt-3 h-4 w-1/2" />

      {/* Rating */}
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Price */}
      <Skeleton className="mt-5 h-8 w-1/2" />

      {/* Button */}
      <Skeleton className="mt-5 h-10 w-full rounded-lg" />
    </div>
  );
}

export default function ProductGridSkeleton({ count = 8 }) {
  return (
    <div
      className="
      grid
      gap-6
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      "
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
