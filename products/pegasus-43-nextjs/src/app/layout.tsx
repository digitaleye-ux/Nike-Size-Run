import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nike Pegasus 43 - Black/White-Volt | Official Nike Store",
  description:
    "Shop the Nike Pegasus 43 in Black/White-Volt. Responsive cushioning with Nike React foam, breathable engineered mesh upper, and waffle traction outsole. Free shipping on orders $50+.",
  keywords: ["Nike Pegasus 43", "running shoes", "Nike React", "HV7521-001"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#eef0f2] items-center justify-start sm:py-6">
        {children}
      </body>
    </html>
  );
}
