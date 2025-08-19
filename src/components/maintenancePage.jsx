import React from 'react';
import BirdieLW from "../assets/logo/birdieLW.webp";

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-gray-100">
            <img src={BirdieLW} alt="Beaky logo" className="w-16 h-16 mb-4 animate-bounce " />
            <h1 className="text-6xl font-extrabold tracking-tight mb-4 text-gray-100 ">Beaky</h1>
            <p className="text-xl text-gray-400 mb-8">
                Sivusto on tilapäisesti huollossa.
                <br />
                Palaamme pian!
            </p>
        </div>
    );
}
