export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 ${className}`}
    >
      {children}
    </button>
  );
}
