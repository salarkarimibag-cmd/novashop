import Newsletter from "./Newsletter";
import FooterLinks from "./FooterLinks";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <Newsletter />

        <div className="my-10 border-t border-gray-700" />

        <FooterLinks />

        <div className="my-10 border-t border-gray-700" />

        <SocialLinks />

        <p className="mt-8 text-center text-sm text-gray-400">
          © 2026 NovaShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
