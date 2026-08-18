"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import NavItem from "./NavItem";
import navLinks from "./navLinks";
import Container from "@/components/common/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <Container className="flex h-12 items-center justify-between gap-8">
        {/* در md به بالا لینک‌ها مستقیم دیده می‌شوند و این دکمه لازم نیست */}
        <button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex items-center gap-2 font-medium text-gray-900 md:hidden dark:text-gray-100"
        >
          {open ? <FiX size={18} /> : <FiMenu size={18} />}

          <span>دسته‌بندی کالاها</span>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <NavItem key={item.id} title={item.title} href={item.href} />
          ))}
        </div>

        {/* در md به بالا دکمه‌ی تعویض تم در TopHeader نمایش داده می‌شود */}
        <ThemeToggle className="md:hidden" />
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
