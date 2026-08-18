export default function ProductSpecifications({ specifications = {} }) {
  const entries = Object.entries(specifications);

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        مشخصاتی برای این محصول ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full">
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className="border-b border-gray-200 last:border-b-0 dark:border-gray-800">
              <td className="w-1/3 bg-gray-50 px-5 py-4 font-medium dark:bg-gray-800">{key}</td>

              <td className="px-5 py-4">{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
