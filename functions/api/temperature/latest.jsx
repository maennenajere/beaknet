export async function onRequestGet() {
    try {
        const response = await fetch("https://beaknet-data.hilli.workers.dev/latest");

        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        return new Response(JSON.stringify({
            error: "[api] Failed to fetch latest sensor data",
            details: err.message,
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
