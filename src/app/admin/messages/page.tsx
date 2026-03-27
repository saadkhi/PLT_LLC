import React from 'react';
import prisma from '@/lib/prisma';
import SearchBar from '@/components/admin/SearchBar';
import MessagesTable from '@/components/admin/MessagesTable';

export default async function AdminMessagesPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const query = searchParams.q || '';

    const messages = await prisma.contactMessage.findMany({
        where: {
            OR: [
                { name: { contains: query } },
                { email: { contains: query } },
                { subject: { contains: query } },
            ],
        },
        orderBy: { created_at: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Contact Messages</h2>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <SearchBar placeholder="Search by name, email, or subject..." />
                </div>

                <MessagesTable initialMessages={messages} />
            </div>
        </div>
    );
}
