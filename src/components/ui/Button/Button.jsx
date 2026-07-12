export default function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const variants = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 bg-white text-black hover:bg-gray-100",
  };

  return (
    <button
      {...props}
      className={`rounded-xl px-5 py-3 font-medium transition ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </button>
  );
}
