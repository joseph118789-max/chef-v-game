// ============================================================
// Chef V — Receipt scoring & validation
// Pure functions so the rules can be unit-tested without spinning
// up tesseract.js or a React tree.
// ============================================================

export interface ReceiptAnalysis {
  /** Whether the text mentions any Chef V brand keyword. */
  hasBrand: boolean;
  /** Weighted score (brand=20, each structure signal=15). */
  score: number;
  /** Detected structure-signal names (e.g. "TOTAL", "HEADER"). */
  foundSignals: string[];
  /** Parsed RM total, or null if no plausible amount was found. */
  total: number | null;
  /** True when all hard validation rules pass. */
  isValid: boolean;
  /** Human-readable list of things the receipt is missing (for error UI). */
  missing: string[];
}

/** Brand keywords that identify a Chef V receipt.
 *  Kept tight on purpose — "WESTERN FOOD" / "MAKANAN BARAT" were previously
 *  in this list but match any western restaurant, so receipts like
 *  "Mamak Western Food Place" passed brand checks. */
export const CHEF_V_KEYWORDS: readonly string[] = [
  "CHEF V",
  "CHEFV",
  "CHEF'S",
  "FOOD PYLON",
  "SUNGAI WAY",
];

/**
 * Receipt structure signals. Order matters for the "missing" message
 * (most informative names first). Each match contributes +15 to the score.
 */
export const STRUCTURE_SIGNALS: ReadonlyArray<[RegExp, string]> = [
  // TOTAL also matches the Malay equivalent "JUMLAH" (and "JUMLAH BESAR").
  [/\b(?:TOTAL|JUMLAH(?:\s*BESAR)?)\b/i, "TOTAL"],
  [/\bSUB[-\s]?TOTAL\b/i, "SUBTOTAL"],
  // Group INVOICE / RECEIPT / RESIT / BIL into a single "HEADER" signal.
  [/\b(?:INVOICE|RECEIPT|RESIT|BIL)\b/i, "HEADER"],
  [/\bSST\b/i, "SST"],
  [/\bTAX\b/i, "TAX"],
  [/\b(?:CASH|TUNAI)\b/i, "CASH"],
  [/\b(?:CHANGE|BAKI)\b/i, "CHANGE"],
  [/\bFEEDME\b/i, "FEEDME"],
  [/\b\d{2}\/\d{2}\/\d{4}\b/, "DATE"],
  [/\b\+?60\d{1,2}[-\s]?\d{3,4}[-\s]?\d{4}\b/, "PHONE"],
  // Item codes like A12, BB1, 12A, 123ABC.
  [/\b(?:[A-Z]{1,3}\d{1,3}|\d{1,3}[A-Z]{1,3})\b/, "ITEM_CODE"],
  [/THANK YOU FOR VISITING/i, "THANK_YOU"],
  [/OFFICIAL RECEIPT/i, "OFFICIAL"],
  [/(?:CASHIER|ROLE\.CASHIER)/i, "CASHIER"],
  // Require explicit "ORDER NO", "ORDER #", "INVOICE #" etc.
  [/\b(?:ORDER\s*(?:NO|NUMBER|#|ID)|INV(?:OICE)?\s*(?:NO|NUMBER|#))\b/i, "ORDER_NO"],
  [/(?:QTY|QUANTITY)\b/i, "QTY"],
];

/** Minimum score (brand + ~3 structure signals) for a receipt to be accepted. */
export const STRUCTURE_THRESHOLD = 60;

/** Core categories that must be present; at most 1 may be missing. */
export const REQUIRED_SIGNALS: readonly string[] = ["HEADER", "TOTAL", "DATE", "QTY"];

/**
 * Pull the largest plausible RM amount out of OCR text.
 * Two passes:
 *  1. Explicit currency markers (RM, MYR, R M, with optional parens).
 *  2. Fallback: any 2-decimal number in the bottom 30% of the text (where the
 *     total line usually sits on thermal-printer receipts).
 */
export function extractTotal(text: string): number | null {
  const amountRegex = /\(?\s*(?:RM|MYR|R\s*M)\s*\)?\s*\(?\s*([0-9]{1,3}(?:[.,][0-9]{2}))\s*\)?/gi;
  const matches: number[] = [];
  let m: RegExpExecArray | null;
  while ((m = amountRegex.exec(text)) !== null) {
    const n = parseFloat(m[1].replace(",", "."));
    if (Number.isFinite(n) && n > 0) matches.push(n);
  }

  if (matches.length === 0) {
    const tail = text.slice(Math.floor(text.length * 0.7));
    const decimalRegex = /([0-9]{1,3}[.,][0-9]{2})/g;
    while ((m = decimalRegex.exec(tail)) !== null) {
      const n = parseFloat(m[1].replace(",", "."));
      if (Number.isFinite(n) && n >= 5 && n <= 500) matches.push(n);
    }
  }

  return matches.length > 0 ? Math.max(...matches) : null;
}

/**
 * Build the human-readable "missing" list for the error toast.
 * Grouped so the user sees one message per concept, not per signal name.
 */
export function buildMissingList(foundSignals: readonly string[], hasBrand: boolean): string[] {
  const missing: string[] = [];
  if (!hasBrand) missing.push("Chef V brand");
  if (!foundSignals.includes("TOTAL") && !foundSignals.includes("SUBTOTAL")) {
    missing.push("total amount");
  }
  if (!foundSignals.includes("HEADER")) missing.push("invoice header");
  if (!foundSignals.includes("DATE") && !foundSignals.includes("PHONE")) {
    missing.push("date or phone");
  }
  if (!foundSignals.includes("ITEM_CODE") && !foundSignals.includes("QTY")) {
    missing.push("item codes or quantity");
  }
  if (!foundSignals.includes("ORDER_NO")) missing.push("order number");
  return missing;
}

/**
 * Run the full receipt analysis on a piece of OCR text.
 * Returns a structured result; caller decides how to react.
 */
export function analyzeReceiptText(text: string): ReceiptAnalysis {
  const upper = text.toUpperCase();

  let score = 0;
  const foundSignals: string[] = [];

  const hasBrand = CHEF_V_KEYWORDS.some((kw) => upper.includes(kw));
  if (hasBrand) {
    score += 20;
    foundSignals.push("brand");
  }

  for (const [re, name] of STRUCTURE_SIGNALS) {
    if (re.test(text)) {
      score += 15;
      foundSignals.push(name);
    }
  }

  const total = extractTotal(text);

  const missingRequired = REQUIRED_SIGNALS.filter((s) => !foundSignals.includes(s));
  const isValid =
    hasBrand &&
    score >= STRUCTURE_THRESHOLD &&
    total !== null &&
    missingRequired.length <= 1;

  const missing = isValid ? [] : buildMissingList(foundSignals, hasBrand);

  return { hasBrand, score, foundSignals, total, isValid, missing };
}