import Link from "next/link";
import { Activity, ClipboardPlus, Home, Settings, UsersRound } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Register Patient", href: "/patients/new", icon: ClipboardPlus },
  { name: "Patients", href: "/patients", icon: UsersRound },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Activity className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Patient Portal</p>
          <p className="text-xs text-slate-500">FHIR R4 Registration</p>
        </div>
      </div>

      <nav className="space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}