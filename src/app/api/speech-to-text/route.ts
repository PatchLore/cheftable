import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioBlob = formData.get("audio") as Blob

    if (!audioBlob) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 }
      )
    }

    // For now, we'll use the browser's Web Speech API fallback
    // In a production environment, you would integrate with Whisper API
    return NextResponse.json({
      text: "Speech recognition is currently handled client-side using Web Speech API. For production, integrate with Whisper API.",
      fallback: true,
    })
  } catch (error) {
    console.error("Error processing speech:", error)
    return NextResponse.json(
      { error: "Failed to process speech" },
      { status: 500 }
    )
  }
}