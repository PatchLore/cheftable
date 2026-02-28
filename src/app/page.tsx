'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  const session = useSession()?.data;

  if (!session) {
    return <div className="min-h-screen bg-[#0a0908] text-[#ede8e0] p-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0908] text-[#ede8e0]">
      <nav className="h-16 flex items-center justify-between px-12 border-b border-[#2e2b26]">
        <div className="text-[#c9a227] font-serif text-xl font-bold tracking-widest">
          Mise <span className="text-[#ede8e0] font-normal">en Place</span>
        </div>
        <Link href="/dashboard" className="text-[#ede8e0] hover:text-[#c9a227]">
          Dashboard
        </Link>
      </nav>
      <main className="p-12">
        <h1 className="text-4xl font-serif font-bold text-[#c9a227] mb-4">
          Welcome, Chef
        </h1>
      </main>
    </div>
  );
}