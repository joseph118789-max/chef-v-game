// ============================================================
// MembersList — Searchable/filterable member table
// ============================================================
import { useState } from "react";
import type * as React from "react";
import {
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  UserX,
  Cake,
} from "lucide-react";
import { Branch, Member } from "./types";
import { maskNRIC, formatDate } from "./utils";
import VoucherStatusBadge from "./components/VoucherStatusBadge";
import { BirthdayVoucher } from "./types";
import { searchMembers } from "./data";

interface MembersListProps {
  members: Member[];
  branches: Branch[];
  vouchers: BirthdayVoucher[];
  onNavigate: (view: "detail" | "form", memberId?: string) => void;
  t: any;

  key?: React.Key;
}

const PAGE_SIZE = 10;

const MONTH_NAMES = [
  "All Months", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function MembersList({
  members,
  branches,
  vouchers,
  onNavigate,
  t,
}: MembersListProps) {
  const [query, setQuery] = useState("");
  const [branchId, setBranchId] = useState("");
  const [birthMonth, setBirthMonth] = useState<number | "">("");
  const [page, setPage] = useState(1);

  const filtered = searchMembers(query, branchId || undefined, birthMonth || undefined);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleFilterChange = () => setPage(1);

  const getVoucherStatus = (memberId: string) => {
    // Prefer the most relevant voucher for this member: active > redeemed > expired > none.
    // Without this, a member with an expired voucher from this year would appear as "—"
    // even though one was issued, which is misleading.
    const memberVouchers = vouchers
      .filter((v) => v.memberId === memberId)
      .sort((a, b) => {
        const rank = (s: string) => (s === "active" ? 0 : s === "redeemed" ? 1 : 2);
        const r = rank(a.status) - rank(b.status);
        if (r !== 0) return r;
        return new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime();
      });
    return memberVouchers[0]?.status ?? null;
  };

  return (
    <div className="space-y-4">
      {/* Search + Filters */}
      <div className="bg-white rounded-2xl border border-[#FAD0D6] p-4 shadow-sm flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder={t.members?.list?.searchPlaceholder || "Search name, NRIC, phone, email..."}
            className="w-full border border-pink-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-[#F24E82] focus:border-[#F24E82]"
          />
        </div>

        <select
          value={branchId}
          onChange={(e) => { setBranchId(e.target.value); handleFilterChange(); }}
          className="border border-pink-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-[#F24E82] focus:border-[#F24E82]"
        >
          <option value="">{t.members?.list?.allBranches || "All Branches"}</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <select
          value={birthMonth}
          onChange={(e) => {
            setBirthMonth(e.target.value === "" ? "" : parseInt(e.target.value));
            handleFilterChange();
          }}
          className="border border-pink-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-[#F24E82] focus:border-[#F24E82]"
        >
          {MONTH_NAMES.map((m, i) => (
            <option key={i} value={i === 0 ? "" : i}>{m}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#FAD0D6] shadow-sm overflow-hidden">
        {paginated.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <UserX className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-semibold text-sm">{t.members?.list?.noResults || "No members found"}</p>
            <p className="text-xs mt-1">{t.members?.list?.noResultsHint || "Try adjusting your search or filters"}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#FFF5F6] border-b border-[#FAD0D6]">
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider">{t.members?.list?.columns?.name || "Name"}</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider hidden sm:table-cell">{t.members?.list?.columns?.nric || "NRIC"}</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider hidden md:table-cell">{t.members?.list?.columns?.phone || "Phone"}</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider">{t.members?.list?.columns?.branch || "Branch"}</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider hidden lg:table-cell">
                    <span className="flex items-center gap-1"><Cake className="w-3 h-3" /> {t.members?.list?.columns?.dob || "DOB"}</span>
                  </th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider">{t.members?.list?.columns?.voucher || "Voucher"}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50">
                {paginated.map((member) => {
                  const branch = branches.find((b) => b.id === member.branchId);
                  const voucherStatus = getVoucherStatus(member.id);
                  return (
                    <tr
                      key={member.id}
                      className="hover:bg-pink-50/50 cursor-pointer transition-colors"
                      onClick={() => onNavigate("detail", member.id)}
                    >
                      <td className="px-4 py-3.5">
                        <p className="font-bold text-slate-800">{member.name}</p>
                        <p className="text-slate-400 text-[11px] hidden sm:block">{member.email}</p>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-600 hidden sm:table-cell">
                        {maskNRIC(member.nric)}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">{member.phone}</td>
                      <td className="px-4 py-3.5 text-slate-600 text-xs">{branch?.name ?? "—"}</td>
                      <td className="px-4 py-3.5 text-slate-600 hidden lg:table-cell">{formatDate(member.dateOfBirth)}</td>
                      <td className="px-4 py-3.5">
                        {voucherStatus ? (
                          <VoucherStatusBadge status={voucherStatus} />
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > PAGE_SIZE && (
          <div className="px-6 py-3.5 border-t border-pink-100 flex justify-between items-center">
            <p className="text-slate-500 text-xs">
              {(t.members?.list?.showing || ((f: number, to: number, t: number) => `Showing ${f}–${to} of ${t}`))(
                (safePage - 1) * PAGE_SIZE + 1,
                Math.min(safePage * PAGE_SIZE, filtered.length),
                filtered.length
              )}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="w-8 h-8 rounded-lg border border-pink-200 text-slate-600 text-xs font-bold hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 mx-auto" />
              </button>
              {(() => {
                // Sliding window of up to 5 page buttons with leading/trailing ellipsis.
                const window = 5;
                let start = Math.max(1, safePage - 2);
                const end = Math.min(totalPages, start + window - 1);
                start = Math.max(1, end - window + 1);
                const items: (number | "ellipsis-left" | "ellipsis-right")[] = [];
                if (start > 1) {
                  items.push(1);
                  if (start > 2) items.push("ellipsis-left");
                }
                for (let p = start; p <= end; p++) items.push(p);
                if (end < totalPages) {
                  if (end < totalPages - 1) items.push("ellipsis-right");
                  items.push(totalPages);
                }
                return items.map((item, i) =>
                  item === "ellipsis-left" || item === "ellipsis-right" ? (
                    <span
                      key={`${item}-${i}`}
                      className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs select-none"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setPage(item)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        item === safePage
                          ? "bg-[#F24E82] text-white shadow-md"
                          : "border border-pink-200 text-slate-600 hover:bg-pink-50"
                      }`}
                    >
                      {item}
                    </button>
                  )
                );
              })()}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="w-8 h-8 rounded-lg border border-pink-200 text-slate-600 text-xs font-bold hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}