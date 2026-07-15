// ============================================================
// Chef V — Member Management Utilities
// NRIC parsing, date helpers
// ============================================================

import { NRICParseResult } from "./types";

/**
 * Parse Malaysian NRIC and extract date of birth.
 * Format: YYMMDD-PB-XXX or YYMMDDPBXXX (12 chars, no dashes)
 * - YYMMDD = birthdate in YYMMDD format (year first!)
 * - PB = place of birth code
 * - XXX = serial number
 */
export function parseNRIC(nric: string): NRICParseResult {
  const raw = nric.trim();

  // Strip dashes and spaces
  const cleaned = raw.replace(/[-\s]/g, "");

  if (cleaned.length !== 12) {
    return { valid: false, dateOfBirth: null, error: "NRIC must be exactly 12 characters" };
  }

  if (!/^\d{12}$/.test(cleaned)) {
    return { valid: false, dateOfBirth: null, error: "NRIC must contain only numbers" };
  }

  // NRIC format: YYMMDD-PB-XXX
  const yearShort = parseInt(cleaned.substring(0, 2), 10);
  const month = parseInt(cleaned.substring(2, 4), 10);
  const day = parseInt(cleaned.substring(4, 6), 10);

  if (month < 1 || month > 12) {
    return { valid: false, dateOfBirth: null, error: `Invalid month in NRIC: ${month}` };
  }

  if (day < 1 || day > 31) {
    return { valid: false, dateOfBirth: null, error: `Invalid day in NRIC: ${day}` };
  }

  // Convert 2-digit year to 4-digit
  // 00-30 → 2000-2030, otherwise → 1900-1999
  const yearFull = yearShort <= 30 ? 2000 + yearShort : 1900 + yearShort;

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
 * Format a DD-MM-YYYY date for display
 */
export function formatDate(dateStr: string): string {
  const [day, month, year] = dateStr.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const m = parseInt(month, 10);
  return `${parseInt(day, 10)} ${monthNames[m - 1]} ${year}`;
}

/**
 * Get birth month (1-12) from DD-MM-YYYY date string
 */
export function getBirthMonth(dateOfBirth: string): number {
  return parseInt(dateOfBirth.split("-")[1], 10);
}

/**
 * Get upcoming birthdays in the next N days
 */
export function getUpcomingBirthdays(members: { dateOfBirth: string; name: string }[], days = 30): string[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const upcoming: string[] = [];

  for (const member of members) {
    const [day, month] = member.dateOfBirth.split("-").map(Number);
    const birthdayThisYear = new Date(currentYear, month - 1, day);
    const birthdayNextYear = new Date(currentYear + 1, month - 1, day);

    const targetBirthday =
      birthdayThisYear >= now
        ? birthdayThisYear
        : birthdayNextYear;

    const diffDays = Math.ceil(
      (targetBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= days) {
      upcoming.push(member.name);
    }
  }

  return upcoming;
}

/**
 * Format ISO date for display (short)
 */
export function formatISODate(isoStr: string): string {
  const d = new Date(isoStr);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Check if a date string is today
 */
export function isToday(month: number): boolean {
  return new Date().getMonth() + 1 === month;
}

/**
 * Get current month number (1-12)
 */
export function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}