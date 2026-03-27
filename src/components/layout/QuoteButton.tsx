'use client';

import React from 'react';

const QuoteButton = () => {
    const openQuoteDrawer = () => {
        const quoteBtn = document.getElementById('quote-btn-hidden');
        if (quoteBtn) quoteBtn.click();
        // Since we are refactoring, we should use a better way eventually.
        // For now, let's just make it a client component that can be easily replaced.
        window.dispatchEvent(new CustomEvent('open-quote-drawer'));
    };

    return (
        <button
            onClick={openQuoteDrawer}
            className="fixed bottom-6 right-6 bg-orange-500 text-white px-4 py-3 rounded-lg shadow-lg font-semibold hover:bg-orange-600 transition z-50"
        >
            Get a Quote
        </button>
    );
};

export default QuoteButton;
