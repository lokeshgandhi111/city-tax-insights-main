import { ChevronDown, MapPin } from "lucide-react";
import { CITIES } from "@/utils/helpers";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function TenantFilter({ value, onChange }: Props) {
  const options = ["All Cities", ...CITIES];
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
        Tenant
      </label>
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-500" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-sm font-medium text-slate-800 shadow-sm transition hover:border-indigo-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-64"
        >
          {options.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}
