import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* همان آیکون سبد خرید Logo.jsx، برای هماهنگی برندینگ */}
          <svg
            width="110"
            height="110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#dc2626"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          <div style={{ display: "flex", color: "#dc2626", fontSize: 128, fontWeight: 800 }}>
            NovaShop
          </div>
        </div>

        <div style={{ display: "flex", marginTop: 28, color: "#e5e7eb", fontSize: 34 }}>
          Online Shopping Experience
        </div>
      </div>
    ),
    { ...size }
  );
}
