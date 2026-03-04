import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { cuisine, skill, occasion, count } = await request.json()

    if (!cuisine || !skill || !occasion || !count) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const sessionId = Math.random().toString(36).slice(2)

    const prompt = `You are a world-class chef. Generate exactly ${count} UNIQUE ${cuisine} recipes for ${skill} level cooks, suitable for ${occasion}.
Each recipe MUST be completely different from the others. Do not repeat any dish names, ingredients, or cooking techniques.
Session ID: ${sessionId} (use this to ensure uniqueness).

Return ONLY a valid JSON array with no markdown and no explanation.
Each recipe object must have:
- title (string)
- subtitle (string, poetic one-liner)
- cuisine (string)
- stars (number, 1-3)
- difficulty (\"Approachable\" | \"Intermediate\" | \"Advanced\")
- totalTime (number, minutes)
- serves (number)
- emoji (string, optional)
- keyTechnique (2 sentences: what the technique is and why it elevates this dish)
- chefTip (1 sharp insider sentence)
- ingredients: array of objects { "name": string, "amount": string } (8-12 items)
- steps: array of objects { "text": string, "timerMinutes": number | null }.

Return STRICT JSON only.`

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 1.0,
        top_p: 0.95,
        max_tokens: 8000,
        messages: [{ role: "user", content: prompt }],
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("Groq error body:", errorBody)
      throw new Error(`Groq API error: ${response.status} - ${errorBody}`)
    }

    const data = await response.json()
    const result = data?.choices?.[0]?.message?.content ?? ""
    console.log("Groq raw result length:", result.length)
    console.log("Groq raw result preview:", result.slice(0, 200))

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Generate route error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
