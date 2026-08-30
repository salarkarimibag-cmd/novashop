import { ChevronLeft, ChevronRight } from "lucide-react";

// صفحات مجاور فعلی (currentPage - 1 / + 1) فقط از sm به بالا دیده
// می‌شوند تا با تعداد زیاد صفحات، ردیف روی موبایل سرریز نشود
function buildPageItems(currentPage, totalPages) {
  const keep = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  const pages = [...keep].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);

  const items = [];

  let previousPage = 0;

  for (const page of pages) {
    if (previousPage && page - previousPage > 1) {
      items.push({ type: "ellipsis", key: `ellipsis-${page}` });
    }

    const isNeighbor = page === currentPage - 1 || page === currentPage + 1;

    items.push({ type: "page", page, isNeighbor });

    previousPage = page;
  }

  return items;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const items = buildPageItems(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* قبلی */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
      >
        <ChevronRight size={18} />
      </button>

      {/* شماره صفحات */}
      {items.map((item) =>
        item.type === "ellipsis" ? (
          <span
            key={item.key}
            className="flex h-9 w-9 shrink-0 items-center justify-center text-sm text-gray-400 dark:text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={item.page}
            onClick={() => onPageChange(item.page)}
            className={`h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold transition ${
              item.isNeighbor ? "hidden sm:flex" : "flex"
            } ${
              currentPage === item.page
                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                : "border-gray-200 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
            }`}
          >
            {item.page}
          </button>
        )
      )}

      {/* بعدی */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
}
