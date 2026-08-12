"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import NavItem from "./NavItem";
import navLinks from "./navLinks";
import Container from "@/components/common/Container";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white">
      <Container className="flex h-12 items-center gap-8">
        {/* در md به بالا لینک‌ها مستقیم دیده می‌شوند و این دکمه لازم نیست */}
        <button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex items-center gap-2 font-medium md:hidden"
        >
          {open ? <FiX size={18} /> : <FiMenu size={18} />}

          <span>دسته‌بندی کالاها</span>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <NavItem key={item.id} title={item.title} href={item.href} />
          ))}
        </div>
      </Container>

      {open && (
        <div id="mobile-nav" className="md:hidden">
          <Container className="flex flex-col pb-2">
            {navLinks.map((item) => (
              <NavItem
                key={item.id}
                title={item.title}
                href={item.href}
                className="block py-3"
                // بستن منو در خودِ رویداد کلیک، نه در useEffect
                onClick={() => setOpen(false)}
              />
            ))}
          </Container>
        </div>
      )}
    </nav>
  );
}
