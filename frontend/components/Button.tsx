import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Button() {
  return (
    <Link
      href="/login"
      className="group inline-flex items-center justify-center gap-2
        rounded-full border border-black/15 px-5 py-2
        text-sm font-medium text-black
        transition-all duration-200
        hover:border-black hover:bg-black hover:text-white
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-black focus-visible:ring-offset-2"
    >
      Login
      <ArrowUpRight
        size={16}
        strokeWidth={1.7}
        className="transition-transform duration-200
          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5"
      />
    </Link>
  );
}
