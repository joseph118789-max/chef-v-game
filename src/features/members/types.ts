// ============================================================
// Chef V — Member Management Types
// ============================================================

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  nric: string;
  dateOfBirth: string;    // DD-MM-YYYY
  branchId: string;
  joinDate: string;       // ISO date
  createdAt: string;
  updatedAt: string;
}

export type VoucherStatus = "active" | "redeemed" | "expired";

export interface BirthdayVoucher {
  id: string;
  memberId: string;
  issueYear: number;
  issuedAt: string;           // ISO date
  redeemedAt: string | null;
  redeemedBranchId: string | null;
  voucherCode: string;        // BDAY-YYYY-XXXXX
  expiresAt: string;          // issuedAt + 30 days
  status: VoucherStatus;
}

export type MembersView =
  | "dashboard"
  | "list"
  | "form"
  | "detail"
  | "vouchers";

export interface MemberFormData {
  name: string;
  email: string;
  phone: string;
  nric: string;
  dateOfBirth: string;
  branchId: string;
}

export interface NRICParseResult {
  valid: boolean;
  dateOfBirth: string | null;  // DD-MM-YYYY
  error?: string;
}