import Link from "next/link";
import Logo from "@/components/common/Logo";
export default function AuthLayout({
  title,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {" "}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {" "}
        <div className="mb-8 flex justify-center">
          {" "}
          <Logo />{" "}
        </div>{" "}
        <h1 className="mb-8 text-center text-2xl font-bold"> {title} </h1>{" "}
        {children}{" "}
        <p className="mt-8 text-center text-sm text-gray-500">
          {" "}
          {footerText}{" "}
          <Link
            href={footerLink}
            className="font-medium text-black hover:underline"
          >
            {" "}
            {footerLinkText}{" "}
          </Link>{" "}
        </p>{" "}
      </div>{" "}
    </main>
  );
}
