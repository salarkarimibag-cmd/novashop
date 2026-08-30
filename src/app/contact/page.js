import { Phone, Mail, MapPin } from "lucide-react";
import Container from "@/components/common/Container";

export const metadata = {
  title: "تماس با ما",
  alternates: { canonical: "/contact" },
};

const contacts = [
  {
    id: 1,
    title: "تلفن تماس",
    value: "09188337446",
    href: "tel:09188337446",
    icon: Phone,
  },
  {
    id: 2,
    title: "ایمیل",
    value: "info@novashop.ir",
    href: "mailto:info@novashop.ir",
    icon: Mail,
  },
  {
    id: 3,
    title: "آدرس",
    value: "کرمانشاه, ایران",
    href: "https://maps.google.com/?q=کرمانشاه، ایران",
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <main className="py-14">
      <Container>
        <h1 className="text-3xl font-bold">تماس با ما</h1>

        <p className="mt-4 max-w-2xl leading-8 text-gray-600 dark:text-gray-400">
          برای هر سوال، پیشنهاد یا پیگیری سفارش می‌توانید از راه‌های زیر با ما
          در ارتباط باشید.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {contacts.map((contact) => (
            <a
              key={contact.id}
              href={contact.href}
              target={contact.id === 3 ? "_blank" : undefined}
              rel={contact.id === 3 ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <contact.icon size={32} className="text-indigo-600 dark:text-indigo-400" />

              <h3 className="font-semibold">{contact.title}</h3>

              <p dir="ltr" className="text-sm text-gray-500 dark:text-gray-400">
                {contact.value}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </main>
  );
}
