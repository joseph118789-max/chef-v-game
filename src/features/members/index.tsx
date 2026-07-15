// ============================================================
// MembersPanel — Main orchestrator for the Members tab
// Manages internal view state and ties all sub-components together
// ============================================================
import { useState, useEffect, useCallback } from "react";
import {
  Users,
  LayoutDashboard,
  List,
  PlusCircle,
  Ticket,
} from "lucide-react";
import { MembersView, MemberFormData } from "./types";
import {
  getBranches,
  getMembers,
  getVouchers,
  createMember,
  updateMember,
  deleteMember,
  redeemVoucher,
  checkAndIssueBirthdayVouchers,
  getMemberById,
} from "./data";
import MembersDashboard from "./MembersDashboard";
import MembersList from "./MembersList";
import MemberDetail from "./MemberDetail";
import MemberForm from "./MemberForm";
import VoucherManagement from "./VoucherManagement";

interface MembersPanelProps {
  showToast: (text: string, type: "success" | "info" | "error") => void;
  t: any;
  lang: 'en' | 'cn' | 'ms';
}

type Tab = "dashboard" | "list" | "vouchers";

export default function MembersPanel({ showToast, t, lang }: MembersPanelProps) {
  const [view, setView] = useState<MembersView>("dashboard");
  const [selectedMemberId, setSelectedMemberId] = useState<string | undefined>();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);

  const members = getMembers();
  const branches = getBranches();
  const vouchers = getVouchers();

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  // Check + issue birthday vouchers on mount
  useEffect(() => {
    const { issued, alreadyActive } = checkAndIssueBirthdayVouchers();
    if (issued > 0) {
      showToast(`🎂 ${issued} ` + (t.toast?.birthdayVouchersIssued || 'birthday voucher(s) auto-issued for this month!'), "success");
      refresh();
    }
  }, [refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCheckBirthdayVouchers = () => {
    const { issued, alreadyActive } = checkAndIssueBirthdayVouchers();
    if (issued > 0) {
      showToast(`🎂 ${issued} ` + (t.toast?.birthdayVouchersIssued || 'birthday voucher(s) issued for this month!'), "success");
      refresh();
    } else if (alreadyActive > 0) {
      showToast(`✅ ${alreadyActive} ` + (t.toast?.birthdayVouchersAlreadyActive || 'birthday voucher(s) already active for this month.'), "info");
    } else {
      showToast((t.toast?.noBirthdayVouchers || 'No members have birthdays this month. Vouchers will be auto-issued when birthdays come up! 🎂'), "info");
    }
  };

  const handleNavigate = (v: MembersView, memberId?: string) => {
    setView(v);
    setSelectedMemberId(memberId);
  };

  const handleSaveMember = (data: MemberFormData) => {
    const { name, email, phone, nric, dateOfBirth, branchId } = data;
    const joinDate = new Date().toISOString();

    if (selectedMemberId) {
      // Edit existing
      const result = updateMember(selectedMemberId, {
        name, email, phone, nric, dateOfBirth, branchId,
      });
      if (result) {
        showToast(t.toast?.memberUpdated || 'Member updated successfully!', "success");
        // Re-check birthday vouchers in case DOB was changed to current month
        const { issued, alreadyActive } = checkAndIssueBirthdayVouchers();
        if (issued > 0) {
          showToast(`🎂 ${issued} birthday voucher(s) issued for this month!`, "success");
        }
        refresh();
        return { success: true };
      }
      return { success: false, error: "Member not found" };
    } else {
      // Create new
      const member = createMember({ name, email, phone, nric, dateOfBirth, branchId, joinDate });
      showToast((t.toast?.memberAdded || 'Member "{name}" added!').replace("{name}", name), "success");
      // Auto-issue birthday voucher if new member's DOB is in current month
      const { issued } = checkAndIssueBirthdayVouchers();
      if (issued > 0) {
        showToast(`🎂 Birthday voucher auto-issued for ${name}!`, "success");
      }
      refresh();
      return { success: true };
    }
  };

  const handleEditMember = (memberId: string) => {
    setSelectedMemberId(memberId);
    setView("form");
  };

  const handleDeleteMember = (memberId: string) => {
    const member = getMemberById(memberId);
    deleteMember(memberId);
    showToast((t.toast?.memberDeleted || 'Member "{name}" deleted.').replace("{name}", member?.name ?? "unknown"), "info");
    setView("list");
    refresh();
  };

  const handleRedeemVoucher = (voucherId: string, branchId: string) => {
    const result = redeemVoucher(voucherId, branchId);
    if (result) {
      showToast(`${(t.toast?.voucherRedeemed || "Voucher {code} redeemed successfully!").replace("{code}", result.voucherCode)}`, "success");
      refresh();
    }
  };

  const selectedMember = selectedMemberId ? getMemberById(selectedMemberId) : null;

  const NAV_TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: t.members?.tabs?.dashboard || 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: "list", label: t.members?.tabs?.list || 'Members', icon: <List className="w-4 h-4" /> },
    { key: "vouchers", label: t.members?.tabs?.vouchers || 'Vouchers', icon: <Ticket className="w-4 h-4" /> },
  ];

  return (
    <div className="py-8 px-4 md:px-12 max-w-7xl mx-auto w-full flex-grow flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#F24E82] tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7" /> {t.members?.title || 'Member Management'}
          </h2>
          <p className="text-slate-600 text-sm mt-0.5">
            {t.members?.sub || 'NRIC-based member tracking · Birthday vouchers · Multi-branch support'}
          </p>
        </div>
        {view === "dashboard" && (
          <button
            onClick={() => handleNavigate("form")}
            className="bg-[#F24E82] hover:bg-[#E03E70] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> {t.members?.addMember || 'Add Member'}
          </button>
        )}
      </div>

      {/* Sub-nav tabs (Dashboard, Members list, Vouchers - not form/detail) */}
      {(view === "dashboard" || view === "list" || view === "vouchers") && (
        <div className="bg-white rounded-2xl border border-[#FAD0D6] p-1.5 flex gap-1 mb-6 shadow-sm w-max">
          {NAV_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setView(t.key === "vouchers" ? "vouchers" : t.key === "list" ? "list" : "dashboard"); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tab === t.key
                  ? "bg-[#F24E82] text-white shadow-sm"
                  : "text-slate-600 hover:bg-pink-50"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* View Content */}
      {view === "dashboard" && tab === "dashboard" && (
        <MembersDashboard
          key={refreshKey}
          members={members}
          vouchers={vouchers}
          branches={branches}
          t={t}
          onNavigate={handleNavigate}
          onIssueVouchers={handleCheckBirthdayVouchers}
        />
      )}

      {view === "list" && (
        <MembersList
          key={refreshKey}
          members={members}
          branches={branches}
          vouchers={vouchers}
          t={t}
          onNavigate={(v, id) => {
            if (v === "detail") handleNavigate("detail", id);
            if (v === "form") handleNavigate("form", id);
          }}
        />
      )}

      {view === "vouchers" && (
        <VoucherManagement
          key={refreshKey}
          vouchers={vouchers}
          members={members}
          branches={branches}
          t={t}
          onRedeem={handleRedeemVoucher}
          onBack={() => { setView("dashboard"); setTab("dashboard"); }}
        />
      )}

      {view === "form" && (
        <MemberForm
          key={selectedMemberId ?? "new"}
          member={selectedMember}
          branches={branches}
          t={t}
          onSave={handleSaveMember}
          onBack={() => {
            setView(selectedMemberId ? "detail" : "list");
          }}
        />
      )}

      {view === "detail" && selectedMember && (
        <MemberDetail
          key={selectedMemberId}
          member={selectedMember}
          branch={branches.find((b) => b.id === selectedMember.branchId)}
          vouchers={vouchers.filter((v) => v.memberId === selectedMemberId)}
          t={t}
          onBack={() => setView("list")}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
        />
      )}
    </div>
  );
}