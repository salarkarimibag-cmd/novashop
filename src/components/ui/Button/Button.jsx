export default function Button({
  children,
  className = "",
  variant = "default",
  disabled = false,
  ...props
}) {
  const variants = {
    default:
      "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800",

    outline:
      "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800",

    danger:
      "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",

    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800",

    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
  };

  return (
    <button
      disabled={disabled}
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </button>
  );
}
