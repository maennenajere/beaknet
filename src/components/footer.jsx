import React from "react";

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full flex items-center justify-center py-4 bg-black text-gray-400 border-t border-gray-800">
            <span>© {currentYear} <span className="font-semibold text-white">Beaky</span></span>
            <span className="hidden sm:inline mx-2">|</span>
            <span>Kaikki oikeudet pidätetään.</span>
        </footer>
    );
}
