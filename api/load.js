export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const kvRes = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/team_state`, {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
    });
    const data = await kvRes.json();
    let value = data.result ?? null;

    // 이중 stringify 된 경우 한 번 더 파싱
    if (typeof value === 'string') {
      try { value = JSON.parse(value); } catch (e) {}
    }
    if (typeof value === 'string') {
      try { value = JSON.parse(value); } catch (e) {}
    }

    return res.status(200).json({ value });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
