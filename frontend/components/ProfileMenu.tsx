"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Settings,
  UserRound,
  FilePlus2,
  Files,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginButton() {
  const { isLoggedIn, isReady, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    logout();
    setIsOpen(false);
    router.replace("/");
  }

  if (!isReady) return null;

  if (!isLoggedIn) {
    return (
      <Link
        href="/authform?mode=login"
        className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
      >
        Login
      </Link>
    );
  }

  const menuItems = [
    {
      label: "Profile",
      href: "/admin/profile",
      icon: UserRound,
    },
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Create Post",
      href: "/admin/posts/create",
      icon: FilePlus2,
    },
    {
      label: "Manage Posts",
      href: "/dashboard?overview=blogs",
      icon: Files,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open account settings"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="inline-flex items-center gap-2 rounded-full border border-black/10 p-2.5 transition hover:bg-neutral-100"
      >
        <Settings size={20} />
        <ChevronDown
          size={15}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-100 mt-3 w-56 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 text-black shadow-xl"
        >
          <div className="border-b border-neutral-100 px-3 py-3">
            <p className="text-sm font-semibold">Administrator</p>
            <p className="mt-1 text-xs text-neutral-500">admin@gmail.com</p>
          </div>

          {menuItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-neutral-100"
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}

          <div className="my-2 border-t border-neutral-100" />

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
