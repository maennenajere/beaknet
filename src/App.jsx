import {
  useState,
  useEffect
} from "react";
import MaintenancePage from "./components/maintenancePage";
import ChartDrawer from "./components/chartDrawer";
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import { Skeleton } from "./components/ui/skeleton";
import { Badge } from "./components/ui/badge";
import { Card } from "./components/ui/card";
import { Toaster } from 'sonner';

export default function Home() {
  const [indoorData, setIndoorData] = useState({ temperature: null, humidity: null });
  const [outdoorData, setOutdoorData] = useState({ temperature: null, humidity: null });
  const [error, setError] = useState(null);
  const [isTempLoading, setIsTempLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 60000);
    return () => clearInterval(interval);
  }, []);

  const isMaintenance = true;
  if (isMaintenance) {
    return <MaintenancePage />;
  }

  const videoUrl = "/api/stream/video-stream";

  async function fetchSensorData() {
    setIsTempLoading(true);
    try {
      const indoorRes = await fetch("/api/dht/indoor");
      const indoorJson = await indoorRes.json();
      setIndoorData({
        temperature: indoorJson.temperature.toFixed(1),
        humidity: indoorJson.humidity.toFixed(1),
        timestamp: indoorJson.timestamp,
      });

      const outdoorRes = await fetch("/api/dht/outdoor");
      const outdoorJson = await outdoorRes.json();
      setOutdoorData({
        temperature: outdoorJson.temperature.toFixed(1),
        humidity: outdoorJson.humidity.toFixed(1),
        timestamp: outdoorJson.timestamp,
      });
      setError(null);
    } catch (err) {
      console.error("Virhe sensoreiden haussa:", err);
      setError("Ei saatu yhteyttä sensoreihin.");
    } finally {
      setIsTempLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto items-center sm:items-start px-4 py-8 pb-20">
        <div className="w-full aspect-video rounded-md overflow-hidden shadow flex flex-col justify-center items-center relative">
          <img
            src={videoUrl}
            style={{
              width: "100%",
              height: "100%",
              alt: "Live video stream",
              objectFit: "cover",
              backgroundColor: "#111111",
            }}
            onError={() => {
              setError("Videon lataus epäonnistui");
              setIsLive(false);
            }}
            onLoad={() => setIsLive(true)}
          />
        </div>
        <div className="w-full flex mt-2 mb-5">
          <Badge variant={isLive ? "default" : "destructive"}>
            {isLive ? "Live" : "Offline"}
          </Badge>
        </div>

        <h2 className="text-xl font-semibold mb-1 text-gray-300 px-2 ">Sensoritiedot</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-1">
          <Card className="flex-1 bg-neutral-800/80 border-neutral-800">
            <div className="px-4 pb-4">
              <p>
                <span className="font-semibold text-gray-300">🌡️ Sisälämpötila:</span> {
                  isTempLoading || error || indoorData.temperature === null
                    ? <Skeleton className="h-[20px] w-[60px] rounded-full inline-block align-middle ml-2" />
                    : <span className="text-gray-400">{indoorData.temperature}°C</span>
                }
              </p>
              <p>
                <span className="font-semibold text-gray-300">💧 Kosteus:</span> {
                  isTempLoading || error || indoorData.humidity === null
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
                  isTempLoading || error || outdoorData.temperature === null
                    ? <Skeleton className="h-[20px] w-[60px] rounded-full inline-block align-middle ml-2" />
                    : <span className="text-gray-400">{outdoorData.temperature}°C</span>
                }
              </p>
              <p>
                <span className="font-semibold text-gray-300">💧 Kosteus:</span> {
                  isTempLoading || error || outdoorData.humidity === null
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
        {error && (
          <p className="text-red-500 text-xs">{error}</p>
        )}
        <ChartDrawer />
        <Toaster />
      </main >
      <Footer />
    </div >
  );
}
