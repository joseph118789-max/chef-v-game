// ============================================================
// StatsCard — Reusable stat card for dashboard
// ============================================================
import { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color?: "pink" | "emerald" | "blue" | "amber" | "purple";
  subtext?: string;
}

const COLOR_MAP = {
  pink: "from-[#F24E82] to-[#FF8A65]",
  emerald: "from-emerald-500 to-teal-500",
  blue: "from-blue-500 to-indigo-500",
  amber: "from-amber-500 to-orange-500",
  purple: "from-purple-500 to-pink-500",
};

export default function StatsCard({
  label,
  value,
  icon,
  color = "pink",
  subtext,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#FAD0D6] p-5 shadow-sm flex items-start gap-4">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${COLOR_MAP[color]} flex items-center justify-center text-white shadow-md shrink-0`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider truncate">{label}</p>
        <p className="text-2xl font-extrabold text-slate-800 mt-0.5">{value}</p>
        {subtext && <p className="text-slate-400 text-[11px] mt-0.5">{subtext}</p>}
      </div>
    </div>
  );
}