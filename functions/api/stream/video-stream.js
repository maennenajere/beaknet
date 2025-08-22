export async function onRequestGet(context) {
  try {
    const baseUrl = context.env.PI_BASE_URL;
    const response = await fetch(`${baseUrl}/video`, {
      headers: {
        "CF-Access-Jwt-Assertion": context.env.CF_ACCESS_JWT || ""
      }
    });

    return new Response(response.body, {
      headers: {
        "Content-Type":
          response.headers.get("content-type") ||
          "multipart/x-mixed-replace; boundary=frame",
      },
    });

  } catch (err) {
    return new Response(JSON.stringify({
      error: "[api] Failed to fetch video stream",
      details: err.message,
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
