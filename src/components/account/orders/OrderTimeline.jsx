"use client";

import { Check } from "lucide-react";

import { ORDER_STATUS } from "@/constants/orderStatus";

export default function OrderTimeline({ status }) {
  const currentStep = ORDER_STATUS[status]?.step || 1;

  const steps = Object.entries(ORDER_STATUS);

  return (
    <div className="mt-6">
      <div className="relative flex justify-between">
        {/* Line */}

        <div className="absolute right-0 left-0 top-5 h-1 bg-gray-200" />

        {steps.map(([key, item]) => {
          const completed = item.step <= currentStep;

          return (
            <div key={key} className="relative z-10 flex flex-col items-center">
              <div
                className={`
                  flex h-10 w-10 items-center justify-center
                  rounded-full border-2 transition

                  ${
                    completed
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }
                `}
              >
                {completed ? <Check size={18} /> : item.step}
              </div>

              <span
                className={`
                  mt-3 max-w-20 text-center text-xs

                  ${completed ? "font-semibold text-black" : "text-gray-400"}
                `}
              >
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
