const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const { protocol, hostname, port } = new URL(apiUrl);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // اگر بک‌اند آدرس کامل تصویر بدهد، next/image بدون این تنظیم خطا می‌دهد.
    // مقدار از NEXT_PUBLIC_API_URL خوانده می‌شود تا با تغییر محیط هماهنگ بماند.
    remotePatterns: [
      {
        protocol: protocol.replace(":", ""),
        hostname,
        port,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
