export async function onRequestGet({ env }) {
  try {
    const response = await fetch("https://pi.beaknet.eu/api/stream", {
      headers: {
        "CF-Access-Client-Id": env.CF_ACCESS_CLIENT_ID,
        "CF-Access-Client-Secret": env.CF_ACCESS_CLIENT_SECRET,
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream error: ${response.status}`);
    }

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-store");

    return new Response(response.body, {
      status: response.status,
      headers,
    });

  } catch (err) {
    return new Response(JSON.stringify({
      error: "[api] Failed to fetch video stream",
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}
