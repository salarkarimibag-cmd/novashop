"use client";

import { useRef, useState } from "react";

import formatPrice from "@/lib/formatPrice";

// درصد فاصله از سمت چپِ نوار، بر اساس مقدار
function leftPercentFromValue(value, min, max) {
  return ((max - value) / (max - min)) * 100;
}

// مقدار متناظر با یک درصد از سمت چپِ نوار (برعکسِ تابع بالا)
function valueFromLeftPercent(percent, min, max, step) {
  const raw = max - (percent / 100) * (max - min);
  const snapped = Math.round(raw / step) * step;

  return Math.min(max, Math.max(min, snapped));
}

/**
 * اسلایدر دو دسته‌ی محدوده‌ی قیمت (حداقل و حداکثر).
 *
 * چیدمان با راست‌به‌چپ بودن سایت هماهنگ است: دسته‌ی «حداقل» سمت راست
 * نوار می‌نشیند، دسته‌ی «حداکثر» سمت چپ — همان ترتیبی که برچسب‌های
 * زیر نوار (حداقل/حداکثر) با flex در RTL نمایش داده می‌شوند.
 *
 * در حین کشیدن فقط state محلی عوض می‌شود تا حرکت روان بماند؛
 * onCommit فقط یک‌بار، در لحظه‌ی رها کردن، صدا زده می‌شود.
 */
export default function PriceRangeSlider({
  min,
  max,
  step = 500000,
  value,
  onCommit,
}) {
  const trackRef = useRef(null);

  const [localValue, setLocalValue] = useState(value);

  const [dragging, setDragging] = useState(null); // "min" | "max" | null

  // اگر URL از بیرون عوض شود (دکمه‌ی back یا «حذف همه»)، اسلایدر همراهش بیاید.
  // تنظیم state هنگام رندر — الگوی رسمی ری‌اکت برای همگام‌سازی با props
  const [syncedValue, setSyncedValue] = useState(value);

  if (value.min !== syncedValue.min || value.max !== syncedValue.max) {
    setSyncedValue(value);

    setLocalValue(value);
  }

  const leftPercentOf = (v) => leftPercentFromValue(v, min, max);

  const clientXToValue = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();

    const percent = ((clientX - rect.left) / rect.width) * 100;

    const clampedPercent = Math.min(100, Math.max(0, percent));

    return valueFromLeftPercent(clampedPercent, min, max, step);
  };

  // مقدار تازه‌ی یک دسته را به‌صورت خالص (بدون اثر جانبی) حساب می‌کند —
  // هم برای به‌روزرسانی state و هم برای commit از همین یک محاسبه استفاده می‌شود
  const nextValueFor = (base, thumb, rawValue) => {
    if (thumb === "min") {
      return { ...base, min: Math.min(rawValue, base.max - step) };
    }

    return { ...base, max: Math.max(rawValue, base.min + step) };
  };

  const moveThumb = (thumb, rawValue) => {
    setLocalValue((prev) => nextValueFor(prev, thumb, rawValue));
  };

  // onCommit (که router.push را صدا می‌زند) هرگز نباید داخل تابعِ
  // به‌روزرسانِ setState فراخوانی شود — آن تابع باید خالص بماند، وگرنه
  // ری‌اکت با خطای «Cannot update a component while rendering a
  // different component» هشدار می‌دهد، چون Router هم خودش یک کامپوننت
  // است که در همان لحظه در حال رندر شدن است.
  const commit = (finalValue) => {
    if (finalValue.min !== value.min || finalValue.max !== value.max) {
      onCommit(finalValue);
    }
  };

  const handlePointerDown = (thumb) => (e) => {
    e.preventDefault();

    e.currentTarget.setPointerCapture(e.pointerId);

    setDragging(thumb);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;

    moveThumb(dragging, clientXToValue(e.clientX));
  };

  const handlePointerUp = () => {
    if (!dragging) return;

    setDragging(null);

    // pointerup رویدادی جداست که بعد از آخرین pointermove (و رندرِ
    // متعاقبش) اتفاق می‌افتد، پس localValue همین‌جا از قبل تازه است
    commit(localValue);
  };

  // کلیک روی خودِ نوار: نزدیک‌ترین دسته به سمتِ کلیک می‌رود
  const handleTrackClick = (e) => {
    if (e.target.dataset.thumb) return; // کلیک روی خودِ دسته، نه نوار

    const clicked = clientXToValue(e.clientX);

    const distanceToMin = Math.abs(clicked - localValue.min);

    const distanceToMax = Math.abs(clicked - localValue.max);

    const thumb = distanceToMin <= distanceToMax ? "min" : "max";

    const next = nextValueFor(localValue, thumb, clicked);

    setLocalValue(next);

    commit(next);
  };

  const handleKeyDown = (thumb) => (e) => {
    const current = localValue[thumb];

    let next = current;

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      next = current + step;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      next = current - step;
    } else if (e.key === "Home") {
      next = thumb === "min" ? min : localValue.min + step;
    } else if (e.key === "End") {
      next = thumb === "max" ? max : localValue.max - step;
    } else {
      return;
    }

    e.preventDefault();

    moveThumb(thumb, Math.min(max, Math.max(min, next)));
  };

  const handleKeyUp = () => {
    // keyup رویدادی جداست که بعد از keydown (و رندرِ متعاقبش) اتفاق
    // می‌افتد، پس localValue همین‌جا از قبل تازه است
    commit(localValue);
  };

  const minLeftPct = leftPercentOf(localValue.min);

  const maxLeftPct = leftPercentOf(localValue.max);

  return (
    <div className="px-1 pt-2 pb-1">
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative h-1.5 w-full cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700"
      >
        {/* بازه‌ی انتخاب‌شده بین دو دسته */}

        <div
          className="absolute h-full rounded-full bg-black dark:bg-white"
          style={{
            left: `${maxLeftPct}%`,
            width: `${minLeftPct - maxLeftPct}%`,
          }}
        />

        {["min", "max"].map((thumb) => (
          <button
            key={thumb}
            type="button"
            data-thumb={thumb}
            role="slider"
            aria-label={thumb === "min" ? "حداقل قیمت" : "حداکثر قیمت"}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={localValue[thumb]}
            aria-valuetext={formatPrice(localValue[thumb])}
            tabIndex={0}
            onPointerDown={handlePointerDown(thumb)}
            onKeyDown={handleKeyDown(thumb)}
            onKeyUp={handleKeyUp}
            className="
            absolute top-1/2
            h-5 w-5 -translate-x-1/2 -translate-y-1/2
            touch-none
            rounded-full border-2 border-black bg-white
            shadow
            transition-transform
            hover:scale-110
            focus:scale-110 focus:outline-none focus:ring-4 focus:ring-black/10
            dark:border-white dark:bg-gray-900 dark:focus:ring-white/10
            "
            style={{ left: `${leftPercentOf(localValue[thumb])}%` }}
          >
            {dragging === thumb && (
              <span
                className="
                pointer-events-none absolute -top-9
                left-1/2 -translate-x-1/2
                rounded-md bg-black px-2 py-1
                text-xs whitespace-nowrap text-white
                "
              >
                {formatPrice(localValue[thumb])}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
