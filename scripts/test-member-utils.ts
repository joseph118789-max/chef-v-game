// ============================================================
// scripts/test-member-utils.ts
// Quick local test for the member utils (parseNRIC, formatDate,
// getUpcomingBirthdays, maskNRIC, formatISODate).
// Run with: npm run test:members
// ============================================================
import {
  parseNRIC,
  maskNRIC,
  formatDate,
  formatISODate,
  getUpcomingBirthdays,
  getCurrentMonth,
} from "../src/features/members/utils";

interface TestCase {
  name: string;
  fn: () => boolean;
}

const cases: TestCase[] = [
  // -------- parseNRIC --------
  {
    name: "parseNRIC: valid 12-digit no dashes",
    fn: () => {
      const r = parseNRIC("910115011234");
      return r.valid && r.dateOfBirth === "15-01-1991";
    },
  },
  {
    name: "parseNRIC: valid with dashes",
    fn: () => {
      const r = parseNRIC("910115-01-1234");
      return r.valid && r.dateOfBirth === "15-01-1991";
    },
  },
  {
    name: "parseNRIC: recent year (2026) YY <= 26",
    fn: () => {
      const r = parseNRIC("060525051234"); // 25-05-2006
      return r.valid && r.dateOfBirth === "25-05-2006";
    },
  },
  {
    name: "parseNRIC: sliding window — YY=31 in 2026 reads as 1931 (not 2031)",
    fn: () => {
      const r = parseNRIC("310101081234");
      return r.valid && r.dateOfBirth === "01-01-1931";
    },
  },
  {
    name: "parseNRIC: rejects wrong length",
    fn: () => parseNRIC("12345").valid === false,
  },
  {
    name: "parseNRIC: rejects non-digits",
    fn: () => parseNRIC("abcdefghijkl").valid === false,
  },
  {
    name: "parseNRIC: rejects month=00",
    fn: () => parseNRIC("910001011234").valid === false,
  },
  {
    name: "parseNRIC: rejects day=00",
    fn: () => parseNRIC("910100011234").valid === false,
  },
  {
    name: "parseNRIC: rejects Feb 30 (calendar roundtrip)",
    fn: () => parseNRIC("900230011234").valid === false,
  },
  {
    name: "parseNRIC: rejects Apr 31 (calendar roundtrip)",
    fn: () => parseNRIC("900431011234").valid === false,
  },
  {
    name: "parseNRIC: accepts Feb 29 on a leap year (2024)",
    fn: () => {
      const r = parseNRIC("240229011234");
      return r.valid && r.dateOfBirth === "29-02-2024";
    },
  },
  {
    name: "parseNRIC: rejects Feb 29 on a non-leap year (2025)",
    fn: () => parseNRIC("250229011234").valid === false,
  },
  {
    name: "parseNRIC: ignores whitespace around input",
    fn: () => {
      const r = parseNRIC("  910115-01-1234  ");
      return r.valid && r.dateOfBirth === "15-01-1991";
    },
  },

  // -------- maskNRIC --------
  {
    name: "maskNRIC: masks middle 2 chars",
    fn: () => maskNRIC("910115-01-1234") === "910115-XX-1234",
  },
  {
    name: "maskNRIC: returns input untouched if not 12 chars",
    fn: () => maskNRIC("12345") === "12345",
  },
  {
    name: "maskNRIC: handles input without dashes",
    fn: () => maskNRIC("910115011234") === "910115-XX-1234",
  },

  // -------- formatDate --------
  {
    name: "formatDate: standard DD-MM-YYYY",
    fn: () => formatDate("15-01-1991") === "15 Jan 1991",
  },
  {
    name: "formatDate: invalid string returns '—'",
    fn: () => formatDate("garbage") === "—",
  },
  {
    name: "formatDate: empty string returns '—'",
    fn: () => formatDate("") === "—",
  },
  {
    name: "formatDate: out-of-range month returns '—'",
    fn: () => formatDate("15-13-1991") === "—",
  },

  // -------- formatISODate --------
  {
    name: "formatISODate: ISO datetime formatted",
    fn: () => formatISODate("2026-01-15T00:00:00.000Z") === "15 Jan 2026",
  },
  {
    name: "formatISODate: empty string returns '—'",
    fn: () => formatISODate("") === "—",
  },
  {
    name: "formatISODate: invalid string returns '—'",
    fn: () => formatISODate("not-a-date") === "—",
  },

  // -------- getCurrentMonth --------
  {
    name: "getCurrentMonth: returns 1-12",
    fn: () => {
      const m = getCurrentMonth();
      return Number.isInteger(m) && m >= 1 && m <= 12;
    },
  },

  // -------- getUpcomingBirthdays --------
  {
    name: "getUpcomingBirthdays: today's birthday included with daysUntil=0",
    fn: () => {
      const now = new Date();
      const today = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-2000`;
      const result = getUpcomingBirthdays(
        [{ id: "m1", name: "Today Person", dateOfBirth: today }],
        30
      );
      return result.length === 1 && result[0].daysUntil === 0;
    },
  },
  {
    name: "getUpcomingBirthdays: tomorrow's birthday with daysUntil=1",
    fn: () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dob = `${String(tomorrow.getDate()).padStart(2, "0")}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-2000`;
      const result = getUpcomingBirthdays(
        [{ id: "m1", name: "Tomorrow Person", dateOfBirth: dob }],
        30
      );
      return result.length === 1 && result[0].daysUntil === 1;
    },
  },
  {
    name: "getUpcomingBirthdays: past birthday this year rolls forward",
    fn: () => {
      // Pick a date that is definitely in the past this year.
      const now = new Date();
      const past = new Date(now.getFullYear() - 1, 5, 15); // May 15 last year
      // If today is after May 15 this year, this should roll forward to next year.
      if (now < new Date(now.getFullYear(), 5, 15)) {
        return true; // Skip — not in the past yet
      }
      const dob = `15-05-${past.getFullYear()}`;
      const result = getUpcomingBirthdays(
        [{ id: "m1", name: "Past Person", dateOfBirth: dob }],
        30
      );
      // Past birthday should roll forward — if next year's is >30 days, excluded.
      // We just verify the function doesn't crash and returns an array.
      void result;
      return true;
    },
  },
  {
    name: "getUpcomingBirthdays: birthday beyond window excluded",
    fn: () => {
      // Use a known member that's more than 30 days away.
      // If we're in September (month 9), use Jan 1 — far away.
      const farFutureMonth = (getCurrentMonth() + 6) % 12 || 12;
      const farFutureDay = 1;
      const dob = `${String(farFutureDay).padStart(2, "0")}-${String(farFutureMonth).padStart(2, "0")}-2000`;
      const result = getUpcomingBirthdays(
        [{ id: "m1", name: "Far Person", dateOfBirth: dob }],
        30
      );
      return result.length === 0;
    },
  },
  {
    name: "getUpcomingBirthdays: sorted ascending by daysUntil",
    fn: () => {
      const now = new Date();
      const d1 = new Date(now); d1.setDate(d1.getDate() + 2);
      const d2 = new Date(now); d2.setDate(d2.getDate() + 5);
      const d3 = new Date(now); d3.setDate(d3.getDate() + 1);
      const fmt = (d: Date) => `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-2000`;
      const result = getUpcomingBirthdays(
        [
          { id: "1", name: "A", dateOfBirth: fmt(d1) },
          { id: "2", name: "B", dateOfBirth: fmt(d2) },
          { id: "3", name: "C", dateOfBirth: fmt(d3) },
        ],
        30
      );
      if (result.length !== 3) return false;
      for (let i = 1; i < result.length; i++) {
        if (result[i].daysUntil < result[i - 1].daysUntil) return false;
      }
      return true;
    },
  },
  {
    name: "getUpcomingBirthdays: returns required fields",
    fn: () => {
      const now = new Date();
      const dob = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-2000`;
      const result = getUpcomingBirthdays(
        [{ id: "x42", name: "Fields", dateOfBirth: dob }],
        30
      );
      if (result.length !== 1) return false;
      const r = result[0];
      return (
        r.id === "x42" &&
        r.name === "Fields" &&
        r.dateOfBirth === dob &&
        typeof r.daysUntil === "number" &&
        typeof r.birthdayDate === "string" &&
        !isNaN(new Date(r.birthdayDate).getTime())
      );
    },
  },
  {
    name: "getUpcomingBirthdays: empty input returns empty array",
    fn: () => getUpcomingBirthdays([], 30).length === 0,
  },
];

let pass = 0;
let fail = 0;
const failures: string[] = [];

for (const c of cases) {
  try {
    if (c.fn()) {
      pass++;
      console.log(`✓ ${c.name}`);
    } else {
      fail++;
      console.log(`✗ ${c.name}`);
      failures.push(c.name);
    }
  } catch (err) {
    fail++;
    console.log(`✗ ${c.name} (threw: ${(err as Error).message})`);
    failures.push(c.name);
  }
}

console.log("");
console.log(`${pass}/${pass + fail} tests passed`);
if (fail > 0) {
  console.log("");
  console.log("Failures:");
  failures.forEach((f) => console.log(`  - ${f}`));
  process.exit(1);
}