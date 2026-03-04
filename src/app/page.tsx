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

    const prompt = `Generate ${count} ${cuisine} recipes for ${skill} level cooks, suitable for ${occasion}. Return a JSON array of recipes. Each recipe should have: title, subtitle, cuisine, difficulty, time, serves, ingredients (array), steps (array with detailed instructions), and a chef tip. Make it Michelin-level quality with sensory details.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        messages: [{ role: "user", content: prompt }],
      }),
    })

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`)
    }

    const data = await response.json()
    const result = data?.choices?.[0]?.message?.content ?? ""

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error generating recipe:", error)
    // Return demo recipe on error so UI doesn't break
    return NextResponse.json({ 
      result: JSON.stringify([{
        title: "Demo Recipe",
        subtitle: "API Error - Using Fallback",
        cuisine: "Generic",
        difficulty: "Easy",
        time: "30 mins",
        serves: 2,
        ingredients: ["Ingredient 1", "Ingredient 2"],
        steps: ["Step 1", "Step 2"],
        chefTip: "Check API configuration"
      }])
    })
  }
}