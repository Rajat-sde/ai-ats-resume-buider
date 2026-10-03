import React from "react";
import { Download, Sparkles } from "lucide-react";

export default function Header({ onPrint, activeTab, setActiveTab }) {
    return (
        <header class="no-print bg-slate-900 text-white sticky top-0 z-50 shadow-md">
            <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Brand Name & Logo */}
                <div class="flex items-center space-x-2">
                    <Sparkles class="w-6 h-6 text-indigo-400" />
                    <h1 class="text-xl font-bold tracking-wide">
                        Resume<span class="text-indigo-400">AI</span>
                    </h1>
                </div>

                {/* Action Controls */}
                <div class="flex items-center space-x-3">
                    {/* Mobile Tab Toggle */}
                    <div class="flex sm:hidden bg-slate-800 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab("edit")}
                            class={`px-3 py-1 text-xs rounded-md font-medium transition ${activeTab === "edit"
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-400"
                                }`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setActiveTab("preview")}
                            class={`px-3 py-1 text-xs rounded-md font-medium transition ${activeTab === "preview"
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-400"
                                }`}
                        >
                            Preview
                        </button>
                    </div>

                    {/* Export PDF Button */}
                    <button
                        onClick={onPrint}
                        class="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow"
                    >
                        <Download class="w-4 h-4" />
                        <span class="hidden sm:inline">Export PDF</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
