"use client";

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

          <h3 className="mt-2 text-2xl font-bold">{value}</h3>
        </div>

        <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
