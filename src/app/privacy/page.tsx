import Link from "next/link"

export const metadata = {
  title: "Privacy Policy — ChefTable",
  description: "ChefTable privacy policy: data we collect and how we use it.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0908] text-[#ede8e0]">
      <nav className="h-16 flex items-center justify-between px-6 md:px-12 border-b border-[#2e2b26]">
        <Link href="/dashboard" className="text-[#c9a227] font-serif text-xl font-bold tracking-widest hover:text-[#e0bd3a]">
          ChefTable
        </Link>
        <Link href="/dashboard" className="text-sm text-[#b3aa9c] hover:text-[#ede8e0]">
          ← Back to Dashboard
        </Link>
      </nav>
      <main className="max-w-3xl mx-auto px-6 md:px-12 py-10">
        <h1 className="text-3xl font-serif font-bold text-[#c9a227] mb-6">Privacy Policy</h1>
        <p className="text-sm text-[#b3aa9c] mb-8">Last updated: March 2025</p>

        <div className="space-y-6 text-[#ede8e0] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[#c9a227] mb-2">Google OAuth data</h2>
            <p>When you sign in with Google, we receive your name and email address. We use this only to identify your account and to personalise your experience. We do not share this information with third parties for marketing.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#c9a227] mb-2">No sale of data</h2>
            <p>We do not sell your personal data to third parties. Your account and recipe preferences are used only to operate ChefTable.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#c9a227] mb-2">Groq API usage</h2>
            <p>Recipe generation uses the Groq API. The preferences you select (cuisine, skill level, occasion, recipe count) and the generated recipe content are sent to Groq to produce your menu. Groq’s privacy practices apply to that processing.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#c9a227] mb-2">Cookies</h2>
            <p>We use cookies for session management (e.g. keeping you signed in via NextAuth). These are essential for the app to function. We do not use third-party advertising or tracking cookies.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#c9a227] mb-2">Contact</h2>
            <p>For privacy questions or requests, contact us at <a href="mailto:acquisitions@stackdrip.dev" className="text-[#c9a227] hover:underline">acquisitions@stackdrip.dev</a>.</p>
          </section>
        </div>
      </main>
    </div>
  )
}
