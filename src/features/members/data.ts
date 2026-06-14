// ============================================================
// Chef V — Member Management Data Service
// Uses localStorage for persistence (same pattern as existing app)
// ============================================================

import { Branch, Member, BirthdayVoucher } from "./types";

// ---- Seed Data ----
const SEED_BRANCHES: Branch[] = [
  { id: "b1", name: "Chef V PJ Section 14", address: "Jalan 14/14, Petaling Jaya, Selangor", phone: "03-7955 1234", createdAt: "2024-01-01T00:00:00.000Z" },
  { id: "b2", name: "Chef V Subang SS15", address: "Jalan SS15/4D, Subang Jaya, Selangor", phone: "03-5635 5678", createdAt: "2024-01-01T00:00:00.000Z" },
  { id: "b3", name: "Chef V Cheras", address: "Jalan Cheras, Balakong, Selangor", phone: "03-9100 9876", createdAt: "2024-01-01T00:00:00.000Z" },
  { id: "b4", name: "Chef V Kepong", address: "Jalan Kepong, Kuala Lumpur", phone: "03-6273 4321", createdAt: "2024-01-01T00:00:00.000Z" },
  { id: "b5", name: "Chef V Puchong", address: "Jalan Puchong, Puchong, Selangor", phone: "03-5888 1122", createdAt: "2024-01-01T00:00:00.000Z" },
  { id: "b6", name: "Chef V Klang", address: "Jalan Tengku Badar, Klang, Selangor", phone: "03-3377 6655", createdAt: "2024-01-01T00:00:00.000Z" },
  { id: "b7", name: "Chef V Shah Alam", address: "Jalan NOS, Shah Alam, Selangor", phone: "03-5511 2233", createdAt: "2024-01-01T00:00:00.000Z" },
];

const STORAGE_BRANCHES = "chef_v_branches";
const STORAGE_MEMBERS = "chef_v_members";
const STORAGE_VOUCHERS = "chef_v_vouchers";

// ---- UUID Generator ----
export function generateId(): string {
  return "xxxx-xxxx-xxxx".replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  );
}

// ---- Branch CRUD ----
export function getBranches(): Branch[] {
  const stored = localStorage.getItem(STORAGE_BRANCHES);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return SEED_BRANCHES;
    }
  }
  // First run: seed branches
  localStorage.setItem(STORAGE_BRANCHES, JSON.stringify(SEED_BRANCHES));
  return SEED_BRANCHES;
}

export function saveBranches(branches: Branch[]): void {
  localStorage.setItem(STORAGE_BRANCHES, JSON.stringify(branches));
}

export function getBranchById(id: string): Branch | undefined {
  return getBranches().find((b) => b.id === id);
}

// ---- Member CRUD ----
export function getMembers(): Member[] {
  const stored = localStorage.getItem(STORAGE_MEMBERS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveMembers(members: Member[]): void {
  localStorage.setItem(STORAGE_MEMBERS, JSON.stringify(members));
}

export function getMemberById(id: string): Member | undefined {
  return getMembers().find((m) => m.id === id);
}

export function createMember(data: Omit<Member, "id" | "createdAt" | "updatedAt">): Member {
  const members = getMembers();
  const now = new Date().toISOString();
  const newMember: Member = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  members.push(newMember);
  saveMembers(members);
  return newMember;
}

export function updateMember(id: string, data: Partial<Omit<Member, "id" | "createdAt">>): Member | null {
  const members = getMembers();
  const idx = members.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  members[idx] = { ...members[idx], ...data, updatedAt: new Date().toISOString() };
  saveMembers(members);
  return members[idx];
}

export function deleteMember(id: string): void {
  saveMembers(getMembers().filter((m) => m.id !== id));
  // Also delete associated vouchers
  saveVouchers(getVouchers().filter((v) => v.memberId !== id));
}

export function searchMembers(query: string, branchId?: string, birthMonth?: number): Member[] {
  const q = query.toLowerCase().trim();
  return getMembers().filter((m) => {
    const matchesQuery =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.nric.toLowerCase().includes(q) ||
      m.phone.includes(q) ||
      m.email.toLowerCase().includes(q);
    const matchesBranch = !branchId || m.branchId === branchId;
    const matchesMonth =
      !birthMonth ||
      (() => {
        const [day, month] = m.dateOfBirth.split("-");
        return parseInt(month) === birthMonth;
      })();
    return matchesQuery && matchesBranch && matchesMonth;
  });
}

// ---- Voucher CRUD ----
export function getVouchers(): BirthdayVoucher[] {
  const stored = localStorage.getItem(STORAGE_VOUCHERS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveVouchers(vouchers: BirthdayVoucher[]): void {
  localStorage.setItem(STORAGE_VOUCHERS, JSON.stringify(vouchers));
}

export function getVouchersByMember(memberId: string): BirthdayVoucher[] {
  return getVouchers().filter((v) => v.memberId === memberId);
}

export function getVoucherByCode(code: string): BirthdayVoucher | undefined {
  return getVouchers().find((v) => v.voucherCode === code);
}

function generateVoucherCode(year: number): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `BDAY-${year}-${suffix}`;
}

export function issueBirthdayVoucher(memberId: string, year: number): BirthdayVoucher {
  const issuedAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const voucher: BirthdayVoucher = {
    id: generateId(),
    memberId,
    issueYear: year,
    issuedAt,
    redeemedAt: null,
    redeemedBranchId: null,
    voucherCode: generateVoucherCode(year),
    expiresAt,
    status: "active",
  };
  const vouchers = getVouchers();
  vouchers.push(voucher);
  saveVouchers(vouchers);
  return voucher;
}

export function redeemVoucher(voucherId: string, branchId: string): BirthdayVoucher | null {
  const vouchers = getVouchers();
  const idx = vouchers.findIndex((v) => v.id === voucherId);
  if (idx === -1) return null;
  vouchers[idx] = {
    ...vouchers[idx],
    status: "redeemed",
    redeemedAt: new Date().toISOString(),
    redeemedBranchId: branchId,
  };
  saveVouchers(vouchers);
  return vouchers[idx];
}

export function checkAndIssueBirthdayVouchers(): { issued: number; alreadyActive: number } {
  const members = getMembers();
  const vouchers = getVouchers();
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentYear = now.getFullYear();

  let issued = 0;
  let alreadyActive = 0;

  const updatedVouchers = [...vouchers];

  for (const member of members) {
    const [day, month] = member.dateOfBirth.split("-").map(Number);
    if (month !== currentMonth) continue;

    // Check if voucher already exists for this member + year
    const exists = updatedVouchers.some(
      (v) => v.memberId === member.id && v.issueYear === currentYear
    );
    if (exists) {
      alreadyActive++;
      continue;
    }

    const issuedAt = now.toISOString();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    updatedVouchers.push({
      id: generateId(),
      memberId: member.id,
      issueYear: currentYear,
      issuedAt,
      redeemedAt: null,
      redeemedBranchId: null,
      voucherCode: generateVoucherCode(currentYear),
      expiresAt,
      status: "active",
    });
    issued++;
  }

  if (issued > 0) {
    saveVouchers(updatedVouchers);
  }

  // Also expire vouchers past their expiry date
  const allVouchers = getVouchers();
  let expired = false;
  const expiredVouchers = allVouchers.map((v) => {
    if (v.status === "active" && new Date(v.expiresAt) < now) {
      expired = true;
      return { ...v, status: "expired" as const };
    }
    return v;
  });
  if (expired) saveVouchers(expiredVouchers);

  return { issued, alreadyActive };
}