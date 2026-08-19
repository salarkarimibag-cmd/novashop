import { FaInstagram, FaTelegram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex justify-center gap-5 text-3xl">
      <a href="#" aria-label="اینستاگرام">
        <FaInstagram className="transition hover:text-pink-500" />
      </a>
      <a href="#" aria-label="تلگرام">
        <FaTelegram className="transition hover:text-sky-400" />
      </a>
      <a href="#" aria-label="لینکدین">
        <FaLinkedin className="transition hover:text-blue-500" />
      </a>
      <a
        href="https://github.com/salarkarimibag-cmd"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="گیت‌هاب"
      >
        <FaGithub className="transition hover:text-gray-300" />
      </a>
    </div>
  );
}
