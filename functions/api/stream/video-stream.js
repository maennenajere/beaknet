export async function onRequest(context) {
  try {
    const response = await fetch(`https://pi.beaknet.eu/video`, {
      headers: {
        "CF-Access-Client-Id": context.env.CF_ACCESS_CLIENT_ID,
        "CF-Access-Client-Secret": context.env.CF_ACCESS_CLIENT_SECRET,
      },
    })

    return new Response(response.body, {
      headers: {
        "Content-Type": response.headers.get("content-type") || "video/mp4",
      },
    })
  } catch (err) {
    return new Response(JSON.stringify({
      error: "[api] Failed to fetch video stream",
      details: err.message,
    }), { status: 500 })
  }
}