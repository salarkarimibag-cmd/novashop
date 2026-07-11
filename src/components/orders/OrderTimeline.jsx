"use client";

import { ORDER_STATUS } from "@/constants/orderStatus";

export default function OrderTimeline({ status }) {
  const currentStep = ORDER_STATUS[status]?.step || 1;

  return (
    <div className="space-y-5">
      {Object.entries(ORDER_STATUS).map(([key, item], index) => {
        const completed = item.step <= currentStep;

        return (
          <div key={key} className="flex items-center gap-4">
            <div
              className={`
                flex h-10 w-10 items-center justify-center rounded-full
                ${
                  completed
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-500"
                }
                `}
            >
              {item.step}
            </div>

            <div>
              <p className={completed ? "font-bold" : "text-gray-400"}>
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
