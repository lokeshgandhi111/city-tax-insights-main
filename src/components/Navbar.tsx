import { Building2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight sm:text-xl">
              Property Tax Analytics
            </h1>
            <p className="text-xs text-white/80">UPYOG Multi-Tenant Platform</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm backdrop-blur sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
          Live
        </div>
      </div>
    </header>
  );
}
