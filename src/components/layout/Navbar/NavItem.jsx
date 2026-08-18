import Link from "next/link";

export default function NavItem({ title, href, className = "", onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-sm text-gray-700 transition-colors hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 ${className}`}
    >
      {title}
    </Link>
  );
}
