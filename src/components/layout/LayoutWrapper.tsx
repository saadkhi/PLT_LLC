"use client";

import React from "react";
import QuoteDrawer from "./QuoteDrawer";
import QuoteButton from "./QuoteButton";
import Navbar from "./Navbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="pt-[80px]">
                {children}
            </main>
            <QuoteDrawer />
            <QuoteButton />
        </>
    );
}
