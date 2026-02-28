export const dynamic = 'force-dynamic';

import { useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession()?.data;
  
  if (!session) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-[#0a0908] text-[#ede8e0] p-12">
      <nav className="h-16 flex items-center justify-between border-b border-[#2e2b26] mb-12">
        <div className="text-[#c9a227] font-serif text-xl font-bold tracking-widest">
          Mise <span className="text-[#ede8e0] font-normal">en Place</span>
        </div>
      </nav>
      <main>
        <h1 className="text-4xl font-serif font-bold text-[#c9a227] mb-4">
          Your AI Chef
        </h1>
        <p className="text-[#b8b0a4] mb-8">
          Michelin-level recipes generated for your skill level.
        </p>
        <a 
          href="/dashboard" 
          className="bg-[#c9a227] text-[#0a0908] px-6 py-3 rounded font-bold text-xs tracking-widest uppercase inline-block"
        >
          Enter Kitchen →
        </a>
      </main>
    </div>
  );
}
