import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Footer from "@/components/layout/Footer";
import { getGlobalData } from "@/lib/globalData";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A2540',
};

export const metadata: Metadata = {
  title: "Primeline IT Services LLC | AI-Powered Business Growth",
  description: "We integrate Artificial Intelligence into your business to deliver 10x growth. Custom AI solutions, web development, digital marketing & cybersecurity — USA-based, globally delivered.",
  keywords: [
    "AI Integration", "Artificial Intelligence Business", "Software Development",
    "Digital Transformation", "Web Development", "Cybersecurity", "Data Analytics",
    "Digital Marketing", "IT Services", "Primeline IT", "AI Solutions USA",
    "Business Growth Technology",
  ],
  authors: [{ name: "Primeline IT Services LLC" }],
  creator: "Primeline IT Services LLC",
  openGraph: {
    title: "Primeline IT Services LLC | AI-Powered Business Growth",
    description: "We plug AI into your business and watch it grow 10x. Custom solutions, marketing strategies, and intelligent automation.",
    url: "https://primeline-it.com",
    siteName: "Primeline IT Services",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primeline IT Services LLC | AI-Powered Business Growth",
    description: "We plug AI into your business and watch it grow 10x.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} font-sans bg-white antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <LayoutWrapper
          footer={<Footer initialData={globalData} />}
          contactInfo={{
            email: globalData.mainOffice?.email,
            phone: globalData.mainOffice?.phone,
          }}
        >
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
