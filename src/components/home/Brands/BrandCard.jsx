export default function BrandCard({ brand }) {
  return (
    <div
      className="
      flex
      h-28
      items-center
      justify-center
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-6
    "
    >
      <span className="text-xl font-bold">{brand}</span>
    </div>
  );
}
