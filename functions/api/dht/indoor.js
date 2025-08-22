export async function onRequestGet(context) {
  try {
    const baseUrl = context.env.PI_BASE_URL;
    const response = await fetch(`${baseUrl}/api/dht/indoor`, {
      headers: {
        "CF-Access-Client-Id": context.env.CF_ACCESS_CLIENT_ID,
        "CF-Access-Client-Secret": context.env.CF_ACCESS_CLIENT_SECRET,
      },
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`[api] Error: ${response.status} - ${text}`);
    }
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`[api] Unexpected content-type: ${contentType}. Body: ${text}`);
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