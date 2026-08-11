export const DEFAULT_SORT = "newest";

export const MIN_PRICE = 0;

export const MAX_PRICE = 100000000;

// چند برند یا دسته در یک پارامتر، جداشده با کاما: ?brand=nike,adidas
function parseList(value) {
  return value ? value.split(",").filter(Boolean) : [];
}

function parseNumber(value, fallback) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * خواندن فیلترها از URLSearchParams.
 *
 * هم سرور (از searchParams صفحه) و هم کلاینت (از useSearchParams)
 * از همین تابع استفاده می‌کنند تا شکل فیلترها یکی بماند.
 */
export function parseProductFilters(searchParams) {
  return {
    search: searchParams.get("search") || "",

    brand: parseList(searchParams.get("brand")),

    category: parseList(searchParams.get("category")),

    minPrice: parseNumber(searchParams.get("minPrice"), MIN_PRICE),

    maxPrice: parseNumber(searchParams.get("maxPrice"), MAX_PRICE),

    sort: searchParams.get("sort") || DEFAULT_SORT,
  };
}

/**
 * ساخت query string تازه با اعمال تغییرات روی پارامترهای فعلی.
 *
 * مقدار خالی پارامتر را حذف می‌کند تا URL با فیلترهای پیش‌فرض شلوغ نشود.
 */
export function buildFilterQuery(searchParams, changes) {
  const params = new URLSearchParams(searchParams);

  for (const [key, value] of Object.entries(changes)) {
    const isEmpty =
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);

    if (isEmpty) {
      params.delete(key);
    } else {
      params.set(key, Array.isArray(value) ? value.join(",") : String(value));
    }
  }

  return params.toString();
}
