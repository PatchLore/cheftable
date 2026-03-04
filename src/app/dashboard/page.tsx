"use client";

import ChefTable from "@/components/chef-table";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0908] text-[#ede8e0] flex flex-col">
      <nav className="h-16 flex items-center justify-between px-12 border-b border-[#2e2b26]">
        <div className="text-[#c9a227] font-serif text-xl font-bold tracking-widest">
          ChefTable
        </div>
      </nav>
      <main className="flex-1 px-12 py-10">
        <ChefTable />
      </main>
      <footer className="border-t border-[#2e2b26] px-12 py-4 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs text-[#b3aa9c]">
        <Link href="/privacy" className="hover:text-[#c9a227]">Privacy</Link>
        <Link href="/terms" className="hover:text-[#c9a227]">Terms</Link>
        <Link href="/faq" className="hover:text-[#c9a227]">FAQ</Link>
        <Link href="/about" className="hover:text-[#c9a227]">About</Link>
      </footer>
    </div>
  );
}

