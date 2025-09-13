import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <div className="flex gap-2">
            <button onClick={() => i18n.changeLanguage('fi')} aria-label="Suomi">🇫🇮</button>
            <button onClick={() => i18n.changeLanguage('en')} aria-label="English">🇬🇧</button>
            <button onClick={() => i18n.changeLanguage('sv')} aria-label="Svenska">🇸🇪</button>
        </div>
    );
}