export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const kvRes = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/team_state`, {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
    });
    const data = await kvRes.json();
    return res.status(200).json({ value: data.result ?? null });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
