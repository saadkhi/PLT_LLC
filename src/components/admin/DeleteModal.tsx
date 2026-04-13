'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }: DeleteModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 transform scale-100 animate-in zoom-in-95 duration-200">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Are you sure?</h2>
                    <p className="text-gray-500 mt-2 font-medium">
                        You are about to permanently delete <span className="text-gray-900 font-bold">&quot;{itemName}&quot;</span>. This action cannot be undone.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 px-6 rounded-2xl border border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="flex-1 py-4 px-6 rounded-2xl bg-red-600 font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-200"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
