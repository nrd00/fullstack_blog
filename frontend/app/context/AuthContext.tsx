"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  isReady: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("storage", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
};

function getSnapshot() {
  return sessionStorage.getItem("adminLoggedIn") === "true";
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

  // useSyncExternalStore handles hydration safely from the start, so isReady is always true
  const isReady = true;

  function login(email: string, password: string) {
    if (email === "admin@gmail.com" && password === "admin123") {
      sessionStorage.setItem("adminLoggedIn", "true");
      notifyListeners();
      return true;
    }

    return false;
  }

  function logout() {
    sessionStorage.removeItem("adminLoggedIn");
    notifyListeners();
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isReady, login, logout }}>
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
