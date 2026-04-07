'use client';

import React from 'react';
import { MessageSquareQuote } from 'lucide-react';

const QuoteButton = () => {
    const openQuoteDrawer = () => {
        window.dispatchEvent(new CustomEvent('open-quote-drawer'));
    };

    return (
        <button
            onClick={openQuoteDrawer}
            className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 sm:px-6 sm:py-3 rounded-full sm:rounded-2xl shadow-2xl shadow-orange-500/30 font-black uppercase tracking-widest hover:bg-orange-600 transition-all duration-300 z-50 transform hover:scale-110 active:scale-95 flex items-center group"
            aria-label="Get a Quote"
        >
            <MessageSquareQuote size={24} className="sm:mr-2" />
            <span className="hidden sm:inline">Get a Quote</span>
        </button>
    );
};

export default QuoteButton;
