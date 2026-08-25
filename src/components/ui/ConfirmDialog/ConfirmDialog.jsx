"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import Button from "@/components/ui/Button";

// دیالوگ تأیید عمومی برای عملیات غیرقابل‌بازگشت (حذف محصول، حذف آدرس، ...).
// جایگزین window.confirm است چون آن بومی مرورگر است، رعایت RTL/تم تیره
// را نمی‌کند و همان مشکل alert() را دارد که در پروژه ممنوع است.
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "حذف",
  cancelText = "انصراف",
  loading = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl dark:bg-gray-900"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
          <AlertTriangle size={22} className="text-red-500" />
        </div>

        <h2 className="mt-4 text-lg font-bold">{title}</h2>

        {description && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            className="flex-1"
          >
            {cancelText}
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1"
          >
            {loading ? "در حال حذف..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
