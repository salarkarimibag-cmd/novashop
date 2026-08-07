"use client";

export default function CartSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            bg-white
            p-4
          "
        >
          {/* Image */}
          <div
            className="
              h-20
              w-20
              animate-pulse
              rounded-xl
              bg-gray-200
            "
          />

          {/* Info */}
          <div className="flex-1 space-y-3">
            <div
              className="
                h-4
                w-3/4
                animate-pulse
                rounded
                bg-gray-200
              "
            />

            <div
              className="
                h-4
                w-1/2
                animate-pulse
                rounded
                bg-gray-200
              "
            />

            <div
              className="
                h-8
                w-24
                animate-pulse
                rounded-lg
                bg-gray-200
              "
            />
          </div>
        </div>
      ))}
    </div>
  );
}
