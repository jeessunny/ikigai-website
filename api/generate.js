export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { answers } = req.body;

    if (!answers || !answers.love || !answers.skill || !answers.world || !answers.paid || !answers.moment) {
      return res.status(400).json({ error: 'Missing required answers' });
    }

    // Get Groq API key from environment variable (set in Vercel dashboard)
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured. Add GROQ_API_KEY to Vercel environment variables.' });
    }

    // Build the prompt
    const prompt = `You are a wise guide deeply versed in the philosophy of "Ikigai: The Japanese Secret to a Long and Happy Life" by Héctor García and Francesc Miralles.

A person has answered five reflective questions. Your task is NOT to summarise their answers back to them. Your task is to read between the lines — to identify the recurring themes, the underlying nature of this person, and synthesise a genuine Ikigai insight that feels earned and true.

Their answers:
1. What they lose track of time doing: "${answers.love}"
2. What people come to them for / their natural strengths: "${answers.skill}"
3. A problem in the world that troubles them: "${answers.world}"
4. What work others value enough to pay for: "${answers.paid}"
5. A moment when they felt most alive: "${answers.moment}"

Instructions for your response:
- Find the TRUE intersection: what theme connects their love, their skill, their concern for the world, and their livelihood? Name it precisely.
- Do NOT repeat their words back as sentences. Instead, interpret what those words MEAN about who they are.
- Write as a thoughtful person who has just read something revealing — warm, clear, non-prescriptive.
- The tone should feel like a wise friend who has read the book describing what they see in you.
- Avoid all coaching clichés, hollow affirmations, and generic phrases.
- Avoid corporate, inspirational, or self-help language.
- Avoid phrases like "visionary", "transformative", "force for good", "lasting impact", "meaningful innovation".
- Be psychologically observant instead of motivational.
- Write with restraint and precision.
- Keep paragraphs concise.
- Sound human, not inspirational.
- Avoid cinematic exaggeration and inspirational language.
- Prefer concrete psychological observations over abstract ideals.
- Avoid describing the user as someone destined to change the world.
- Write like a thoughtful human observer, not a therapist or philosopher.
- Avoid formal transitions like "this convergence suggests", "these answers reveal", or "this points to".
- Use slightly imperfect natural phrasing occasionally.
- Prefer simple words over elegant ones.
- Do not assume the person should turn their traits into a career.
- Avoid suggesting counseling, mentoring, coaching, or healing roles unless explicitly mentioned.
- Stay descriptive more than prescriptive.
Respond ONLY in valid JSON (no markdown, no backticks, nothing else):
{
  "core": "One sentence (12-18 words, first person 'I') that names their Ikigai at the precise intersection of all five answers. Make it poetic but earned and specific to them.",
  "para1": "A paragraph (1-2 sentence) about their inner nature — what kind of person these answers reveal, what they are fundamentally drawn to and why, interpreted not echoed.",
  "para2": "A paragraph (1-2 sentence) about the meaningful intersection the AI sees — how their love, skill, and concern for the world form a coherent thread that points somewhere specific.",
  "para3": "A paragraph (1-2 sentence) about what a realistic, honest path forward might look like — grounded in their paid work answer and their moment of feeling alive, without being prescriptive.",
  "quote": "Choose the single most relevant quote from García and Miralles' Ikigai book that resonates with this specific person's reflection. Use only real quotes from the book."
}`;

    // Call Groq API
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Fast, high quality model
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.55,
        max_tokens: 500,
        top_p: 1,
        stream: false
      })
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      console.error('Groq API Error:', errorData);
      return res.status(groqResponse.status).json({ 
        error: 'AI service error', 
        details: errorData 
      });
    }

    const data = await groqResponse.json();
    const rawText = data.choices[0].message.content;
    
    // Clean up markdown code fences if present
    const cleanText = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse JSON
    let result;
    try {
      result = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response:', rawText);
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        raw: rawText 
      });
    }

    // Return the parsed result
    return res.status(200).json(result);

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
}
