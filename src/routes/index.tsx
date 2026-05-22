import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Building2, CheckCircle2, XCircle, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import TenantFilter from "@/components/TenantFilter";
import KPICard from "@/components/KPICard";
import Charts from "@/components/Charts";
import ChatAssistant from "@/components/ChatAssistant";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/utils/analytics";
import { computeKPIs, filterByTenant } from "@/utils/analytics";
import { formatINR } from "@/utils/helpers";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Property Tax Analytics — UPYOG" },
      { name: "description", content: "Multi-tenant property tax analytics dashboard across 10 Indian cities." },
    ],
  }),
});

function Dashboard() {
  const all = propertiesData as Property[];
  const [tenant, setTenant] = useState("All Cities");

  const filtered = useMemo(() => filterByTenant(all, tenant), [all, tenant]);
  const kpi = useMemo(() => computeKPIs(filtered), [filtered]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Overview</h2>
            <p className="mt-1 text-sm text-slate-500">
              Showing data for <span className="font-medium text-indigo-600">{tenant}</span> · {filtered.length.toLocaleString("en-IN")} records
            </p>
          </div>
          <TenantFilter value={tenant} onChange={setTenant} />
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-slate-500">No properties found for the selected tenant.</p>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KPICard
                label="Properties Registered"
                value={kpi.total}
                icon={Building2}
                accent="bg-gradient-to-br from-indigo-500 to-blue-500"
                sub="Across selected tenant(s)"
              />
              <KPICard
                label="Approved"
                value={kpi.approved}
                icon={CheckCircle2}
                accent="bg-gradient-to-br from-emerald-500 to-teal-500"
                sub={`${((kpi.approved / kpi.total) * 100).toFixed(1)}% of total`}
              />
              <KPICard
                label="Rejected"
                value={kpi.rejected}
                icon={XCircle}
                accent="bg-gradient-to-br from-rose-500 to-red-500"
                sub={`${((kpi.rejected / kpi.total) * 100).toFixed(1)}% of total`}
              />
              <KPICard
                label="Total Collection"
                value={kpi.collection}
                format={formatINR}
                icon={Wallet}
                accent="bg-gradient-to-br from-amber-500 to-orange-500"
                sub="Annual tax collected"
              />
            </section>

            <section className="mt-6">
              <Charts data={filtered} />
            </section>
          </>
        )}
      </main>

      <ChatAssistant data={filtered} scope={tenant} />

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} UPYOG Property Tax Analytics
      </footer>
    </div>
  );
}
