import React from "react";

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full flex items-center justify-center py-4 bg-black text-gray-400 border-t border-gray-800">
            © {currentYear} Beaky. Kaikki oikeudet pidätetään.
        </footer>
    );
}
