"use client";

import { ReactNode } from "react";

type QuoteTriggerProps = {
    children: ReactNode;
    className: string;
    id?: string;
};

export default function QuoteTrigger({ children, className, id }: QuoteTriggerProps) {
    return (
        <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-quote-drawer"))}
            className={className}
            id={id}
        >
            {children}
        </button>
    );
}
