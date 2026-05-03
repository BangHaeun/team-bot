export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, systemPrompt } = req.body;

  if (!messages || !systemPrompt) {
    return res.status(400).json({ error: 'Missing messages or systemPrompt' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages,
      }),
    });

    const data = await response.json();

    console.log('API status:', response.status);
    console.log('API response:', JSON.stringify(data));

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error', debug: data });
    }

    if (!data.content || !data.content[0]) {
      return res.status(500).json({ error: 'Unexpected response shape', debug: data });
    }

    return res.status(200).json({ content: data.content[0].text });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
