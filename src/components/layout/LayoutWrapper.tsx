"use client";

import { usePathname } from "next/navigation";
import QuoteDrawer from "./QuoteDrawer";
import QuoteButton from "./QuoteButton";
import Navbar from "./Navbar";

export default function LayoutWrapper({
    children,
    footer,
    contactInfo
}: {
    children: React.ReactNode,
    footer?: React.ReactNode,
    contactInfo?: { email?: string; phone?: string }
}) {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const isAdmin = pathname.startsWith('/admin');

    if (isAdmin) {
        return <main>{children}</main>;
    }

    return (
        <>
            <Navbar contactInfo={contactInfo} />
            <main className={isHome ? "" : "pt-[80px]"}>
                {children}
            </main>
            {footer}
            <QuoteDrawer />
            <QuoteButton />
        </>
    );
}
