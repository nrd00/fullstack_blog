"use client";

import { BookOpen, Sparkles } from "lucide-react";

type LoadingProps = {
  message?: string;
  fullScreen?: boolean;
};

export default function Loading({
  message = "Preparing something worth reading...",
  fullScreen = true,
}: LoadingProps) {
  return (
    <div
      className={`flex items-center justify-center bg-[#faf9f6] ${
        fullScreen ? "min-h-screen" : "min-h-70 rounded-2xl"
      }`}
    >
      <div className="flex w-full max-w-sm flex-col items-center px-6 text-center">
        {/* Animated logo */}
        <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-[28px] bg-orange-200/50 animate-ping [animation-duration:2.5s]" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-[22px] bg-linear-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20">
            <BookOpen size={30} strokeWidth={1.8} />
          </div>

          <Sparkles
            size={19}
            className="absolute -right-2 -top-1 animate-pulse text-orange-500"
          />
        </div>

        {/* Brand / heading */}
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          Just a moment
          <span className="ml-1 inline-flex">
            <span className="animate-bounce [animation-delay:0ms]">.</span>
            <span className="animate-bounce [animation-delay:150ms]">.</span>
            <span className="animate-bounce [animation-delay:300ms]">.</span>
          </span>
        </h2>

        <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
          {message}
        </p>

        {/* Animated progress bar */}
        <div className="mt-7 h-1 w-48 overflow-hidden rounded-full bg-orange-100">
          <div className="h-full w-1/2 rounded-full bg-linear-to-r from-orange-400 to-rose-500 animate-[loading_1.5s_ease-in-out_infinite] motion-reduce:animate-none" />
        </div>

        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
          A little patience, a better read
        </p>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}
