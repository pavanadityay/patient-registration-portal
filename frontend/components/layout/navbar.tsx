import { Bell, Search } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      <div className="flex w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      <button className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
        <Bell className="h-5 w-5" />
      </button>
    </header>
  );
}