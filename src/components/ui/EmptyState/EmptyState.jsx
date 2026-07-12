export default function EmptyState({
  icon = "📭",
  title = "چیزی پیدا نشد",
  description = "",
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="text-6xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
