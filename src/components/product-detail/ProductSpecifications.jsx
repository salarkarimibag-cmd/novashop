export default function ProductSpecifications({ specifications = {} }) {
  const entries = Object.entries(specifications);

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-center text-gray-500">
        مشخصاتی برای این محصول ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className="border-b last:border-b-0">
              <td className="w-1/3 bg-gray-50 px-5 py-4 font-medium">{key}</td>

              <td className="px-5 py-4">{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
