"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormError from "@/components/ui/FormError";

export default function Input({ label, error, className = "", ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === "password";

  return (
    <div>
      {label && (
        <label htmlFor={props.name} className="mb-2 block font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={props.name}
          {...props}
          type={isPassword && showPassword ? "text" : props.type}
          className={`w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-white ${isPassword ? "pl-10" : ""} ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      <FormError error={error} />
    </div>
  );
}
