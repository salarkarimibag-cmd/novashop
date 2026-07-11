export default function Select({
  label,
  error,
  children,
  className = "",
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium">{label}</label>
      )}

      <select
        {...props}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition
        ${error ? "border-red-500" : "border-gray-300"}
        focus:border-black
        ${className}`}
      >
        {children}
      </select>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
