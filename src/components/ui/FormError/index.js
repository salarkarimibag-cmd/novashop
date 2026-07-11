export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition
        focus:border-black
        ${error ? "border-red-500" : "border-gray-300"}
        ${className}`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}