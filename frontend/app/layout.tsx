import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DevPen",
    template: "%s | DevPen",
  },
  description: "Write, share, and grow with DevPen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`  h-full antialiased`}>
      <body className={`min-h-full flex flex-col ${roboto.className}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
