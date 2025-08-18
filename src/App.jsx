import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

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
    <main className="flex-1 flex flex-col gap-1 w-full max-w-xl mx-auto items-center sm:items-start py-8 ">
      <div className="w-full aspect-video rounded-md overflow-hidden shadow mb-2 bg-black flex flex-col justify-center items-center relative">
        {error === "Videon lataus epäonnistui" ? (
          <span className="absolute top-3 left-2 bg-red-600 text-xs px-2 py-1 rounded z-10"><span className="font-semibold">OFFLINE</span></span>
        ) : (
          <span className="absolute top-3 left-2 bg-green-600 text-xs px-2 py-1 rounded z-10"><span className="font-semibold">LIVE</span></span>
        )}
        <ReactPlayer
          url={videoUrl}
          playing
          controls
          muted
          width="100%"
          height="100%"
          onError={() => setError("Videon lataus epäonnistui")}
        />
      </div>
      <div className="mt-1 w-full">
        <h2 className="text-xl font-semibold mb-1">Sensoritiedot</h2>
        {error && <p className="text-red-500 font-semibold mb-1">{error}</p>}
        <p>
          <span className="font-semibold">Sisälämpötila:</span> {indoorData.temperature !== null ? `${indoorData.temperature}°C, ${indoorData.humidity}%` : "Ladataan..."}
        </p>
        <p>
          <span className="font-semibold">Ulkolämpötila:</span> {outdoorData.temperature !== null ? `${outdoorData.temperature}°C, ${outdoorData.humidity}%` : "Ladataan..."}
        </p>
      </div>
    </main>
  );
}
