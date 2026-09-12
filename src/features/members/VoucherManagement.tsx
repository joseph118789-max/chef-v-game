// ============================================================
// VoucherManagement — Search + redeem vouchers
// ============================================================
import { useState } from "react";
import type * as React from "react";
import {
  Search,
  Ticket,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Gift,
} from "lucide-react";
import { Branch, BirthdayVoucher, Member } from "./types";
import { formatISODate } from "./utils";
import VoucherStatusBadge from "./components/VoucherStatusBadge";
import ConfirmDialog from "./components/ConfirmDialog";

interface VoucherManagementProps {
  vouchers: BirthdayVoucher[];
  members: Member[];
  branches: Branch[];
  onRedeem: (voucherId: string, branchId: string) => void;
  onBack: () => void;
  t: any;

  key?: React.Key;
}

type StatusFilter = "" | "active" | "redeemed" | "expired";

export default function VoucherManagement({
  vouchers,
  members,
  branches,
  onRedeem,
  onBack,
  t,
}: VoucherManagementProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("");
  const [branchFilter, setBranchFilter] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState<BirthdayVoucher | null>(null);
  const [redeemBranch, setRedeemBranch] = useState("");
  const [showRedeem, setShowRedeem] = useState(false);

  const filtered = vouchers.filter((v) => {
    const q = search.toLowerCase().trim();
    const member = members.find((m) => m.id === v.memberId);
    const matchesSearch =
      !q ||
      v.voucherCode.toLowerCase().includes(q) ||
      (member?.name.toLowerCase().includes(q) ?? false);
    const matchesStatus = !statusFilter || v.status === statusFilter;
    // Filter by the MEMBER's home branch (not the voucher's redeemed branch),
    // so the filter works for active/expired vouchers too — previously it only
    // worked for redeemed ones and silently returned 0 for the others.
    const matchesBranch = !branchFilter || member?.branchId === branchFilter;
    return matchesSearch && matchesStatus && matchesBranch;
  });

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime()
  );

  const handleRedeemClick = (voucher: BirthdayVoucher) => {
    setSelectedVoucher(voucher);
    setRedeemBranch("");
    setShowRedeem(true);
  };

  const handleRedeemConfirm = () => {
    if (!selectedVoucher) return;
    if (!redeemBranch) {
      // Previously a silent no-op — give the user feedback instead.
      alert("Please select a branch before confirming redemption.");
      return;
    }
    onRedeem(selectedVoucher.id, redeemBranch);
    setShowRedeem(false);
    setSelectedVoucher(null);
  };

  const getMemberName = (memberId: string) =>
    members.find((m) => m.id === memberId)?.name ?? "—";

  const STATUS_OPTIONS: { value: StatusFilter; label: string; icon: React.ReactNode }[] = [
    { value: "", label: "All", icon: <Ticket className="w-3.5 h-3.5" /> },
    { value: "active", label: "Active", icon: <Clock className="w-3.5 h-3.5" /> },
    { value: "redeemed", label: "Redeemed", icon: <CheckCircle className="w-3.5 h-3.5" /> },
    { value: "expired", label: "Expired", icon: <XCircle className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl border border-pink-200 bg-white hover:bg-pink-50 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#F24E82]" /> {t.members?.vouchers?.title || "Voucher Management"}
          </h2>
          <p className="text-slate-500 text-xs">{t.members?.vouchers?.sub || "Search and redeem birthday vouchers"}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#FAD0D6] p-4 shadow-sm flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.members?.vouchers?.searchPlaceholder || "Search voucher code or member name..."}
            className="w-full border border-pink-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-[#F24E82] focus:border-[#F24E82]"
          />
        </div>

        {/* Status tabs */}
        <div className="flex gap-1 bg-pink-50 rounded-xl p-1">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === opt.value
                  ? "bg-[#F24E82] text-white shadow-sm"
                  : "text-slate-600 hover:bg-white/60"
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>

        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="border border-pink-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-[#F24E82] focus:border-[#F24E82]"
        >
          <option value="">{t.members?.list?.allBranches || "All Branches"}</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#FAD0D6] shadow-sm overflow-hidden">
        {sorted.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Ticket className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-semibold text-sm">{t.members?.vouchers?.noVouchers || "No vouchers found"}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#FFF5F6] border-b border-[#FAD0D6]">
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider">{t.members?.vouchers?.columns?.code || "Code"}</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider hidden sm:table-cell">{t.members?.vouchers?.columns?.member || "Member"}</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider hidden md:table-cell">{t.members?.vouchers?.columns?.issued || "Issued"}</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider hidden lg:table-cell">{t.members?.vouchers?.columns?.expires || "Expires"}</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider">{t.members?.vouchers?.columns?.status || "Status"}</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider hidden xl:table-cell">{t.members?.vouchers?.columns?.redeemedAt || "Redeemed At"}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50">
                {sorted.map((voucher) => {
                  const memberName = getMemberName(voucher.memberId);
                  return (
                    <tr key={voucher.id} className="hover:bg-pink-50/50 transition-colors">
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs font-bold text-[#F24E82]">
                          {voucher.voucherCode}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-700 hidden sm:table-cell">
                        {memberName}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 text-xs hidden md:table-cell">
                        {formatISODate(voucher.issuedAt)}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 text-xs hidden lg:table-cell">
                        {formatISODate(voucher.expiresAt)}
                      </td>
                      <td className="px-4 py-3.5">
                        <VoucherStatusBadge status={voucher.status} />
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 text-xs hidden xl:table-cell">
                        {voucher.redeemedAt ? (
                          <span>
                            {formatISODate(voucher.redeemedAt)}
                            {voucher.redeemedBranchId && (
                              <span className="ml-1 text-slate-400">
                                @ {branches.find((b) => b.id === voucher.redeemedBranchId)?.name ?? "—"}
                              </span>
                            )}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        {voucher.status === "active" && (
                          <button
                            onClick={() => handleRedeemClick(voucher)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-sm whitespace-nowrap"
                          >
                            {t.members?.vouchers?.redeem || "Redeem"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Redeem Dialog */}
      {selectedVoucher && (
        <ConfirmDialog
          open={showRedeem}
          title={t.members?.vouchers?.redeemDialog?.title || "Redeem Voucher"}
          message={
            <div className="space-y-4">
              <p>
                {(t.members?.vouchers?.redeemDialog?.message || ((c: string, n: string) =>
                  `Redeem voucher ${c} for ${n}?`
                ))(selectedVoucher.voucherCode, getMemberName(selectedVoucher.memberId))}
              </p>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.members?.vouchers?.redeemDialog?.branchLabel || "Redeemed at branch"} <span className="text-red-500">*</span>
                </label>
                <select
                  value={redeemBranch}
                  onChange={(e) => setRedeemBranch(e.target.value)}
                  className="w-full border border-pink-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-[#F24E82] focus:border-[#F24E82]"
                >
                  <option value="">{t.members?.vouchers?.redeemDialog?.branchPlaceholder || "Select branch"}</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>
          }
          confirmLabel={t.members?.vouchers?.redeemDialog?.confirm || "Confirm Redemption"}
          cancelLabel={t.members?.vouchers?.redeemDialog?.cancel || "Cancel"}
          onConfirm={handleRedeemConfirm}
          onCancel={() => setShowRedeem(false)}
        />
      )}
    </div>
  );
}