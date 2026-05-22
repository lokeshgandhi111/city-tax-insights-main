import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
  PieChart, Pie, Cell,
} from "recharts";
import type { Property } from "@/utils/analytics";
import { collectionByCity, propertiesByCity, statusByCity } from "@/utils/analytics";
import { formatINR } from "@/utils/helpers";

const COLORS = ["#6366f1","#3b82f6","#0ea5e9","#06b6d4","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#14b8a6"];

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="h-72 w-full">{children}</div>
    </div>
  );
}

const tooltipStyle = {
  contentStyle: {
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 30px -10px rgba(15,23,42,0.15)",
    fontSize: 12,
  },
};

export default function Charts({ data }: { data: Property[] }) {
  const collection = collectionByCity(data);
  const dist = propertiesByCity(data);
  const status = statusByCity(data);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Panel title="Total Collection per City" subtitle="Annual tax collected (INR)">
        <ResponsiveContainer>
          <BarChart data={collection} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="city" tick={{ fontSize: 11, fill: "#64748b" }} />
            <YAxis tickFormatter={(v: number) => formatINR(v).replace("₹", "")} tick={{ fontSize: 11, fill: "#64748b" }} />
            <Tooltip {...tooltipStyle} formatter={((v: number) => formatINR(v)) as any} />
            <Bar dataKey="value" fill="url(#cg)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Property Distribution by City" subtitle="Share of total properties">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Pie data={dist} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2}>
              {dist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Approved vs Rejected vs Pending" subtitle="Status breakdown per city">
        <ResponsiveContainer>
          <BarChart data={status} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="city" tick={{ fontSize: 11, fill: "#64748b" }} />
            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Approved" stackId="a" fill="#10b981" radius={[0,0,0,0]} />
            <Bar dataKey="Pending" stackId="a" fill="#f59e0b" />
            <Bar dataKey="Rejected" stackId="a" fill="#ef4444" radius={[8,8,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Top Cities by Collection" subtitle="Ranked horizontally">
        <ResponsiveContainer>
          <BarChart data={collection.slice(0,10)} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" tickFormatter={(v: number) => formatINR(v).replace("₹","")} tick={{ fontSize: 11, fill: "#64748b" }} />
            <YAxis type="category" dataKey="city" tick={{ fontSize: 11, fill: "#64748b" }} width={80} />
            <Tooltip {...tooltipStyle} formatter={((v: number) => formatINR(v)) as any} />
            <Bar dataKey="value" fill="#0ea5e9" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
