import React from "react";

export default function Header() {
    return (
        <header className="w-full flex items-center justify-center py-6 bg-black border-b border-gray-800 shadow-lg">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-100">
                BeakNet
            </h1>
            <span className="text-sm font-semibold text-gray-400 ml-2">
                Alpha v0.0.1
            </span>
        </header>
    );
}
