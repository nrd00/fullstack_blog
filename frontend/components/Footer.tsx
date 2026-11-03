import Link from "next/link";
import Image from "next/image";
import Logo from "/assets/logo.png";
import { CiLinkedin } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Categories", href: "/categories" },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Logo and description */}
          <div className="max-w-sm">
            {/* Logo */}
            <Link
              href="/"
              className="shrink-0 text-2xl font-medium tracking-tight text-black sm:text-3xl hover:text-gray-500"
            >
              <Image src={Logo} alt="Company Logo" className="h-8 w-auto" />
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Explore ideas, discover stories, and share your thoughts. Your
              space for learning and inspiration.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm text-center md:text-start font-semibold text-gray-900">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3 flex gap-x-3 justify-center md:flex-col">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition hover:text-gray-700"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h3 className="text-center md:text-start text-sm font-semibold text-gray-900">
              Social
            </h3>

            <ul className="mt-4 space-y-3 flex gap-x-4 md:flex-col justify-center md:justify-start">
              <li className="text-3xl text-gray-500 transition hover:text-gray-700">
                <FaGithub />
              </li>
              <li className="text-3xl text-gray-500 transition hover:text-gray-700">
                <CiInstagram />
              </li>

              <li className="text-3xl text-gray-500 transition hover:text-gray-700">
                <CiFacebook />
              </li>

              <li className="text-3xl text-gray-500 transition hover:text-gray-700">
                <CiLinkedin />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            © 2026{" "}
            <Link href={"/"} className="text-black hover:text-gray-500">
              dev<span className="text-red-500">.</span>pen.
            </Link>{" "}
            All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 transition hover:text-gray-500"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-gray-500 transition hover:text-gray-500"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
