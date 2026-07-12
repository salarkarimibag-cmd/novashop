export default function ProductSpecifications({ product }) {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full">
        <tbody>
          {Object.entries(product.specifications).map(([key, value]) => (
            <tr key={key} className="border-b last:border-b-0">
              <td className="w-1/3 bg-gray-50 px-5 py-4 font-medium">{key}</td>

              <td className="px-5 py-4">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
