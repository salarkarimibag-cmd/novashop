export default function Button({
  children,
  className = "",
  variant = "default",
  disabled = false,
  ...props
}) {
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",

    outline: "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100",

    danger: "bg-red-500 text-white hover:bg-red-600",

    success: "bg-emerald-600 text-white hover:bg-emerald-700",

    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
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
