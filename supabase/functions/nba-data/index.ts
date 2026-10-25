// Supabase Edge Function: nba-data
// Deploy with JWT verification disabled because this endpoint only returns public NBA data.
// The API Ninjas key stays server-side in the API_NINJAS_KEY secret.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
};

const respond = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "GET") return respond({ error: "Use GET." }, 405);

  const apiKey = Deno.env.get("API_NINJAS_KEY");
  if (!apiKey) return respond({ error: "API_NINJAS_KEY is not configured in Supabase secrets." }, 500);

  const url = new URL(req.url);
  const date = url.searchParams.get("date") || new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return respond({ error: "Date must use YYYY-MM-DD." }, 400);

  const headers = { "X-Api-Key": apiKey };
  const base = "https://api.api-ninjas.com/v1";
  const [gamesResponse, standingsResponse] = await Promise.all([
    fetch(`${base}/sportsgames?league=nba&date=${encodeURIComponent(date)}`, { headers }),
    fetch(`${base}/sportsstandings?league=nba`, { headers }),
  ]);

  if (!gamesResponse.ok || !standingsResponse.ok) {
    const details = !gamesResponse.ok
      ? await gamesResponse.text().catch(() => "")
      : await standingsResponse.text().catch(() => "");
    return respond({
      error: "NBA data provider request failed.",
      status: !gamesResponse.ok ? gamesResponse.status : standingsResponse.status,
      details: details.slice(0, 300),
    }, 502);
  }

  const [games, standings] = await Promise.all([gamesResponse.json(), standingsResponse.json()]);
  return respond({
    date,
    games: Array.isArray(games) ? games : [],
    standings: Array.isArray(standings) ? standings : [],
    updatedAt: new Date().toISOString(),
    provider: "API Ninjas",
  });
});
