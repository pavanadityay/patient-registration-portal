import Link from "next/link";
import { ClipboardPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PatientSearch() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search by name, email, health card..."
          className="pl-9"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="outline">Filter</Button>

        <Button asChild>
          <Link href="/patients/new">
            <ClipboardPlus className="mr-2 h-4 w-4" />
            Register Patient
          </Link>
        </Button>
      </div>
    </div>
  );
}