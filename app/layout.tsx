import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./studio.css";

const geistSans = localFont({
  src: "../public/fonts/geist-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../public/fonts/geist-mono-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "monis.rent — 3D Workspace Studio Bali | Rent Office Equipment",
  description:
    "Interactive 3D workspace studio for monis.rent. Design your dream desk, ergonomic chair, multi-screen monitors & Bali island gear with next-day villa delivery.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">{children}</body>
    </html>
  );
}
