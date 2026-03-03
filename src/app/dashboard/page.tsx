"use client";

import ChefTable from "@/components/chef-table";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0908] text-[#ede8e0]">
      <nav className="h-16 flex items-center justify-between px-12 border-b border-[#2e2b26]">
        <div className="text-[#c9a227] font-serif text-xl font-bold tracking-widest">
          Mise <span className="text-[#ede8e0] font-normal">en Place</span>
        </div>
      </nav>
      <main className="px-12 py-10">
        <ChefTable />
      </main>
    </div>
  );
}

