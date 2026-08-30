"use client";

import { Check } from "lucide-react";

import { ORDER_STATUS } from "@/constants/orderStatus";

function stepCircleClass(completed) {
  return `
    flex h-10 w-10 shrink-0 items-center justify-center
    rounded-full border-2 transition

    ${
      completed
        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
        : "border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500"
    }
  `;
}

function stepLabelClass(completed) {
  return completed
    ? "font-semibold text-black dark:text-white"
    : "text-gray-400 dark:text-gray-500";
}

export default function OrderTimeline({ status }) {
  const currentStep = ORDER_STATUS[status]?.step || 1;

  const steps = Object.entries(ORDER_STATUS);

  return (
    <div className="mt-6">
      {/* موبایل: تایم‌لاین عمودی، چون کنار هم چیدن ۵ مرحله روی صفحه‌های
          باریک باعث هم‌پوشانی لیبل‌ها می‌شد */}
      <div className="relative flex flex-col gap-6 md:hidden">
        <div className="absolute top-5 right-5 bottom-5 w-1 bg-gray-200 dark:bg-gray-700" />

        {steps.map(([key, item]) => {
          const completed = item.step <= currentStep;

          return (
            <div key={key} className="relative z-10 flex items-center gap-3">
              <div className={stepCircleClass(completed)}>
                {completed ? <Check size={18} /> : item.step}
              </div>

              <span className={`text-sm ${stepLabelClass(completed)}`}>
                {item.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* دسکتاپ: تایم‌لاین افقی */}
      <div className="relative hidden md:flex md:justify-between">
        <div className="absolute right-0 left-0 top-5 h-1 bg-gray-200 dark:bg-gray-700" />

        {steps.map(([key, item]) => {
          const completed = item.step <= currentStep;

          return (
            <div key={key} className="relative z-10 flex flex-col items-center">
              <div className={stepCircleClass(completed)}>
                {completed ? <Check size={18} /> : item.step}
              </div>

              <span className={`mt-3 max-w-20 text-center text-xs ${stepLabelClass(completed)}`}>
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
