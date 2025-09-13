import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full flex items-center justify-center py-4 bg-black text-gray-400 border-t border-gray-800">
            <span>© {currentYear} <span className="font-semibold text-white">Beaky</span></span>
            <span className="hidden sm:inline mx-2">|</span>
            <span>{t("allRightsReserved")}</span>
        </footer>
    );
}
