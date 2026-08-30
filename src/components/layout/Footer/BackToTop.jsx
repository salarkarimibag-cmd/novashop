"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const SCROLL_THRESHOLD = 400;
const MOBILE_BREAKPOINT = 768;
const BOTTOM_FADE_DISTANCE = 150;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [bottomFade, setBottomFade] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);

      if (window.innerWidth < MOBILE_BREAKPOINT) {
        const distanceToBottom =
          document.documentElement.scrollHeight -
          (window.scrollY + window.innerHeight);
        const ratio = Math.min(
          1,
          Math.max(0, distanceToBottom / BOTTOM_FADE_DISTANCE)
        );
        setBottomFade(ratio);
      } else {
        setBottomFade(1);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const opacity = visible ? bottomFade : 0;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      style={{ opacity }}
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-lg transition-opacity duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 ${
        opacity === 0 ? "pointer-events-none" : ""
      }`}
    >
      بازگشت به بالا
      <ChevronUp size={16} />
    </button>
  );
}
