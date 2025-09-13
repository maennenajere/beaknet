import React from "react";
import { useTranslation } from "react-i18next";

export default function InfoPage() {
    const { t } = useTranslation();
    return (
        <div className="max-w-2xl mx-auto py-10 px-4 text-gray-200">
            <h1 className="text-3xl font-bold mb-4">{t('docs.heading')}</h1>
        </div>
    );
}
