import Image from "next/image";

export default function BrandCard({ brand }) {
  return (
    <div className="flex h-28 items-center justify-center rounded-2xl border border-gray-200 bg-white p-6">
      <Image
        src={brand.logo}
        alt={brand.name}
        width={180}
        height={80}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
}
