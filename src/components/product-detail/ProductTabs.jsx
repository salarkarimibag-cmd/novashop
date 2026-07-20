"use client";

import { useState } from "react";

import ProductDescription from "./ProductDescription";
import ProductSpecifications from "./ProductSpecifications";
import ProductReviews from "./ProductReviews";

const tabs = [
  {
    id: "description",
    label: "توضیحات",
  },
  {
    id: "specifications",
    label: "مشخصات",
  },
  {
    id: "reviews",
    label: "نظرات",
  },
];

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <section className="mt-16">
      <div className="mb-8 flex flex-wrap gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-4 py-3 transition ${
              activeTab === tab.id
                ? "border-black font-semibold"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "description" && <ProductDescription product={product} />}

      {activeTab === "specifications" && (
        <ProductSpecifications product={product} />
      )}

      {activeTab === "reviews" && <ProductReviews product={product} />}
    </section>
  );
}
