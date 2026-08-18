"use client";

export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-xl
        bg-gray-200
        dark:bg-gray-800
        before:absolute
        before:inset-0
        before:-translate-x-full
        before:animate-[shimmer_1.5s_infinite]
        before:bg-linear-to-r
        before:from-transparent
        before:via-white/40
        before:to-transparent
        ${className}
      `}
    />
  );
}
