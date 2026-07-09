import Link from "next/link";

export default function NavItem({ title, href }) {
  return (
    <Link
      href={href}
      className="text-sm text-gray-700 transition-colors hover:text-red-600"
    >
      {title}
    </Link>
  );
}