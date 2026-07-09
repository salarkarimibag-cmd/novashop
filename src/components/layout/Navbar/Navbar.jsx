import { FiMenu } from "react-icons/fi";
import NavItem from "./NavItem";
import navLinks from "./navLinks";
import Container from "@/components/common/Container";
export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <Container className="flex h-12 items-center gap-8">
        <button className="flex items-center gap-2 font-medium">
          <FiMenu size={18} />
          <span>دسته‌بندی کالاها</span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <NavItem key={item.id} title={item.title} href={item.href} />
          ))}
        </div>
      </Container>
    </nav>
  );
}
