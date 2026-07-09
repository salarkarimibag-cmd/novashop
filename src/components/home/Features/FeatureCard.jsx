export default function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex justify-center">
        <Icon size={40} className="text-indigo-600" />
      </div>

      <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>

      <p className="text-sm text-gray-500">{feature.description}</p>
    </div>
  );
}
