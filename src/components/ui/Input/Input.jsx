"use client";

import FormError from "@/components/ui/FormError";

export default function Input({ label, error, className = "", ...props }) {
  return (
    <div>
      {label && (
        <label htmlFor={props.name} className="mb-2 block font-medium">
          {label}
        </label>
      )}

      <input
        id={props.name}
        {...props}
        className={`w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-white ${className}`}
      />

      <FormError error={error} />
    </div>
  );
}
