'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0a0908] text-[#ede8e0] flex flex-col">
        <nav className="h-16 flex items-center justify-between px-12 border-b border-[#2e2b26]">
          <div className="text-[#c9a227] font-serif text-xl font-bold tracking-widest">
            Mise <span className="text-[#ede8e0] font-normal">en Place</span>
          </div>
        </nav>
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-serif font-bold text-[#c9a227] mb-4 text-center">
            Your chef’s table is reserved
          </h1>
          <p className="mb-8 text-center max-w-md text-[#b3aa9c]">
            Sign in with Google to access your personalised Michelin-level menus and AI-powered kitchen tools.
          </p>
          <button
            onClick={() => signIn('google')}
            className="inline-flex items-center justify-center rounded-md bg-[#c9a227] px-6 py-2 text-sm font-medium text-[#0a0908] hover:bg-[#e0bd3a] transition-colors"
          >
            Sign in with Google
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0908] text-[#ede8e0]">
      <nav className="h-16 flex items-center justify-between px-12 border-b border-[#2e2b26]">
        <div className="text-[#c9a227] font-serif text-xl font-bold tracking-widest">
          Mise <span className="text-[#ede8e0] font-normal">en Place</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-[#ede8e0] hover:text-[#c9a227]">
            Dashboard
          </Link>
          <button
            onClick={() => signOut()}
            className="text-sm text-[#b3aa9c] hover:text-[#ede8e0]"
          >
            Sign out
          </button>
        </div>
      </nav>
      <main className="p-12">
        <h1 className="text-4xl font-serif font-bold text-[#c9a227] mb-4">
          Welcome, Chef
        </h1>
      </main>
    </div>
  );
}