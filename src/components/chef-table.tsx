"use client"

import { useState } from "react"
import Card from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import VoiceChef from "@/components/voice-chef"

interface Recipe {
  title: string
  subtitle: string
  cuisine: string
  stars: number
  difficulty: string
  totalTime: number
  serves: number
  emoji?: string
  keyTechnique: string
  chefTip?: string
  ingredients: Array<{ name: string; amount: string }>
  steps: Array<{ text: string; stage?: string; timerMinutes?: number | null; sensoryCues?: Array<{ type: string; cue: string }> }>
}

export default function ChefTable() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [cuisine, setCuisine] = useState("varied")
  const [skill, setSkill] = useState("intermediate")
  const [occasion, setOccasion] = useState("dinner party")
  const [count, setCount] = useState("6")
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [cardRecipe, setCardRecipe] = useState<Recipe | null>(null)
  const [voiceRecipe, setVoiceRecipe] = useState<Recipe | null>(null)

  const generateRecipes = async () => {
    console.log("ChefTable generate click params:", {
      cuisine,
      skill,
      occasion,
      count,
    })

    setLoading(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cuisine, skill, occasion, count }),
      })

      const data = await response.json()
      console.log("ChefTable API raw result:", data)
      if (!data || typeof data.result !== "string") {
        throw new Error(data?.error ?? "API returned no result")
      }

      const cleaned = data.result.replace(/```json|```/g, "").trim()
      let parsed = JSON.parse(cleaned)
      // Handle cases where Groq wraps the array in an object
      if (!Array.isArray(parsed)) {
        parsed =
          parsed.recipes ??
          parsed.data ??
          parsed.result ??
          Object.values(parsed)[0] ??
          []
      }
      const parsedRecipes: Recipe[] = Array.isArray(parsed) ? parsed : [parsed]
      console.log("New recipes:", parsedRecipes.map((r: Recipe) => r.title))
      setRecipes(parsedRecipes)
    } catch (error) {
      console.error("Error generating recipes:", error)
      // Fallback to demo recipes
      setRecipes(getDemoRecipes())
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="section active" id="chefSection">
      <div className="sec-header">
        <h1 className="title">The <em>Chef's</em> Table</h1>
        <p className="subtitle">
          Michelin-level recipes generated for your skill, occasion, and cuisine — every time unique, every time technically precise.
        </p>
      </div>

      <div className="ctrl-bar">
        <div className="ctrl">
          <label className="label">Cuisine</label>
          <select 
            id="cuisine" 
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="input-field"
          >
            <option value="varied">Surprise Me</option>
            <option value="French">French</option>
            <option value="Japanese">Japanese</option>
            <option value="Italian">Italian</option>
            <option value="Nordic">Nordic</option>
            <option value="Modern British">Modern British</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
        <div className="ctrl">
          <label className="label">Skill</label>
          <select 
            id="skill" 
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="input-field"
          >
            <option value="ambitious beginner">Beginner</option>
            <option value="intermediate" selected>Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="ctrl">
          <label className="label">Occasion</label>
          <select 
            id="occasion" 
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="input-field"
          >
            <option value="dinner party">Dinner Party</option>
            <option value="date night">Date Night</option>
            <option value="weekend project">Weekend Project</option>
            <option value="solo indulgence">Solo Indulgence</option>
          </select>
        </div>
        <div className="ctrl">
          <label className="label">Count</label>
          <select 
            id="recCount" 
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="input-field"
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="6" selected>6</option>
          </select>
        </div>
        <Button 
          onClick={generateRecipes}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>

      <div id="chefResults">
        {loading ? (
          <div className="r-grid">
            {Array.from({ length: parseInt(count) }, (_, i) => (
              <div key={i} className="card">
                <div className="sk" style={{ height: "9px", width: "80px", marginBottom: "12px" }}></div>
                <div className="sk" style={{ height: "26px", width: "75%", marginBottom: "8px" }}></div>
                <div className="sk" style={{ height: "12px", width: "90%", marginBottom: "4px" }}></div>
                <div className="sk" style={{ height: "12px", width: "60%", marginBottom: "18px" }}></div>
                <div className="sk" style={{ height: "56px", marginBottom: "14px" }}></div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div className="sk" style={{ height: "34px", flex: 1 }}></div>
                  <div className="sk" style={{ height: "34px", flex: 1 }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <div className="r-grid">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="card cursor-pointer"
                onClick={() =>
                  setExpandedId(expandedId === index ? null : index)
                }
              >
                <div className="r-top">
                  <div className="r-cuisine">{recipe.cuisine}</div>
                  <div className="r-stars">{'✦'.repeat(recipe.stars || 1)}</div>
                </div>
                <div className="r-title">{recipe.emoji || ''} {recipe.title}</div>
                <div className="r-sub">{recipe.subtitle}</div>
                <div className="r-meta">
                  <span className="r-met">⏱ <b>{recipe.totalTime}min</b></span>
                  <span className="r-met">👥 <b>{recipe.serves}</b></span>
                  <span className="r-met">📊 <b>{recipe.difficulty}</b></span>
                </div>
                <div className="r-tech">🔪 {recipe.keyTechnique}</div>
                <div className={`r-detail overflow-hidden transition-all duration-300 ${expandedId === index ? "max-h-[900px] mt-4" : "max-h-0"}`}>
                  <div className="r-detail-section">
                    <h4 className="r-detail-title">Ingredients</h4>
                    <ul className="r-detail-list">
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i}>
                          <span className="r-detail-strong">{ing.name}</span>
                          <span className="r-detail-muted">{ing.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="r-detail-section mt-4">
                    <h4 className="r-detail-title">Method</h4>
                    <ol className="r-detail-steps">
                      {recipe.steps.map((step, i) => (
                        <li key={i}>
                          {step.stage && (
                            <div className="r-step-stage">{step.stage}</div>
                          )}
                          <p className="r-step-text">{step.text}</p>
                          {step.sensoryCues && step.sensoryCues.length > 0 && (
                            <ul className="r-step-cues">
                              {step.sensoryCues.map((cue, j) => (
                                <li key={j}>
                                  <span className="r-detail-strong">{cue.type}:</span>{" "}
                                  <span className="r-detail-muted">{cue.cue}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                  {recipe.chefTip && (
                    <div className="r-detail-section mt-4">
                      <h4 className="r-detail-title">Chef’s tip</h4>
                      <p className="r-step-text">{recipe.chefTip}</p>
                    </div>
                  )}
                </div>
                <div className="r-actions">
                  <Button
                    className="btn-outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      setVoiceRecipe(recipe)
                    }}
                  >
                    🎙 Voice Cook
                  </Button>
                  <Button
                    className="btn-primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCardRecipe(recipe)
                    }}
                  >
                    🎨 Make Card
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <div className="empty-icon">✦</div>
            <h3>Your table awaits</h3>
            <p>Select your preferences and generate your personalised chef's menu.</p>
          </div>
        )}
      </div>
      {voiceRecipe && (
        <VoiceChef
          recipe={voiceRecipe}
          onClose={() => setVoiceRecipe(null)}
        />
      )}
      {cardRecipe && (
        <div className="menu-modal">
          <div className="menu-card">
            <div className="menu-card-header">
              <div className="menu-card-tag">{cardRecipe.cuisine}</div>
              <div className="menu-card-meta">
                <span>{cardRecipe.difficulty}</span>
                <span>{cardRecipe.totalTime} min</span>
                <span>Serves {cardRecipe.serves}</span>
              </div>
            </div>
            <h2 className="menu-card-title">
              {cardRecipe.emoji || ""} {cardRecipe.title}
            </h2>
            <p className="menu-card-sub">{cardRecipe.subtitle}</p>
            <div className="menu-card-body">
              <div className="menu-card-col">
                <h3>Ingredients</h3>
                <ul>
                  {cardRecipe.ingredients.map((ing, i) => (
                    <li key={i}>
                      <span className="r-detail-strong">{ing.name}</span>{" "}
                      <span className="r-detail-muted">{ing.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="menu-card-col">
                <h3>Method</h3>
                <ol>
                  {cardRecipe.steps.map((step, i) => (
                    <li key={i}>
                      {step.stage && (
                        <div className="r-step-stage">{step.stage}</div>
                      )}
                      <p className="r-step-text">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            {cardRecipe.chefTip && (
              <div className="menu-card-tip">
                <span className="r-detail-strong">Chef’s tip:</span>{" "}
                <span className="r-detail-muted">{cardRecipe.chefTip}</span>
              </div>
            )}
            <div className="menu-card-actions">
              <Button
                className="btn-outline"
                onClick={() => window.print()}
              >
                Print
              </Button>
              <Button
                className="btn-primary"
                onClick={() => setCardRecipe(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getDemoRecipes(): Recipe[] {
  return [{
    title: "Seared Scallops, Pea Velouté",
    subtitle: "Caramelised sweetness against spring silk",
    cuisine: "Modern British",
    stars: 2,
    difficulty: "Intermediate",
    totalTime: 25,
    serves: 2,
    emoji: "🥮",
    keyTechnique: "Achieving Maillard crust on scallops demands absolute dryness and a smoking pan. Moisture creates steam — steam creates no colour, no flavour.",
    chefTip: "Never move the scallop once it touches the pan. 90 seconds untouched creates the crust that defines this dish.",
    ingredients: [
      { name: "King scallops", amount: "6, roe on" },
      { name: "Frozen peas", amount: "300g" },
      { name: "Pancetta", amount: "60g lardons" },
      { name: "Double cream", amount: "50ml" },
      { name: "Unsalted butter", amount: "30g" },
      { name: "Lemon", amount: "½, juice" },
      { name: "Clarified butter", amount: "2 tbsp" },
      { name: "Shallot", amount: "1, diced" }
    ],
    steps: [
      {
        text: "Pat scallops bone dry on kitchen paper for 20+ minutes. Season with fine salt only at the very last moment before cooking — early salting draws out moisture.",
        stage: "Prep",
        timerMinutes: null,
        sensoryCues: [
          { type: "touch", cue: "Scallops should feel firm and completely dry, not tacky or damp" },
          { type: "sight", cue: "The surface should look matte, not glossy — any sheen means moisture remains" }
        ]
      },
      {
        text: "Render pancetta slowly in a cold pan until deeply crisp. Remove and reserve fat in the pan. Blanch peas in boiling salted water for 2 minutes, drain immediately and blend with butter and cream until completely smooth. Pass through a fine sieve.",
        stage: "The velouté",
        timerMinutes: 8,
        sensoryCues: [
          { type: "sight", cue: "Pea purée should be a vivid, electric green — this brightness fades fast, so work quickly" },
          { type: "smell", cue: "Sweet, fresh pea aroma should fill the room — if it smells cooked, you've gone too far" }
        ]
      },
      {
        text: "Heat clarified butter in a heavy pan until just beginning to smoke. Add scallops flat-side down. Do not touch them for 90 seconds — any movement tears the forming crust.",
        stage: "The sear",
        timerMinutes: 3,
        sensoryCues: [
          { type: "sound", cue: "An aggressive sizzle that settles to a steady crackle — silence means the pan is too cold" },
          { type: "sight", cue: "Watch the golden colour creep up the side of each scallop — flip when it reaches halfway" }
        ]
      },
      {
        text: "Flip scallops, add cold butter, baste for 40 seconds. They should be 60% opaque — the centre should still feel slightly yielding when pressed. Plate immediately: swoosh of velouté, three scallops, scatter pancetta, lemon, pan juices.",
        stage: "Finish & plate",
        timerMinutes: 1,
        sensoryCues: [
          { type: "touch", cue: "The scallop should have slight resistance at centre — fully firm means overcooked" },
          { type: "sight", cue: "A pool of green, three amber rounds, flecks of pancetta — contrast is the composition" }
        ]
      }
    ]
  }]
}