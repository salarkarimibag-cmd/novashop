import OfferCard from "./OfferCard";
import offers from "@/data/offers";

export default function SpecialOffers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-bold">🔥 پیشنهادهای ویژه</h2>

        <button className="text-indigo-600 hover:underline">مشاهده همه</button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
