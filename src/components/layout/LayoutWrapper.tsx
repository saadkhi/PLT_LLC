"use client";

import { usePathname } from "next/navigation";
import QuoteDrawer from "./QuoteDrawer";
import QuoteButton from "./QuoteButton";
import Navbar from "./Navbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <>
            <Navbar />
            <main className={isHome ? "" : "pt-[80px]"}>
                {children}
            </main>
            <QuoteDrawer />
            <QuoteButton />
        </>
    );
}
