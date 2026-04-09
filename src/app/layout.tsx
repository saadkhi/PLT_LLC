import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Footer from "@/components/layout/Footer";
import { headers } from 'next/headers';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-plus-jakarta-sans",
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#f97316', // orange-500
};

export const metadata: Metadata = {
  title: "Primeline IT Services LLC | Designing Tomorrow, Differently",
  description: "USA-based software development agency providing cutting-edge AI, web development, and digital transformation solutions.",
  keywords: ["Software Development", "AI Solutions", "Web Development", "IT Services", "Digital Transformation", "Primeline IT"],
  openGraph: {
    title: "Primeline IT Services LLC",
    description: "Designing tomorrow, differently. Scalable, high-impact software solutions.",
    url: "https://primeline-it.com",
    siteName: "Primeline IT Services",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const referer = headersList.get('referer') || '';
  const pathname = headersList.get('x-invoke-path') || '';
  const isAdmin = pathname.startsWith('/admin') || referer.includes('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} font-sans bg-white font-thin antialiased overflow-x-hidden`} suppressHydrationWarning>
        {!isAdmin ? (
          <>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <Footer />
          </>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}

