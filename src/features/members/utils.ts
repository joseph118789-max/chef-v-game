// ============================================================
// Chef V — Member Management Utilities
// NRIC parsing, date helpers
// ============================================================

import { NRICParseResult } from "./types";

/**
 * Parse Malaysian NRIC and extract date of birth.
 * Format: YYMMDD-PB-XXX or YYMMDDPBXXX (12 chars, no dashes)
 * - YY = last 2 digits of birth year (sliding window so it stays correct as decades roll over)
 * - MM = birth month (01-12, validated against the actual calendar)
 * - DD = birth day (01-31, validated against the actual calendar)
 * - PB = place of birth code, XXX = serial number
 */
export function parseNRIC(nric: string): NRICParseResult {
  const raw = nric.trim();
  const cleaned = raw.replace(/[-\s]/g, "");

  if (cleaned.length !== 12) {
    return { valid: false, dateOfBirth: null, error: "NRIC must be exactly 12 characters" };
  }
  if (!/^\d{12}$/.test(cleaned)) {
    return { valid: false, dateOfBirth: null, error: "NRIC must contain only numbers" };
  }

  const yearShort = parseInt(cleaned.substring(0, 2), 10);
  const month = parseInt(cleaned.substring(2, 4), 10);
  const day = parseInt(cleaned.substring(4, 6), 10);

  if (month < 1 || month > 12) {
    return { valid: false, dateOfBirth: null, error: `Invalid month in NRIC: ${month}` };
  }
  if (day < 1 || day > 31) {
    return { valid: false, dateOfBirth: null, error: `Invalid day in NRIC: ${day}` };
  }

  // Sliding year window: YY <= currentYear%100 → 20YY, else 19YY.
  // Self-adjusting as the decades roll over (in 2031, YY=31 → 2031 not 1931).
  const currentYearShort = new Date().getFullYear() % 100;
  const yearFull = yearShort <= currentYearShort ? 2000 + yearShort : 1900 + yearShort;

  // Round-trip the date to catch impossible combos (Feb 30, Apr 31, etc.)
  const constructed = new Date(yearFull, month - 1, day);
  if (
    constructed.getFullYear() !== yearFull ||
    constructed.getMonth() !== month - 1 ||
    constructed.getDate() !== day
  ) {
    return { valid: false, dateOfBirth: null, error: `Invalid date in NRIC: ${day}/${month}/${yearFull}` };
  }

  const dateOfBirth = `${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}-${yearFull}`;
  return { valid: true, dateOfBirth };
}

/**
 * Mask NRIC for display: show first 6 and last 4 chars only
 * e.g. "910115-01-1234" → "910115-XX-1234"
 */
export function maskNRIC(nric: string): string {
  const raw = nric.replace(/[-\s]/g, "");
  if (raw.length !== 12) return nric;
  return `${raw.substring(0, 6)}-XX-${raw.substring(8)}`;
}

/**
 * Format a DD-MM-YYYY date for display. Returns "—" on invalid input.
 */
export function formatDate(dateStr: string): string {
  if (!dateStr || typeof dateStr !== "string") return "—";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return "—";
  const [day, month, year] = parts;
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  if (!Number.isFinite(d) || !Number.isFinite(m) || !Number.isFinite(y)) return "—";
  if (m < 1 || m > 12) return "—";
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${d} ${monthNames[m - 1]} ${y}`;
}

export interface UpcomingBirthday {
  id: string;
  name: string;
  dateOfBirth: string;
  daysUntil: number;
  birthdayDate: string; // ISO
}

/**
 * Get upcoming birthdays in the next N days, sorted by proximity.
 * Each entry includes daysUntil so the UI can show "in 5 days" etc.
 */
export function getUpcomingBirthdays(
  members: { id: string; name: string; dateOfBirth: string }[],
  days = 30
): UpcomingBirthday[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const currentYear = now.getFullYear();
  const result: UpcomingBirthday[] = [];

  for (const member of members) {
    const parts = member.dateOfBirth.split("-").map(Number);
    if (parts.length !== 3) continue;
    const [day, month] = parts;
    if (!Number.isFinite(day) || !Number.isFinite(month)) continue;

    let target = new Date(currentYear, month - 1, day);
    if (target < today) {
      target = new Date(currentYear + 1, month - 1, day);
    }

    const diffDays = Math.ceil(
      (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays >= 0 && diffDays <= days) {
      result.push({
        id: member.id,
        name: member.name,
        dateOfBirth: member.dateOfBirth,
        daysUntil: diffDays,
        birthdayDate: target.toISOString(),
      });
    }
  }

  return result.sort((a, b) => a.daysUntil - b.daysUntil);
}

/**
 * Format ISO date for display. Returns "—" on invalid input.
 */
export function formatISODate(isoStr: string): string {
  if (!isoStr) return "—";
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Get current month number (1-12)
 */
export function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}