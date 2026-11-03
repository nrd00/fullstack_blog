"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import axiosInstance from "@/libs/axiosinstances";
import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  isReady: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }

  return () => {
    listeners.delete(listener);

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
};

// Read authentication data from sessionStorage
function getSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem("accessToken") !== null;
}

function getServerSnapshot() {
  return false;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const isLoggedIn = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isReady = true;

  // Login using backend API
 async function login(email: string, password: string) {
  try {

    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });


    const { accessToken, user } = response.data;

    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("authUser", JSON.stringify(user));

    notifyListeners();

    return true;
  } catch (error: unknown) {

    if (axios.isAxiosError(error)) {
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
      console.log("Request URL:", error.config?.url);
      console.log("Base URL:", error.config?.baseURL);
    }

    return false;
  }
}

  function logout() {
  window.sessionStorage.removeItem("accessToken");
  window.sessionStorage.removeItem("authUser");

  notifyListeners();
}

  const user = (() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUser = window.sessionStorage.getItem("authUser");

    try {
      return storedUser ? (JSON.parse(storedUser) as User) : null;
    } catch {
      return null;
    }
  })();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isReady,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
