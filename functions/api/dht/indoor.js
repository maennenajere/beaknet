export async function onRequestGet(context) {
  try {
    const response = await fetch(`${context.env.PI_BASE_URL}/api/dht/indoor`, {
      headers: {
        "CF-Access-Client-Id": context.env.CF_ACCESS_CLIENT_ID,
        "CF-Access-Client-Secret": context.env.CF_ACCESS_CLIENT_SECRET,
      },
    });
    if (!response.ok) {
      throw new Error(`[api] Error: ${response.status}`);
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: "[api] Failed to fetch indoor sensor data",
      details: err.message,
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}