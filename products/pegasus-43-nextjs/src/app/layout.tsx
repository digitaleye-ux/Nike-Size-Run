import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nike Pegasus 43 Men's Road Running Shoes. Nike.com",
  description:
    "Shop the Nike Pegasus 43 in Black/White-Volt (HV7521-001). Responsive Nike React foam cushioning and breathable engineered mesh.",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-dvh bg-[#ffffff] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
