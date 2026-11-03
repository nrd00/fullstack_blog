"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !isLoggedIn) {
      router.replace("/authform?mode=login");
    }
  }, [isReady, isLoggedIn, router]);

  if (!isReady || !isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
