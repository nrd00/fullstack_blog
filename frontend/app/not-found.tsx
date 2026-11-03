import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BookOpen, House, SearchX } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/assets/logo.png";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f6]">
      {/* Website Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-20 sm:px-8">
        {/* Decorative Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e9edf0]/70 blur-3xl"
        />

        <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
          {/* Brand */}
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-xl font-medium text-[#171717]"
          >
            <BookOpen size={24} strokeWidth={1.7} />
            <Image src={Logo} alt="Logo" className="h-8 w-8" />
          </Link>

          {/* Error Illustration */}
          <div className="relative mx-auto mb-8 flex size-36 items-center justify-center sm:size-44">
            <div className="absolute inset-0 rounded-full border border-dashed border-gray-300" />

            <div className="absolute inset-4 rounded-full bg-white shadow-[0_10px_40px_rgba(20,30,50,0.06)]" />

            <SearchX
              className="relative z-10 size-16 text-[#657b86] sm:size-20"
              strokeWidth={1.2}
              aria-hidden="true"
            />

            <span className="absolute right-1 top-5 rounded-full bg-[#171717] px-3 py-1.5 text-xs font-semibold tracking-wider text-white">
              404
            </span>

            <span className="absolute bottom-4 left-1 size-3 rounded-full bg-[#c9a99a]" />
          </div>

          {/* Heading */}
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#9b8276]">
            PAGE NOT FOUND
          </p>

          <h1 className="text-4xl font-medium tracking-tighter text-[#171717] sm:text-6xl">
            Lost in the
            <br />
            <span className="text-[#9b8276]">wrong chapter?</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
            Looks like this page has gone missing. The link may be broken, or
            the page may have moved. Let{"'"}s get you back to something worth
            reading.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#171717] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <House size={17} />
              Back to Home
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/blogs"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-medium text-[#171717] transition hover:border-gray-400 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
            >
              <BookOpen size={17} />
              Explore Blog
            </Link>
          </div>

          {/* Helpful Link */}
          <div className="mt-12 border-t border-gray-200 pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
            >
              <ArrowLeft size={15} />
              Return to where the story began
            </Link>
          </div>
        </div>
      </main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
