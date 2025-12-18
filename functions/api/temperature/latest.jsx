export async function onRequestGet({ env }) {
    try {
        const response = await fetch(env.BEAKNET_DATA_API);

        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status}`);
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=30, stale-while-revalidate=30",
            },
        });

    } catch {
        return new Response(JSON.stringify({
            error: "[api] Failed to fetch latest sensor data",
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store",
            },
        });
    }
}
