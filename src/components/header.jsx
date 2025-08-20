import BirdieLW from "../assets/logo/birdieLW.webp";
import HeaderMenu from "./headerMenu";

export default function Header() {
    return (
        <header className="w-full flex items-center justify-center py-6 bg-black border-b border-gray-800 shadow-lg">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-100 flex items-center">
                <img src={BirdieLW} alt="Beaky logo" className="inline-block w-12 h-12 mr-2" />
                Beaky
            </h1>
            <span className="text-sm font-semibold text-gray-400 ml-2">
                Alpha v0.0.1
            </span>
            <div className="flex flex-col md:flex-row gap-4 ml-4">
                <HeaderMenu />
            </div>
        </header >
    );
}