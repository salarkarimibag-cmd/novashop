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
        className={`w-full rounded-xl border p-3 outline-none transition focus:border-black ${className}`}
      />

      <FormError error={error} />
    </div>
  );
}
