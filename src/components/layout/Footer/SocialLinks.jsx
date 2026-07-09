import { FaInstagram, FaTelegram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex justify-center gap-5 text-3xl">
      <FaInstagram className="cursor-pointer transition hover:text-pink-500" />
      <FaTelegram className="cursor-pointer transition hover:text-sky-400" />
      <FaLinkedin className="cursor-pointer transition hover:text-blue-500" />
      <FaGithub className="cursor-pointer transition hover:text-gray-300" />
    </div>
  );
}
