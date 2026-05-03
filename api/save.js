export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { key, value } = req.body;
  if (!key || value === undefined) return res.status(400).json({ error: 'Missing key or value' });

  // value가 이미 문자열이면 그대로, 아니면 stringify
  const toStore = typeof value === 'string' ? value : JSON.stringify(value);

  try {
    const kvRes = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toStore),
    });
    const data = await kvRes.json();
    return res.status(200).json({ ok: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
