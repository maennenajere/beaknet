import React, { useState, useEffect, useCallback } from 'react';
import MaintenancePage from './components/maintenancePage';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import { Badge } from './components/ui/badge';
import { Card } from './components/ui/card';
import { Toaster, toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();

    const [indoorData, setIndoorData] = useState({ temperature: null, humidity: null, timestamp: null });
    const [outdoorData, setOutdoorData] = useState({ temperature: null, humidity: null, timestamp: null });
    const [, setSensorError] = useState(null);
    const [isTempLoading, setIsTempLoading] = useState(true);
    const [isLive, setIsLive] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(null);

    const showError = useCallback((message) => {
        toast.error(message, {
            duration: 5000,
            style: { background: "#ee3c3cff", color: "#ffffffff" },
        });
    }, []);

    const fetchSensorData = useCallback(async () => {
        setIsTempLoading(true);
        try {
            const res = await fetch('/api/temperature/latest');
            if (!res.ok) throw new Error(`${res.status}`);

            const { indoor, outdoor } = await res.json();
            setIndoorData({
                temperature: indoor?.temperature?.toFixed(1) ?? null,
                humidity: indoor?.humidity?.toFixed(1) ?? null,
                timestamp: indoor?.timestamp ?? null,
            });
            setOutdoorData({
                temperature: outdoor?.temperature?.toFixed(1) ?? null,
                humidity: outdoor?.humidity?.toFixed(1) ?? null,
                timestamp: outdoor?.timestamp ?? null,
            });

            setSensorError(null);
        } catch (err) {
            const message = `Error: (${err.message})`;
            console.error('[SensorError]', err);
            setSensorError(message);
            showError(message);
        } finally {
            setIsTempLoading(false);
        }
    }, [showError]);


    useEffect(() => {
        fetchSensorData();
        const interval = setInterval(fetchSensorData, 600000);
        return () => clearInterval(interval);
    }, [fetchSensorData]);

    useEffect(() => {
        if (indoorData.timestamp) setLastUpdate(new Date(indoorData.timestamp));
    }, [indoorData.timestamp]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (lastUpdate) {
                const diffMs = Date.now() - lastUpdate.getTime();
                const diffMin = Math.floor(diffMs / 60000);
                document.title = `Päivitetty ${diffMin} min sitten`;
            }
        }, 60000);
        return () => clearInterval(interval);
    }, [lastUpdate]);

    const getHeartbeat = () => {
        if (!lastUpdate) return "⚫";
        const diffMs = Date.now() - lastUpdate.getTime();
        const diffMin = Math.floor(diffMs / 60000);
        return diffMin < 10 ? "🟢" : "🔴";
    };

    const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === "true";
    if (isMaintenance) {
        return <MaintenancePage />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-black">
            <Header />
            <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto items-center sm:items-start px-4 py-8 pb-20">
                {/* Stream */}
                <div className="w-full aspect-video rounded-md overflow-hidden shadow flex flex-col justify-center items-center relative">
                    <img
                        className="border-neutral-800 border-2 rounded-lg"
                        src="api/stream/video-stream"
                        alt="Live video stream"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={() => {
                            setIsLive(false);
                            showError("Stream ei ole saavutettavissa");
                        }}
                        onLoad={() => setIsLive(true)}
                    />
                </div>

                <div className="w-full flex mt-2 mb-5 items-center gap-3">
                    <Badge
                        variant={isLive ? "default" : "destructive"}
                        className={isLive ? "bg-green-600 text-white" : ""}
                    >
                        {isLive ? "Live" : "Offline"}
                    </Badge>

                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        {getHeartbeat()} Päivitetty{" "}
                        {lastUpdate ? new Date(lastUpdate).toLocaleTimeString("fi-FI") : "—"}
                    </span>
                </div>

                {/* Sensor cards */}
                <h2 className="text-xl font-semibold mb-1 text-gray-300 px-2">
                    {t("sensorData")}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 w-full mt-1 justify-center">
                    {/* Indoor */}
                    <Card className="bg-neutral-800/80 border-neutral-800 text-lg w-full">
                        <div className="px-4">
                            <p>
                                <span className="font-semibold text-gray-300">
                                    🌡️ {t("indoorTemperature")}:
                                </span>{" "}
                                {isTempLoading || indoorData.temperature === null ? (
                                    <span className="text-gray-500 animate-pulse">
                                        {t("loading")}
                                    </span>
                                ) : (
                                    <span className="text-gray-400">
                                        {indoorData.temperature}°C
                                    </span>
                                )}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-300">
                                    💧 {t("humidity")}:
                                </span>{" "}
                                {isTempLoading || indoorData.humidity === null ? (
                                    <span className="text-gray-500 animate-pulse">
                                        {t("loading")}
                                    </span>
                                ) : (
                                    <span className="text-blue-300">{indoorData.humidity}%</span>
                                )}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                {indoorData.timestamp
                                    ? `${t("updated")}: ${new Date(indoorData.timestamp).toLocaleString("fi-FI")}`
                                    : t("loading")}
                            </p>
                        </div>
                    </Card>

                    {/* Outdoor */}
                    <Card className="bg-neutral-800/80 border-neutral-800 text-lg w-full">
                        <div className="px-4">
                            <p>
                                <span className="font-semibold text-gray-300">
                                    🌡️ {t("outdoorTemperature")}:
                                </span>{" "}
                                {isTempLoading || outdoorData.temperature === null ? (
                                    <span className="text-gray-500 animate-pulse">
                                        {t("loading")}
                                    </span>
                                ) : (
                                    <span className="text-gray-400">
                                        {outdoorData.temperature}°C
                                    </span>
                                )}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-300">
                                    💧 {t("humidity")}:
                                </span>{" "}
                                {isTempLoading || outdoorData.humidity === null ? (
                                    <span className="text-gray-500 animate-pulse">
                                        {t("loading")}
                                    </span>
                                ) : (
                                    <span className="text-blue-300">{outdoorData.humidity}%</span>
                                )}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                {outdoorData.timestamp
                                    ? `${t("updated")}: ${new Date(outdoorData.timestamp).toLocaleString("fi-FI")}`
                                    : t("loading")}
                            </p>
                        </div>
                    </Card>
                </div>
            </main>
            <Footer />
            <Toaster />
        </div>
    );
}