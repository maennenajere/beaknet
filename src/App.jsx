import React, {
  useState,
  useEffect,
  useCallback
} from "react";
import MaintenancePage from "./components/maintenancePage";
import ChartDrawer from "./components/chartDrawer";
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import { Skeleton } from "./components/ui/skeleton";
import { Badge } from "./components/ui/badge";
import { Card } from "./components/ui/card";
import { Toaster, toast } from 'sonner';

export default function Home() {
  const [indoorData, setIndoorData] = useState({ temperature: null, humidity: null });
  const [outdoorData, setOutdoorData] = useState({ temperature: null, humidity: null });
  const [indoorError, setIndoorError] = useState(null);
  const [outdoorError, setOutdoorError] = useState(null);
  const [isTempLoading, setIsTempLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);

  const showError = useCallback((message) => {
    toast.error(message, {
      duration: 5000,
      style: { background: "#ee3c3cff", color: "#ffffffff" },
    });
  }, []);

  const fetchSensorData = useCallback(async () => {
    setIsTempLoading(true);
    setIndoorError(null);
    setOutdoorError(null);
    try {
      const indoorRes = await fetch("/api/dht/indoor");
      if (!indoorRes.ok) {
        const err = await indoorRes.json();
        setIndoorError(err.error || "Tuntematon virhe sisäanturissa");
        setIndoorData({ temperature: null, humidity: null, timestamp: null });
      } else {
        const indoorJson = await indoorRes.json();
        setIndoorData({
          temperature: indoorJson.temperature?.toFixed(1),
          humidity: indoorJson.humidity?.toFixed(1),
          timestamp: indoorJson.timestamp,
        });
      }
    } catch (err) {
      setIndoorError("Virhe sisäanturin haussa: " + err.message);
      setIndoorData({ temperature: null, humidity: null, timestamp: null });
    }
    try {
      const outdoorRes = await fetch("/api/dht/outdoor");
      if (!outdoorRes.ok) {
        const err = await outdoorRes.json();
        setOutdoorError(err.error || "Tuntematon virhe ulkoanturissa");
        setOutdoorData({ temperature: null, humidity: null, timestamp: null });
      } else {
        const outdoorJson = await outdoorRes.json();
        setOutdoorData({
          temperature: outdoorJson.temperature?.toFixed(1),
          humidity: outdoorJson.humidity?.toFixed(1),
          timestamp: outdoorJson.timestamp,
        });
      }
    } catch (err) {
      setOutdoorError("Virhe ulkoanturin haussa: " + err.message);
      setOutdoorData({ temperature: null, humidity: null, timestamp: null });
    }
    setIsTempLoading(false);
  }, []);

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 60000);
    return () => clearInterval(interval);
  }, [fetchSensorData]);

  useEffect(() => {
    if (indoorError) showError(indoorError);
  }, [indoorError, showError]);

  useEffect(() => {
    if (outdoorError) showError(outdoorError);
  }, [outdoorError, showError]);

  const isMaintenance = false;
  if (isMaintenance) {
    return <MaintenancePage />;
  }

  const videoUrl = "api/stream/video-stream";

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto items-center sm:items-start px-4 py-8 pb-20">
        <div className="w-full aspect-video rounded-md overflow-hidden shadow flex flex-col justify-center items-center relative">
          <img
            src={videoUrl}
            alt="Live video stream"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundColor: "gray"
            }}
            onError={() => {
              showError("Videon lataus epäonnistui");
              setIsLive(false);
            }}
            onLoad={() => setIsLive(true)}
          />
        </div>
        <div className="w-full flex mt-2 mb-5">
          <Badge
            variant={isLive ? "default" : "destructive"}
            className={isLive ? "bg-green-600 text-white" : ""}
          >
            {isLive ? "Live" : "Offline"}
          </Badge>
        </div>
        <h2 className="text-xl font-semibold mb-1 text-gray-300 px-2 ">Sensoritiedot</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-1">
          <Card className="flex-1 bg-neutral-800/80 border-neutral-800">
            <div className="px-4 pb-4">
              <p>
                <span className="font-semibold text-gray-300">🌡️ Sisälämpötila:</span> {
                  isTempLoading || indoorData.temperature === null
                    ? <Skeleton className="h-[20px] w-[60px] rounded-full inline-block align-middle ml-2" />
                    : <span className="text-gray-400">{indoorData.temperature}°C</span>
                }
              </p>
              <p>
                <span className="font-semibold text-gray-300">💧 Kosteus:</span> {
                  isTempLoading || indoorData.humidity === null
                    ? <Skeleton className="h-[20px] w-[60px] rounded-full inline-block align-middle ml-2" />
                    : <span className="text-blue-300">{indoorData.humidity}%</span>
                }
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {indoorData.timestamp ? `Päivitetty: ${new Date(indoorData.timestamp).toLocaleString()}` : <Skeleton className="h-[16px] w-[120px] rounded-full inline-block align-middle" />}
              </p>
            </div>
          </Card>
          <Card className="flex-1 bg-neutral-800/80 border-neutral-800">
            <div className="px-4 pb-4">
              <p>
                <span className="font-semibold text-gray-300">🌡️ Ulkolämpötila:</span> {
                  isTempLoading || outdoorData.temperature === null
                    ? <Skeleton className="h-[20px] w-[60px] rounded-full inline-block align-middle ml-2" />
                    : <span className="text-gray-400">{outdoorData.temperature}°C</span>
                }
              </p>
              <p>
                <span className="font-semibold text-gray-300">💧 Kosteus:</span> {
                  isTempLoading || outdoorData.humidity === null
                    ? <Skeleton className="h-[20px] w-[60px] rounded-full inline-block align-middle ml-2" />
                    : <span className="text-blue-300">{outdoorData.humidity}%</span>
                }
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {outdoorData.timestamp ? `Päivitetty: ${new Date(outdoorData.timestamp).toLocaleString()}` : <Skeleton className="h-[16px] w-[120px] rounded-full inline-block align-middle" />}
              </p>
            </div>
          </Card>
        </div>
        <ChartDrawer />
      </main >
      <Footer />
      <Toaster />
    </div >
  );
}
