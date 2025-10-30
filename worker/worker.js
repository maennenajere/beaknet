export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400'
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders });
        }

        if (url.pathname === '/latest' && request.method === 'GET') {
            const overrideKey = url.searchParams.get('key');

            const defaultKey = 'beaknet/weather/latest.json';
            const fallbackKey = 'beaknet/latest.json';

            let keyToGet = overrideKey || defaultKey;
            let object = await env.PONTTO_BUCKET.get(keyToGet);

            if (!object && !overrideKey) {
                keyToGet = fallbackKey;
                object = await env.PONTTO_BUCKET.get(keyToGet);
            }

            if (!object) {
                return new Response('Not found', { status: 404, headers: corsHeaders });
            }

            return new Response(object.body, {
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            });
        }

        return new Response('Forbidden', { status: 403, headers: corsHeaders });
    }
};