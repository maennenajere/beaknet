import { useState, useEffect } from "react";
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import { Skeleton } from "./components/ui/skeleton";

export default function Home() {
  const [indoorData, setIndoorData] = useState({ temperature: null, humidity: null });
  const [outdoorData, setOutdoorData] = useState({ temperature: null, humidity: null });
  const [error, setError] = useState(null);

  const videoUrl = "/api/stream/video-stream";

  async function fetchSensorData() {
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
    } catch (err) {
      console.error("Virhe sensoreiden haussa:", err);
      setError("Ei saatu yhteyttä sensoreihin.");
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
          {error === "Videon lataus epäonnistui" ? (
            <span className="absolute top-3 left-2 bg-red-600 text-xs px-2 py-1 rounded z-10"><span className="font-semibold">OFFLINE</span></span>
          ) : (
            <span className="absolute top-3 left-2 bg-green-600 text-xs px-2 py-1 rounded z-10"><span className="font-semibold">LIVE</span></span>
          )}
          <img
            src={videoUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundColor: "gray",
            }}
            onError={() => setError("Videon lataus epäonnistui")}
          />
        </div>
        <div className="mt-1 w-full">
          <h2 className="text-xl font-semibold mb-1 text-gray-300">Sensoritiedot</h2>
          {error && <p className="text-red-700 font-semibold mb-1">{error}</p>}
          <p>
            <span className="font-semibold text-gray-300">Sisälämpötila:</span> {indoorData.temperature !== null ? (
              <span>
                <span className="text-orange-400">{indoorData.temperature}°C</span>, <span className="text-blue-300">{indoorData.humidity}%</span>
              </span>
            ) : <Skeleton className="h-[20px] w-[100px] rounded-full inline-block align-middle ml-2" />}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Ulkolämpötila:</span> {outdoorData.temperature !== null ? (
              <span>
                <span className="text-orange-400">{outdoorData.temperature}°C</span>, <span className="text-blue-300">{outdoorData.humidity}%</span>
              </span>
            ) : <Skeleton className="h-[20px] w-[100px] rounded-full inline-block align-middle ml-2" />}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
