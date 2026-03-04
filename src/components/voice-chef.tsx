'use client'

import { useEffect, useMemo, useState } from "react"

interface VoiceChefStep {
  text: string
  stage?: string
  timerMinutes?: number | null
}

interface VoiceChefRecipe {
  title: string
  subtitle: string
  steps: VoiceChefStep[]
}

interface VoiceChefProps {
  recipe: VoiceChefRecipe | null
  onClose: () => void
}

export default function VoiceChef({ recipe, onClose }: VoiceChefProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null)

  const totalSteps = recipe?.steps.length ?? 0

  const currentStep = useMemo(() => {
    if (!recipe || totalSteps === 0) return null
    return recipe.steps[Math.min(Math.max(stepIndex, 0), totalSteps - 1)]
  }, [recipe, stepIndex, totalSteps])

  // Reset step index when recipe changes
  useEffect(() => {
    if (recipe) {
      setStepIndex(0)
    }
  }, [recipe])

  // Text-to-speech on step change
  useEffect(() => {
    if (!recipe || !currentStep || typeof window === "undefined") return

    const synth = window.speechSynthesis
    if (!synth) return

    synth.cancel()

    if (!currentStep.text) return

    const utterance = new SpeechSynthesisUtterance(currentStep.text)
    utterance.rate = 0.85
    utterance.pitch = 1.0
    synth.speak(utterance)

    return () => {
      synth.cancel()
    }
  }, [recipe, currentStep])

  // Timer countdown for steps with timerMinutes
  useEffect(() => {
    if (!recipe || !currentStep || typeof window === "undefined") {
      setRemainingSeconds(null)
      return
    }

    const minutes = currentStep.timerMinutes
    if (minutes == null || isNaN(minutes as number)) {
      setRemainingSeconds(null)
      return
    }

    let secs = Math.max(Math.round((minutes as number) * 60), 0)
    setRemainingSeconds(secs)

    const id = window.setInterval(() => {
      secs -= 1
      if (secs <= 0) {
        setRemainingSeconds(0)
        window.clearInterval(id)
      } else {
        setRemainingSeconds(secs)
      }
    }, 1000)

    return () => {
      window.clearInterval(id)
    }
  }, [recipe, currentStep])

  if (!recipe || !currentStep) {
    return null
  }

  const progress =
    totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0

  const minutesPart =
    remainingSeconds != null ? Math.floor(remainingSeconds / 60) : null
  const secondsPart =
    remainingSeconds != null ? remainingSeconds % 60 : null

  const handlePrev = () => {
    setStepIndex((idx) => Math.max(idx - 1, 0))
  }

  const handleNext = () => {
    setStepIndex((idx) =>
      Math.min(idx + 1, Math.max(totalSteps - 1, 0))
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80">
      <div className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl border border-[#2e2b26] bg-[#0a0908] text-[#ede8e0] px-6 py-6 md:px-8 md:py-7 flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-sm text-[#b3aa9c] hover:text-[#ede8e0]"
        >
          Close
        </button>
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-serif font-semibold mb-1 text-[#c9a227]">
            {recipe.title}
          </h2>
          <p className="text-xs md:text-sm text-[#b3aa9c]">
            Step {stepIndex + 1} of {totalSteps}
          </p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-[#2e2b26] overflow-hidden">
            <div
              className="h-full bg-[#c9a227]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {currentStep.stage && (
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
              {currentStep.stage}
            </div>
          )}
          <p className="text-2xl md:text-3xl leading-relaxed">
            {currentStep.text}
          </p>
          {minutesPart != null && secondsPart != null && (
            <div className="mt-4 inline-flex items-center rounded-full border border-[#2e2b26] px-4 py-1.5 text-sm text-[#c9a227]">
              ⏱{" "}
              <span className="ml-2">
                {minutesPart.toString().padStart(2, "0")}:
                {secondsPart.toString().padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={stepIndex === 0}
            className="flex-1 rounded-md border border-[#2e2b26] px-4 py-3 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#141310]"
          >
            ◀ Prev
          </button>
          <button
            onClick={handleNext}
            disabled={stepIndex >= totalSteps - 1}
            className="flex-1 rounded-md bg-[#c9a227] px-4 py-3 text-sm font-medium text-[#0a0908] hover:bg-[#e0bd3a] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  )
}
export default function VoiceChef() { 
  return <div>Voice Chef Coming Soon</div>; 
}