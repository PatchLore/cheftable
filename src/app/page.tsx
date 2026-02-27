"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ChefTable from "@/components/chef-table"
import VoiceChef from "@/components/voice-chef"
import CoursePairing from "@/components/course-pairing"
import RecipeCards from "@/components/recipe-cards"
import { Button } from "@/components/ui/button"
import Card from "@/components/ui/card"

// Prevent static generation to ensure session is available
export const dynamic = 'force-dynamic'

export default function Home() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("chef")

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="bg-s1/94 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="logo">
              Mise <span>en Place</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="nav-pills flex gap-1">
                <button
                  onClick={() => setActiveTab("chef")}
                  className={`npill ${activeTab === "chef" ? "active" : ""}`}
                >
                  Chef's Table
                </button>
                <button
                  onClick={() => setActiveTab("voice")}
                  className={`npill ${activeTab === "voice" ? "active" : ""}`}
                >
                  🎙 Voice Chef
                </button>
                <button
                  onClick={() => setActiveTab("pairing")}
                  className={`npill ${activeTab === "pairing" ? "active" : ""}`}
                >
                  Course Pairing
                </button>
                <button
                  onClick={() => setActiveTab("cards")}
                  className={`npill ${activeTab === "cards" ? "active" : ""}`}
                >
                  Recipe Cards
                </button>
              </div>
              <div className="nav-right flex gap-2">
                <Button 
                  variant="outline" 
                  className="btn-outline"
                  onClick={() => window.open("https://t.me/MiseEnPlaceChef", "_blank")}
                >
                  ✈ Telegram
                </Button>
                <Button className="btn-primary">
                  Pro — £4.99
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <ChefTable />
        <VoiceChef />
        <CoursePairing />
        <RecipeCards />
      </main>
    </div>
  )
}
