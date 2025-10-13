import type { Metadata } from "next";
import Link from "next/link";
import { Cairo, Geist_Mono } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "سوق العود | متجر العطور والبخور والاكسسوارات الفاخرة",
  description:
    "متجر إلكتروني فاخر لبيع وشراء العطور، البخور، الاكسسوارات والهدايا.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <header className="border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
            <Link href="/" className="brand-title">سوق العود</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/categories">الأقسام</Link>
              <Link href="/products">المنتجات</Link>
              <Link href="/cart">السلة</Link>
              <Link href="/login">الدخول</Link>
            </nav>
          </div>
        </header>
        <div>{children}</div>
      </body>
    </html>
  );
}
