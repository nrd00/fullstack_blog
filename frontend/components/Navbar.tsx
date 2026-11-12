"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
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
import Logo from "@/assets/logo.png";

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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close with Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/50 backdrop-blur-xl">
        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="shrink-0 text-2xl font-medium tracking-tight text-black sm:text-3xl hover:text-gray-500"
          >
            <Image src={Logo} alt="Company Logo" className="h-10 w-auto" />
          </Link>

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
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? (
              <X size={21} strokeWidth={1.7} />
            ) : (
              <Menu size={21} strokeWidth={1.7} />
            )}
          </button>

          {/* Mobile Dropdown
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
        </div> */}
        </nav>
      </header>

      {/* Mobile Bottom Sheet - Rendered outside Header */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-9999 sm:hidden ${
              isOpen
                ? "visible pointer-events-auto"
                : "invisible pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Bottom Sheet */}
            <div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={`absolute bottom-0 left-0 w-full max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ease-out ${
                isOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-5">
                <div className="h-1.5 w-12 rounded-full bg-gray-300" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Navigation
                </h2>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation"
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1 px-5 pb-5">
                {navItems.map(({ name, href, Icon }) => {
                  const active = isActive(href);

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors ${
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
                        <ArrowUpRight size={16} className="opacity-40" />
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Account Section */}
              {isReady && (
                <div className="border-t border-black/5 px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                  {isLoggedIn ? <AccountMenu /> : <Button />}
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
