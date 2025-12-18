# BeakNet Dashboard - Beaky

Dashboard showing live camera feed and real-time sensor data.

## Tech Stack

- **Frontend:** React + Vite  
- **Styling:** Tailwind CSS  
- **Backend / API:** Cloudflare Workers  
- **Stream backend:** Raspberry Pi Zero 2 W running Flask  

## Features

- Live MJPEG camera stream from the Raspberry Pi  
- Indoor and outdoor sensor readings (temperature, humidity)  
- Public API providing read-only sensor data  
- Private stream endpoint secured with Cloudflare Access
