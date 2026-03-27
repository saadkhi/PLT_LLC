'use client';

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuoteDrawer from "@/components/layout/QuoteDrawer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-plus-jakarta-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} font-sans bg-gray-100 font-thin antialiased`}>
        {!isAdmin && <Navbar />}
        <main className={!isAdmin ? "pt-[80px]" : ""}>
          {children}
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <QuoteDrawer />}

        {/* Floating "Get a Quote" Button */}
        {!isAdmin && (
          <button id="quote-btn"
            className="fixed bottom-6 right-6 bg-orange-500 text-white px-4 py-3 rounded-lg shadow-lg font-semibold hover:bg-orange-600 transition z-50">
            Get a Quote
          </button>
        )}
      </body>
    </html>
  );
}

