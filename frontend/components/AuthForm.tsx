"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  X,
} from "lucide-react";
import Logo from "/assets/logo.png";
import Image from "next/image";

type AuthMode = "login" | "signup" | "forgot-password" | "reset-password";

type AuthFormProps = {
  mode: AuthMode;
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgotPassword = mode === "forgot-password";
  const isResetPassword = mode === "reset-password";

  const showPasswordFields = isLogin || isSignup || isResetPassword;

  const title = {
    login: "Welcome Back",
    signup: "Create Account",
    "forgot-password": "Forgot Password?",
    "reset-password": "Set New Password",
  }[mode];

  const description = {
    login:
      "Sign in to your account to continue reading and writing amazing stories.",
    signup:
      "Create your account and start sharing your ideas with the world.",
    "forgot-password":
      "Enter your email address and we'll help you recover your account.",
    "reset-password":
      "Choose a new password to secure your account.",
  }[mode];

  const submitLabel = {
    login: "Login",
    signup: "Create Account",
    "forgot-password": "Send Reset Link",
    "reset-password": "Update Password",
  }[mode];

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (isLogin) {
      const success = login(email.trim(), password);

      if (success) {
        router.replace("/admin");
      } else {
        setError("Invalid email or password.");
      }

      return;
    }

    if (isSignup) {
      // Connect this form to your registration API when it is ready.
      setError(
        "Account registration is not connected yet. Please try again later.",
      );
      return;
    }

    if (isForgotPassword) {
      // Connect this form to your password-reset email API.
      setError(
        "Password recovery is not connected yet. Please try again later.",
      );
      return;
    }

    if (isResetPassword) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      // A real implementation must validate a reset token on the server.
      setError(
        "Password updating is not connected yet. Please use the password-reset API when it is available.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f7f9] px-4 py-8 sm:px-6 lg:flex lg:items-center lg:justify-center lg:py-12">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-black/6 bg-white shadow-[0_24px_80px_rgba(20,30,50,0.10)] lg:min-h-172.5 lg:grid-cols-2">
        {/* Left: Editorial panel */}
        <section className="relative flex min-h-85 flex-col overflow-hidden bg-[#e9edf0] p-7 sm:p-10 lg:min-h-172.5 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,255,0.95),transparent_55%),radial-gradient(ellipse_at_80%_50%,rgba(224,210,196,0.6),transparent_55%),linear-gradient(150deg,#e5ebef,#f2e9e1_55%,#b9c8d0)]" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <BookOpen size={25} strokeWidth={1.7} />

            <p
              className="w-10 h-10 font-medium text-black transition hover:text-gray-500 sm:text-3xl"
            >
              <Image src={Logo} alt="Logo"/>
            </p>
          </div>

          {/* Introduction */}
          <div className="relative z-10 mt-12 max-w-md sm:mt-16 lg:mt-24">
            <p className="mb-4 text-[11px] font-medium tracking-[0.3em] text-gray-500">
              WRITE · SHARE · GROW
            </p>

            <h1 className="text-4xl font-medium leading-[1.13] tracking-[-0.045em] text-[#171717] sm:text-5xl">
              Better Ideas
              <br />
              Through Writing
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600 sm:text-base">
              Join our community of writers, creators and curious minds. Share
              your thoughts, discover new perspectives, and be part of something
              great.
            </p>
          </div>

          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-[#343b40]/50 via-[#7d8b91]/15 to-transparent sm:h-64" />

          {/* Community */}
          <div className="relative z-10 mt-auto pt-12">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {["A", "J", "M"].map((initial, index) => (
                  <div
                    key={initial}
                    className={`flex size-10 items-center justify-center rounded-full border-2 border-white text-sm font-medium text-white ${
                      [
                        "bg-[#657b86]",
                        "bg-[#9b8276]",
                        "bg-[#535f68]",
                      ][index]
                    }`}
                  >
                    {initial}
                  </div>
                ))}
              </div>

              <div className="text-sm leading-5 text-gray-700">
                <p className="font-medium">A community of thinkers</p>
                <p className="text-gray-500">
                  Read, write, and grow together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Authentication form */}
        <section className="relative flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <Link
            href="/"
            aria-label="Back to home"
            className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-black sm:right-7 sm:top-7"
          >
            <X size={20} strokeWidth={1.6} />
          </Link>

          {/* Heading */}
          <div className="mb-7 mt-7 sm:mb-8 sm:mt-0">
            <h2 className="text-3xl font-medium tracking-tight text-[#171717] sm:text-4xl">
              {title}
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
              {description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            {isSignup && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-800"
                >
                  Full Name
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-black/5">
                  <UserRound
                    size={19}
                    className="shrink-0 text-gray-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            {!isResetPassword && (
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-800"
                >
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-black/5">
                  <Mail size={19} className="shrink-0 text-gray-400" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            {showPasswordFields && (
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-800"
                >
                  {isResetPassword ? "New Password" : "Password"}
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-black/5">
                  <LockKeyhole
                    size={19}
                    className="shrink-0 text-gray-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isLogin ? "current-password" : "new-password"
                    }
                    placeholder={
                      isLogin
                        ? "Enter your password"
                        : "Create a strong password"
                    }
                    minLength={8}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="shrink-0 text-gray-400 transition hover:text-black"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm password */}
            {isResetPassword && (
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-800"
                >
                  Confirm New Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-black/5">
                  <LockKeyhole
                    size={19}
                    className="shrink-0 text-gray-400"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm your new password"
                    minLength={8}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Remember me and forgot password */}
            {isLogin && (
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="size-4 accent-black"
                  />
                  Remember me
                </label>

                <Link
                  href="/forgot-password"
                  className="font-medium text-gray-800 transition hover:text-gray-500"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Terms */}
            {isSignup && (
              <p className="text-xs leading-5 text-gray-500">
                By creating an account, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            )}

            {/* Error message */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Success message */}
            {message && (
              <p
                role="status"
                className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700"
              >
                {message}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#171717] px-5 py-3.5 text-sm font-medium text-white transition duration-200 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              {submitLabel}

              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Social sign-in placeholder */}
          {(isLogin || isSignup) && (
            <>
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-[11px] font-medium tracking-[0.25em] text-gray-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <button
                type="button"
                onClick={() =>
                  setError("Google sign-in has not been configured yet.")
                }
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
              >
                <span className="text-lg font-bold text-[#4285F4]">G</span>
                Continue with Google
              </button>
            </>
          )}

          {/* Navigation between authentication pages */}
          <div className="mt-7 text-center text-sm text-gray-500">
            {isLogin && (
              <>
                Don{"'"}t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-black hover:underline"
                >
                  Sign up
                </Link>
              </>
            )}

            {isSignup && (
              <>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-black hover:underline"
                >
                  Login
                </Link>
              </>
            )}

            {isForgotPassword && (
              <>
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-black hover:underline"
                >
                  Back to login
                </Link>
              </>
            )}

            {isResetPassword && (
              <>
                Back to{" "}
                <Link
                  href="/login"
                  className="font-semibold text-black hover:underline"
                >
                  login
                </Link>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}