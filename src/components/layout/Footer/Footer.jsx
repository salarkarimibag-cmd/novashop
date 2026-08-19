import Newsletter from "./Newsletter";
import FooterLinks from "./FooterLinks";
import SocialLinks from "./SocialLinks";
import TrustBadges from "./TrustBadges";
import BackToTop from "./BackToTop";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-gray-900 text-white">
      <BackToTop />

      <div className="mx-auto max-w-7xl px-4 py-14">
        <Newsletter />
        <div className="my-10 border-t border-gray-700" />
        <FooterLinks />
        <div className="my-10 border-t border-gray-700" />
        <SocialLinks />
        <div className="my-10 border-t border-gray-700" />
        <TrustBadges />
        <p className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} نوا‌شاپ. تمامی حقوق محفوظ است.
        </p>
        <p className="mt-2 text-center text-xs text-gray-500">
          طراحی و توسعه توسط سالار کریمی
        </p>
      </div>
    </footer>
  );
}