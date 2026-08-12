import Link from "next/link";

export default function NavItem({ title, href, className = "", onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-sm text-gray-700 transition-colors hover:text-red-600 ${className}`}
    >
      {title}
    </Link>
  );
}
