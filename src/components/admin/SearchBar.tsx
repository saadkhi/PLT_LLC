'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchBarProps {
    placeholder?: string;
}

const SearchBar = ({ placeholder = "Search..." }: SearchBarProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (query) {
                params.set('q', query);
            } else {
                params.delete('q');
            }
            router.push(`?${params.toString()}`);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, router, searchParams]);

    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-black outline-none transition placeholder:text-gray-400"
                placeholder={placeholder}
            />
        </div>
    );
};

export default SearchBar;
