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
  { id: "b7", name: "Chef V Shah Alam", address: "Jalan SS 14/2, Shah Alam, Selangor", phone: "03-5511 2233", createdAt: "2024-01-01T00:00:00.000Z" },
];

const STORAGE_BRANCHES = "chef_v_branches";
const STORAGE_MEMBERS = "chef_v_members";
const STORAGE_VOUCHERS = "chef_v_vouchers";
// Separate version keys so a branch-only update doesn't wipe member data (and vice-versa).
const STORAGE_BRANCHES_SEED_VERSION = "chef_v_branches_seed_version";
const STORAGE_MEMBERS_SEED_VERSION = "chef_v_members_seed_version";
const LEGACY_SEED_VERSION_KEY = "chef_v_seed_version";
const BRANCHES_SEED_VERSION = "v2";
const MEMBERS_SEED_VERSION = "v2";

/**
 * One-time migration: if the old combined `chef_v_seed_version` key exists, copy
 * its value into both new keys so existing users keep their data on first read.
 */
function migrateLegacySeedVersion(): void {
  if (typeof localStorage === "undefined") return;
  const legacy = localStorage.getItem(LEGACY_SEED_VERSION_KEY);
  if (legacy === null) return;
  if (localStorage.getItem(STORAGE_BRANCHES_SEED_VERSION) === null) {
    localStorage.setItem(STORAGE_BRANCHES_SEED_VERSION, legacy);
  }
  if (localStorage.getItem(STORAGE_MEMBERS_SEED_VERSION) === null) {
    localStorage.setItem(STORAGE_MEMBERS_SEED_VERSION, legacy);
  }
}

// ---- Seed Members (for demo) ----
const SEED_MEMBERS: Member[] = [
  { id: "m1", name: "Liang Test", email: "liang@test.com", phone: "60162222222", nric: "950202056789", dateOfBirth: "02-02-1995", branchId: "b3", joinDate: "2026-01-15", createdAt: "2026-01-15T00:00:00.000Z", updatedAt: "2026-01-15T00:00:00.000Z" },
  { id: "m2", name: "Ahmad Razif", email: "ahmad@test.com", phone: "60145551234", nric: "890506014861", dateOfBirth: "06-05-1989", branchId: "b1", joinDate: "2026-02-10", createdAt: "2026-02-10T00:00:00.000Z", updatedAt: "2026-02-10T00:00:00.000Z" },
  { id: "m3", name: "Siti Aminah", email: "siti@test.com", phone: "60136548721", nric: "710318099571", dateOfBirth: "18-03-1971", branchId: "b2", joinDate: "2026-03-05", createdAt: "2026-03-05T00:00:00.000Z", updatedAt: "2026-03-05T00:00:00.000Z" },
  { id: "m4", name: "Raj Kumar", email: "raj@test.com", phone: "601171516931", nric: "050801131545", dateOfBirth: "01-08-2005", branchId: "b4", joinDate: "2026-04-20", createdAt: "2026-04-20T00:00:00.000Z", updatedAt: "2026-04-20T00:00:00.000Z" },
  { id: "m5", name: "Wong Mei Ling", email: "wong@test.com", phone: "60196536667", nric: "720113059083", dateOfBirth: "13-01-1972", branchId: "b5", joinDate: "2026-05-01", createdAt: "2026-05-01T00:00:00.000Z", updatedAt: "2026-05-01T00:00:00.000Z" },
  { id: "m6", name: "Tan Bee Hua", email: "tan@test.com", phone: "60133221578", nric: "850720085264", dateOfBirth: "20-07-1985", branchId: "b6", joinDate: "2026-06-12", createdAt: "2026-06-12T00:00:00.000Z", updatedAt: "2026-06-12T00:00:00.000Z" },
  { id: "m7", name: "Nurul Ain", email: "nurul@test.com", phone: "60147221589", nric: "920707105362", dateOfBirth: "07-07-1992", branchId: "b7", joinDate: "2026-06-25", createdAt: "2026-06-25T00:00:00.000Z", updatedAt: "2026-06-25T00:00:00.000Z" },
  { id: "m8", name: "Vikram Singh", email: "vikram@test.com", phone: "60195551234", nric: "880715885321", dateOfBirth: "15-07-1988", branchId: "b2", joinDate: "2026-07-10", createdAt: "2026-07-10T00:00:00.000Z", updatedAt: "2026-07-10T00:00:00.000Z" },
  { id: "m9", name: "Chong Mei Yee", email: "chong@test.com", phone: "60128887766", nric: "950725065432", dateOfBirth: "25-07-1995", branchId: "b4", joinDate: "2026-07-12", createdAt: "2026-07-12T00:00:00.000Z", updatedAt: "2026-07-12T00:00:00.000Z" },
];

// ---- UUID Generator (real v4) ----
export function generateId(): string {
  // Prefer native crypto.randomUUID (modern browsers, Node 19+)
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback: assemble a UUID v4 from getRandomValues
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // RFC 4122 variant
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  // Last resort: Math.random (not cryptographically secure, but unique enough for demo)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ---- Branch CRUD ----
export function getBranches(): Branch[] {
  migrateLegacySeedVersion();
  const stored = localStorage.getItem(STORAGE_BRANCHES);
  const version = localStorage.getItem(STORAGE_BRANCHES_SEED_VERSION);
  if (stored && version === BRANCHES_SEED_VERSION) {
    try {
      return JSON.parse(stored);
    } catch {
      return SEED_BRANCHES;
    }
  }
  // First run OR outdated branch seed: re-seed branches only.
  localStorage.setItem(STORAGE_BRANCHES, JSON.stringify(SEED_BRANCHES));
  localStorage.setItem(STORAGE_BRANCHES_SEED_VERSION, BRANCHES_SEED_VERSION);
  return SEED_BRANCHES;
}

export function saveBranches(branches: Branch[]): void {
  localStorage.setItem(STORAGE_BRANCHES, JSON.stringify(branches));
}

// ---- Member CRUD ----
export function getMembers(): Member[] {
  migrateLegacySeedVersion();
  const stored = localStorage.getItem(STORAGE_MEMBERS);
  const version = localStorage.getItem(STORAGE_MEMBERS_SEED_VERSION);
  if (stored && version === MEMBERS_SEED_VERSION) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  console.log(`[Members] Re-seeding: stored=${!!stored}, version=${version}, expected=${MEMBERS_SEED_VERSION}`);
  localStorage.setItem(STORAGE_MEMBERS, JSON.stringify(SEED_MEMBERS));
  localStorage.setItem(STORAGE_MEMBERS_SEED_VERSION, MEMBERS_SEED_VERSION);
  return SEED_MEMBERS;
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
  const members = getMembers().filter((m) => m.id !== id);
  const vouchers = getVouchers().filter((v) => v.memberId !== id);
  saveMembers(members);
  saveVouchers(vouchers);
}

export function searchMembers(query: string, branchId?: string, birthMonth?: number): Member[] {
  const q = query.toLowerCase().trim();
  return getMembers().filter((m) => {
    const matchesQuery =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.nric.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q);
    const matchesBranch = !branchId || m.branchId === branchId;
    const matchesMonth =
      !birthMonth ||
      parseInt(m.dateOfBirth.split("-")[1], 10) === birthMonth;
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

/**
 * One-pass maintenance:
 *   1. Mark any active voucher whose expiresAt has passed as "expired".
 *   2. Auto-issue birthday vouchers for any member whose birth month matches
 *      the current month and who doesn't already have one for the current year.
 *      Voucher expires 30 days from the member's actual birthday (not issue date)
 *      so early-month birthdays still get the full 30-day validity window.
 */
export function checkAndIssueBirthdayVouchers(): { issued: number; alreadyActive: number; expired: number } {
  const members = getMembers();
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const existing = getVouchers();
  const updated: BirthdayVoucher[] = [];
  let expired = 0;

  // Pass 1: expire stale active vouchers in place.
  for (const v of existing) {
    if (v.status === "active" && new Date(v.expiresAt) < now) {
      updated.push({ ...v, status: "expired" });
      expired++;
    } else {
      updated.push(v);
    }
  }

  // Pass 2: issue vouchers for members whose birth month is the current month.
  let issued = 0;
  let alreadyActive = 0;
  for (const member of members) {
    const parts = member.dateOfBirth.split("-").map(Number);
    if (parts.length !== 3) continue;
    const [bday, bmonth] = parts;
    if (bmonth !== currentMonth) continue;
    if (!Number.isFinite(bday)) continue;

    const existingForYear = updated.find(
      (v) => v.memberId === member.id && v.issueYear === currentYear
    );
    if (existingForYear) {
      alreadyActive++;
      continue;
    }

    // 30 days from the member's actual birthday this year (not from now),
    // so the validity window is independent of when the app happened to load.
    const birthdayThisYear = new Date(currentYear, bmonth - 1, bday);
    const expiresAt = new Date(birthdayThisYear.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

    updated.push({
      id: generateId(),
      memberId: member.id,
      issueYear: currentYear,
      issuedAt: now.toISOString(),
      redeemedAt: null,
      redeemedBranchId: null,
      voucherCode: generateVoucherCode(currentYear),
      expiresAt,
      status: "active",
    });
    issued++;
  }

  if (issued > 0 || expired > 0) {
    saveVouchers(updated);
  }

  return { issued, alreadyActive, expired };
}