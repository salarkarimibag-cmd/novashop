import Image from "next/image";

// این نمادها هنوز به کد تأیید واقعی در سامانه‌های مربوطه وصل نیستند،
// برای همین لینک‌دار نیستند و عنوانشان «نماد اعتماد الکترونیکی» یا
// مشابه آن نیست — فقط تصویرِ عضویت/همکاری، تا ادعای تأییدیه‌ی رسمی
// نادرستی ثبت نشود.
const badges = [
  { src: "/trust-badges/kasbokar.webp", alt: "عضو اتحادیه کشوری کسب‌وکارهای مجازی" },
  { src: "/trust-badges/rezi.webp", alt: "ثبت در نماد اعتماد رضایت مشتری" },
  { src: "/trust-badges/sapra.webp", alt: "ساماندهی پیشگیری و مبارزه با سرطان" },
];

export default function TrustBadges() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-bold text-gray-300">همکاران و عضویت‌ها</h3>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {badges.map((badge) => (
          <div
            key={badge.src}
            className="flex h-16 w-16 items-center justify-center rounded-lg bg-white p-1.5"
          >
            <Image
              src={badge.src}
              alt={badge.alt}
              width={56}
              height={56}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
