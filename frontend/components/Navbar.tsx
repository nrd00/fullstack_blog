"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Hand,
  Newspaper,
  Menu,
  X,
  ArrowUpRight,
  Timeline,
} from "lucide-react";
import Button from "./Button";
import AccountMenu from "./ProfileMenu";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Logo from "/assets/logo.png";

const navItems = [
  { name: "Home", href: "/", Icon: House },
  { name: "About", href: "/about", Icon: Hand },
  { name: "Blogs", href: "/blogs", Icon: Newspaper },
  { name: "Categories", href: "/categories", Icon: Timeline },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { isLoggedIn, isReady } = useAuth();

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/50 backdrop-blur-xl">
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          onClick={() => setIsOpen(false)}
          className="shrink-0 text-2xl font-medium tracking-tight text-black sm:text-3xl hover:text-gray-500"
        >
          <Image src={Logo} alt="Company Logo" className="h-10 w-auto" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 sm:flex md:gap-9">
          {navItems.map(({ href, Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group flex min-w-8 flex-col items-center gap-1 border-b-2 py-1 transition-colors sm:min-w-14 ${
                  active
                    ? "border-black text-black"
                    : "text-black border-transparent hover:text-gray-500"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={1.7}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5"
                />

                {/* <span className="relative text-sm font-normal sm:text-base">
                  {name}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-black transition-transform duration-200 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </span> */}
              </Link>
            );
          })}

          {isReady && (isLoggedIn ? <AccountMenu /> : <Button />)}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex size-10 items-center justify-center rounded-full border border-black/10 text-black transition-colors hover:bg-black/5 sm:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? (
            <X size={21} strokeWidth={1.7} />
          ) : (
            <Menu size={21} strokeWidth={1.7} />
          )}
        </button>

        {/* Mobile Dropdown */}
        <div
          id="mobile-navigation"
          className={`absolute left-0 right-0 top-full overflow-visible border-b border-black/5 bg-white/95 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 sm:hidden ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <div className="mx-auto max-w-7xl space-y-1 px-5 py-4 sm:px-8">
            {navItems.map(({ name, href, Icon }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                    active
                      ? "bg-black/5 text-black"
                      : "text-gray-600 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={20} strokeWidth={1.7} />
                    <span className="text-sm font-medium">{name}</span>
                  </span>

                  <span className="flex items-center gap-2">
                    {active && (
                      <span className="size-1.5 rounded-full bg-black" />
                    )}
                    <ArrowUpRight
                      size={16}
                      className="opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="pb-4 px-5 ">
            {isReady && (isLoggedIn ? <AccountMenu /> : <Button />)}
          </div>
        </div>
      </nav>
    </header>
  );
}
