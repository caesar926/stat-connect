
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const apiKey = process.env.GEMINI_API_KEY
    const { course, count } = req.body

    const prompt = `Generate ${count} multiple choice statistics questions about ${course}.
    Return ONLY a JSON array, no extra text, no markdown, in this format:
    [{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}]`

    const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
    )

    const data = await geminiRes.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
   
    try {
        const questions = JSON.parse(text.replace(/```json|```/g, '').trim())
        return res.status(200).json({ questions })
    } catch {
        return res.status(500).json({ error: 'Failed to parse questions' })
    }
}
