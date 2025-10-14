import React from 'react';
import BirdieLW from "../assets/logo/birdieLW.webp";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-gray-100">
            <img src={BirdieLW} alt="Beaky logo" className="w-16 h-16 mb-4 animate-bounce " />
            <h1 className="text-6xl font-extrabold tracking-tight mb-4 text-gray-100 ">Beaky</h1>
            <p className="text-xl text-gray-400 mb-8">
                Sivusto on tilapäisesti huollossa.
                <br />
                Palaamme pian takaisin linjoille!
            </p>
            <HoverCard>
                <HoverCardTrigger className="text-m text-white mb-8 underline underline-offset-4 cursor-pointer">
                    Mistä oikein on kyse?
                </HoverCardTrigger>
                <HoverCardContent className="bg-neutral-900 text-gray-200 p-4 rounded-2xl w-80 sm:w-96 shadow-lg border border-neutral-800">
                    <p>
                        Beaky on BeakNet-projektin kurkistusaukko linnunpönttöön, joka on varustettu kameralla ja sensoreilla. Seuraa lintujen elämää ja ympäristöä reaaliajassa.
                    </p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}
