import {
  useState,
  useEffect
} from "react";
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import { Skeleton } from "./components/ui/skeleton";
import { Badge } from "./components/ui/badge";
import { Card } from "./components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./components/ui/alert";
import { Terminal } from "lucide-react";

export default function Home() {
  const [indoorData, setIndoorData] = useState({ temperature: null, humidity: null });
  const [outdoorData, setOutdoorData] = useState({ temperature: null, humidity: null });
  const [error, setError] = useState(null);
  const [isTempLoading, setIsTempLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);

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

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 60000);
    return () => clearInterval(interval);
  }, []);

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
              objectFit: "cover",
              backgroundColor: "gray",
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

        <Alert variant="destructive" className="mb-4">
          <Terminal />
          <AlertTitle>Virhe!</AlertTitle>
          <AlertDescription>
            {error},
          </AlertDescription>
        </Alert>

        {isTempLoading ? (
          <div className="w-full flex flex-col gap-2 mt-1">
            <Card className="w-full bg-neutral-800/80 border-neutral-800">
              <div className="px-4 pb-4">
                <p>
                  <span className="font-semibold text-gray-300">🌡️ Sisälämpötila:</span> <Skeleton className="h-[20px] w-[100px] rounded-full inline-block align-middle ml-2" />
                </p>
                <span className="font-semibold text-gray-300">💧 Kosteus:</span> <Skeleton className="h-[20px] w-[100px] rounded-full inline-block align-middle ml-2" />
              </div>
            </Card>
            <Card className="w-full bg-neutral-800/80 border-neutral-800">
              <div className="px-4 pb-4">
                <p>
                  <span className="font-semibold text-gray-300">🌡️ Ulkolämpötila:</span> <Skeleton className="h-[20px] w-[100px] rounded-full inline-block align-middle ml-2" />
                </p>
                <span className="font-semibold text-gray-300">💧 Kosteus:</span> <Skeleton className="h-[20px] w-[100px] rounded-full inline-block align-middle ml-2" />
              </div>
            </Card>
          </div>
        ) : (
          <>
            <Card className="mt-1 w-full bg-neutral-800/80 border-neutral-800">
              <div className="px-4 pb-4">
                <p>
                  <span className="font-semibold text-gray-300">🌡️ Sisälämpötila:</span> {indoorData.temperature !== null ? (
                    <span>
                      <span className="text-gray-400">{indoorData.temperature}°C</span>, <span className="text-blue-300">{indoorData.humidity}%</span>
                    </span>
                  ) : <span className="text-gray-400">-</span>}
                </p>
                <span className="font-semibold text-gray-300">💧 Kosteus:</span> {indoorData.humidity !== null ? (
                  <span className="text-blue-300">{indoorData.humidity}%</span>
                ) : <span className="text-gray-400">-</span>}
              </div>
            </Card>
            <Card className="mt-1 w-full bg-neutral-800/80 border-neutral-800">
              <div className="px-4 pb-4">
                <p>
                  <span className="font-semibold text-gray-300">🌡️ Ulkolämpötila:</span> {outdoorData.temperature !== null ? (
                    <span>
                      <span className="text-gray-400">{outdoorData.temperature}°C</span>,
                    </span>
                  ) : <span className="text-gray-400">-</span>}
                </p>
                <span className="font-semibold text-gray-300">💧 Kosteus:</span> {outdoorData.humidity !== null ? (
                  <span className="text-blue-300">{outdoorData.humidity}%</span>
                ) : <span className="text-gray-400">-</span>}
              </div>
            </Card>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
