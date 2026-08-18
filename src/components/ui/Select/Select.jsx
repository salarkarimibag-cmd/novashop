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
        className={`w-full rounded-xl border bg-white px-4 py-3 text-gray-900 outline-none transition
        ${error ? "border-red-500" : "border-gray-300 dark:border-gray-700"}
        focus:border-black
        dark:bg-gray-900 dark:text-gray-100 dark:focus:border-white
        ${className}`}
      >
        {children}
      </select>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
