import { SITE_URL } from "@/constants/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account/",
        "/admin/",
        "/cart",
        "/checkout",
        "/login",
        "/register",
        "/forgot-password",
        "/order-success",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
