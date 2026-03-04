import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    console.log("[/api/generate] Received body:", { prompt })

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      )
    }

    // Groq API call
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data: any = await response.json()
    const result: string = data?.choices?.[0]?.message?.content ?? ""

    console.log("[/api/generate] Groq result length:", result?.length)

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error generating recipe:", error)
    return NextResponse.json(
      { error: "Failed to generate recipe" },
      { status: 500 }
    )
  }
}