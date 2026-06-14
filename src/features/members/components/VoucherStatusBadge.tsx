// ============================================================
// VoucherStatusBadge — Colored badge for voucher status
// ============================================================
import { VoucherStatus } from "../types";

interface VoucherStatusBadgeProps {
  status: VoucherStatus;
}

const BADGE_STYLES: Record<VoucherStatus, string> = {
  active: "bg-emerald-100 text-emerald-700 border-emerald-300",
  redeemed: "bg-blue-100 text-blue-700 border-blue-300",
  expired: "bg-red-100 text-red-600 border-red-300",
};

const BADGE_LABELS: Record<VoucherStatus, string> = {
  active: "Active",
  redeemed: "Redeemed",
  expired: "Expired",
};

export default function VoucherStatusBadge({ status }: VoucherStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${BADGE_STYLES[status]}`}
    >
      {BADGE_LABELS[status]}
    </span>
  );
}