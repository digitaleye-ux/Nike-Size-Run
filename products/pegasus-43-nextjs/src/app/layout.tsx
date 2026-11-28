import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Nike Pegasus 43 — Black / White-Volt | Nike",
  description:
    "Men's Road Running Shoes. Nike Pegasus 43 in Black/White-Volt (HV7521-001) with Nike React foam cushioning and engineered mesh upper.",
  keywords: ["Nike Pegasus 43", "running shoes", "Nike React", "HV7521-001"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-dvh bg-white sm:bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
        {children}
      </body>
    </html>
  );
}
