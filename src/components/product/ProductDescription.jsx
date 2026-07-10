export default function ProductDescription({ product }) {
  return (
    <div className="rounded-2xl border p-6 leading-8">
      <p>{product.description}</p>
    </div>
  );
}
