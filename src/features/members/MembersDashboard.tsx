// ============================================================
// MembersDashboard — Overview stats, recent members, upcoming birthdays
// ============================================================
import {
  Users,
  Cake,
  Ticket,
  CheckCircle,
  Plus,
  ChevronRight,
  Gift,
} from "lucide-react";
import { Branch, Member, BirthdayVoucher } from "./types";
import { getCurrentMonth, formatDate, maskNRIC } from "./utils";
import StatsCard from "./components/StatsCard";

interface MembersDashboardProps {
  members: Member[];
  vouchers: BirthdayVoucher[];
  branches: Branch[];
  onNavigate: (view: "list" | "form" | "detail" | "vouchers", memberId?: string) => void;
  onIssueVouchers: () => { issued: number; alreadyActive: number };
}

export default function MembersDashboard({
  members,
  vouchers,
  branches,
  onNavigate,
  onIssueVouchers,
}: MembersDashboardProps) {
  const currentMonth = getCurrentMonth();

  const membersThisMonth = members.filter((m) => {
    const month = parseInt(m.dateOfBirth.split("-")[1], 10);
    return month === currentMonth;
  });

  const activeVouchers = vouchers.filter((v) => v.status === "active");
  const redeemedThisMonth = vouchers.filter((v) => {
    if (!v.redeemedAt) return false;
    const d = new Date(v.redeemedAt);
    return d.getMonth() + 1 === currentMonth;
  });

  // Upcoming birthdays in next 30 days
  const upcomingBirthdays = members
    .filter((m) => {
      const month = parseInt(m.dateOfBirth.split("-")[1], 10);
      return month === currentMonth;
    })
    .slice(0, 5);

  // Recent members (last 5 joined)
  const recentMembers = [...members]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const handleIssueVouchers = () => {
    const result = onIssueVouchers();
    // The parent should show a toast; here we just log it
    console.log("Voucher check result:", result);
  };

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Members"
          value={members.length}
          icon={<Users className="w-5 h-5" />}
          color="pink"
        />
        <StatsCard
          label="Birthday This Month"
          value={membersThisMonth.length}
          icon={<Cake className="w-5 h-5" />}
          color="amber"
          subtext="Eligible for voucher"
        />
        <StatsCard
          label="Active Vouchers"
          value={activeVouchers.length}
          icon={<Ticket className="w-5 h-5" />}
          color="emerald"
        />
        <StatsCard
          label="Redeemed This Month"
          value={redeemedThisMonth.length}
          icon={<CheckCircle className="w-5 h-5" />}
          color="blue"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onNavigate("form")}
          className="bg-[#F24E82] hover:bg-[#E03E70] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
        <button
          onClick={() => onNavigate("vouchers")}
          className="bg-white hover:bg-pink-50 text-[#F24E82] font-bold text-xs px-5 py-2.5 rounded-full border border-[#FED1DF] transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Gift className="w-4 h-4" /> Manage Vouchers
        </button>
        <button
          onClick={handleIssueVouchers}
          className="bg-amber-100 hover:bg-amber-200 text-amber-700 font-bold text-xs px-5 py-2.5 rounded-full border border-amber-300 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Ticket className="w-4 h-4" /> Check Birthday Vouchers
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Members */}
        <div className="bg-white rounded-3xl border border-[#FAD0D6] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-pink-100 flex justify-between items-center">
            <h3 className="font-extrabold text-slate-800 text-sm">Recent Members</h3>
            <button
              onClick={() => onNavigate("list")}
              className="text-[#F24E82] hover:text-[#E03E70] text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentMembers.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No members yet. Add your first member!
            </div>
          ) : (
            <ul className="divide-y divide-pink-50">
              {recentMembers.map((member) => {
                const branch = branches.find((b) => b.id === member.branchId);
                return (
                  <li
                    key={member.id}
                    className="px-6 py-3.5 hover:bg-pink-50/50 cursor-pointer transition-colors flex justify-between items-center"
                    onClick={() => onNavigate("detail", member.id)}
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{member.name}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5 truncate">
                        {maskNRIC(member.nric)} · {branch?.name ?? "—"}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 ml-2" />
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Birthday This Month */}
        <div className="bg-white rounded-3xl border border-[#FAD0D6] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-pink-100 flex justify-between items-center">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
              <Cake className="w-4 h-4 text-amber-500" />
              Birthday This Month
            </h3>
            <button
              onClick={() => onNavigate("list", undefined)}
              className="text-[#F24E82] hover:text-[#E03E70] text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {membersThisMonth.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No birthdays this month 🎂
            </div>
          ) : (
            <ul className="divide-y divide-pink-50">
              {membersThisMonth.slice(0, 5).map((member) => {
                const voucher = vouchers.find(
                  (v) =>
                    v.memberId === member.id &&
                    v.issueYear === new Date().getFullYear()
                );
                return (
                  <li
                    key={member.id}
                    className="px-6 py-3.5 hover:bg-pink-50/50 cursor-pointer transition-colors flex justify-between items-center"
                    onClick={() => onNavigate("detail", member.id)}
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{member.name}</p>
                      <p className="text-amber-600 text-[11px] mt-0.5">
                        🎂 {formatDate(member.dateOfBirth)}
                      </p>
                    </div>
                    {voucher ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-300 px-2 py-0.5 rounded-full font-bold shrink-0">
                        Voucher: {voucher.voucherCode}
                      </span>
                    ) : (
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold shrink-0">
                        No voucher
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}