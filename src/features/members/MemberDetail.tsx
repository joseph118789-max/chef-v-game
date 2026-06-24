// ============================================================
// MemberDetail — Single member view + voucher history
// ============================================================
import { useState } from "react";
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
} from "lucide-react";
import { Member, Branch, BirthdayVoucher } from "./types";
import { maskNRIC, formatDate, formatISODate } from "./utils";
import VoucherStatusBadge from "./components/VoucherStatusBadge";
import ConfirmDialog from "./components/ConfirmDialog";

interface MemberDetailProps {
  member: Member;
  branch: Branch | undefined;
  vouchers: BirthdayVoucher[];
  onBack: () => void;
  onEdit: (memberId: string) => void;
  onDelete: (memberId: string) => void;
}

export default function MemberDetail({
  member,
  branch,
  vouchers,
  onBack,
  onEdit,
  onDelete,
}: MemberDetailProps) {
  const [showDelete, setShowDelete] = useState(false);

  const sortedVouchers = [...vouchers].sort(
    (a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Back + Actions */}
      <div className="flex justify-between items-start">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-[#F24E82] font-semibold text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Members
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(member.id)}
            className="flex items-center gap-1.5 bg-[#F24E82] hover:bg-[#E03E70] text-white font-bold text-xs px-4 py-2 rounded-full transition-all cursor-pointer shadow-sm"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="flex items-center gap-1.5 bg-white hover:bg-red-50 text-red-500 border border-red-200 font-bold text-xs px-4 py-2 rounded-full transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>

      {/* Member Info Card */}
      <div className="bg-white rounded-3xl border border-[#FAD0D6] shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#F24E82] to-[#FF8A65] px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/25 rounded-full flex items-center justify-center text-white font-extrabold text-xl border-2 border-white/30">
              {member.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-extrabold text-white text-xl">{member.name}</h2>
              <p className="text-white/70 text-xs mt-0.5">
                Member since {formatISODate(member.joinDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow icon={<CreditCard className="w-4 h-4 text-[#F24E82]" />} label="NRIC" value={maskNRIC(member.nric)} mono />
          <InfoRow icon={<Mail className="w-4 h-4 text-[#F24E82]" />} label="Email" value={member.email} />
          <InfoRow icon={<Phone className="w-4 h-4 text-[#F24E82]" />} label="Phone" value={member.phone} />
          <InfoRow icon={<Calendar className="w-4 h-4 text-[#F24E82]" />} label="Date of Birth" value={formatDate(member.dateOfBirth)} />
          <InfoRow
            icon={<MapPin className="w-4 h-4 text-[#F24E82]" />}
            label="Branch"
            value={branch?.name ?? "—"}
          />
          <InfoRow
            icon={<Calendar className="w-4 h-4 text-[#F24E82]" />}
            label="Join Date"
            value={formatISODate(member.createdAt)}
          />
        </div>
      </div>

      {/* Voucher History */}
      <div className="bg-white rounded-3xl border border-[#FAD0D6] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-pink-100">
          <h3 className="font-extrabold text-slate-800 text-sm">{t.members?.detail?.voucherHistory || "Birthday Voucher History"}</h3>
        </div>

        {sortedVouchers.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-sm">
            No vouchers issued yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#FFF5F6] border-b border-[#FAD0D6]">
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider">Year</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider">Voucher Code</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider hidden sm:table-cell">Issued</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider hidden md:table-cell">Expires</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 font-extrabold text-slate-700 text-xs uppercase tracking-wider hidden lg:table-cell">Redeemed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50">
                {sortedVouchers.map((voucher) => (
                  <tr key={voucher.id} className="hover:bg-pink-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-700">{voucher.issueYear}</td>
                    <td className="px-4 py-3.5 font-mono text-xs font-semibold text-[#F24E82]">
                      {voucher.voucherCode}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 text-xs hidden sm:table-cell">
                      {formatISODate(voucher.issuedAt)}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 text-xs hidden md:table-cell">
                      {formatISODate(voucher.expiresAt)}
                    </td>
                    <td className="px-4 py-3.5">
                      <VoucherStatusBadge status={voucher.status} />
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs hidden lg:table-cell">
                      {voucher.redeemedAt ? formatISODate(voucher.redeemedAt) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDelete}
        title="Delete Member?"
        message={`Are you sure you want to delete ${member.name}? This will also remove all their voucher history. This action cannot be undone.`}
        confirmLabel="Delete Member"
        onConfirm={() => {
          setShowDelete(false);
          onDelete(member.id);
        }}
        onCancel={() => setShowDelete(false)}
        danger
      />
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">{label}</p>
        <p className={`text-slate-800 text-sm font-semibold mt-0.5 ${mono ? "font-mono" : ""}`}>{value}</p>
      </div>
    </div>
  );
}