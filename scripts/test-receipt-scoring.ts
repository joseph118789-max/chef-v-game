// ============================================================
// scripts/test-receipt-scoring.ts
// Quick local test for the receipt OCR scoring/validation rules.
// Run with: npm run test:scoring
// ============================================================
import {
  analyzeReceiptText,
  STRUCTURE_SIGNALS,
  STRUCTURE_THRESHOLD,
  CHEF_V_KEYWORDS,
  REQUIRED_SIGNALS,
} from "../src/utils/receiptScoring";

interface TestCase {
  name: string;
  text: string;
  expectValid: boolean;
  /** Optional: spot-check fields on the analysis result. */
  expectHasBrand?: boolean;
  expectTotal?: number | null;
  expectMinScore?: number;
  expectMissingAny?: string[];
}

const cases: TestCase[] = [
  {
    name: "Valid English receipt with all signals",
    text: `CHEF V PJ SECTION 14
OFFICIAL RECEIPT
Invoice No: INV-12345
Date: 12/09/2026
Tel: +60123456789
A1 Chicken Chop   RM 12.50
A2 Iced Tea       RM  4.00
QTY  2
TOTAL             RM 16.50
Thank you for visiting!`,
    expectValid: true,
    expectHasBrand: true,
    expectTotal: 16.5,
  },
  {
    name: "Valid Malay receipt (uses RESIT + JUMLAH)",
    text: `CHEF V SUBANG SS15
RESIT
Tarikh: 12/09/2026
A1 Nasi Bakar Ayam    RM 14.90
B3 Teh Olong          RM  4.50
JUMLAH                RM 19.40
Terima kasih!`,
    expectValid: true,
    expectHasBrand: true,
    expectTotal: 19.4,
  },
  {
    name: "Receipt using RECEIPT instead of INVOICE (was previously rejected)",
    text: `CHEF V KEPONG
RECEIPT
12/09/2026
BB1 Chicken Chop   RM 12.50
TOTAL              RM 12.50
Thank you for visiting!`,
    expectValid: true,
    expectHasBrand: true,
    expectTotal: 12.5,
  },
  {
    name: "Receipt with bare item code A12 (was previously rejected by old ITEM_CODE regex)",
    text: `CHEF V CHERAS
INVOICE
Date: 12/09/2026
A12 Chicken Chop    RM 12.50
TOTAL               RM 12.50`,
    expectValid: true,
    expectTotal: 12.5,
  },
  {
    name: "Receipt with ORDER NO (was previously matched as bare 'ORDER')",
    text: `CHEF V PUCHONG
INVOICE
ORDER NO: 12345
Date: 12/09/2026
A1 Chicken   RM 12.50
TOTAL        RM 12.50
QTY 1`,
    expectValid: true,
  },
  {
    name: "Receipt missing total amount → should fail",
    text: `CHEF V Klang
INVOICE
Date: 12/09/2026
A1 Chicken Chop
Thank you for visiting!`,
    expectValid: false,
    expectHasBrand: true,
  },
  {
    name: "No brand mention → should fail",
    text: `Mamak Restaurant
INVOICE
Date: 12/09/2026
A1 Roti Canai    RM 3.00
TOTAL            RM 3.00`,
    expectValid: false,
    expectHasBrand: false,
  },
  {
    name: "Blank-ish text → should fail",
    text: ``,
    expectValid: false,
    expectHasBrand: false,
  },
  {
    name: "Photo of non-receipt (random text with no signals) → should fail",
    text: `The quick brown fox jumps over the lazy dog. Something something.`,
    expectValid: false,
    expectHasBrand: false,
  },
  {
    name: "Western Food keyword without 'CHEF V' brand → should fail",
    text: `Random Western Food Place
INVOICE
12/09/2026
A1 Burger   RM 12.50
TOTAL       RM 12.50`,
    expectValid: false,
    expectHasBrand: false,
  },
  {
    name: "Receipt with Malaysian phone instead of date (PHONE signal)",
    text: `CHEF V SHAH ALAM
INVOICE
+60123456789
A1 Chicken   RM 12.50
QTY 1
TOTAL        RM 12.50`,
    expectValid: true,
    expectTotal: 12.5,
  },
  {
    name: "Minimal valid receipt (brand + header + total + date)",
    text: `CHEF V PJ
INVOICE
12/09/2026
TOTAL RM 16.50`,
    expectValid: true,
    expectTotal: 16.5,
  },
  {
    name: "Score threshold sanity: receipts scoring just below threshold should fail",
    text: `CHEF V
12/09/2026
TOTAL 16.50`,
    // Has brand + DATE + TOTAL = 20 + 15 + 15 = 50 (< 60 threshold) → invalid
    expectValid: false,
    expectHasBrand: true,
    expectTotal: 16.5,
    expectMissingAny: ["invoice header", "item codes or quantity", "order number"],
  },
];

let pass = 0;
let fail = 0;
const failures: string[] = [];

for (const c of cases) {
  const result = analyzeReceiptText(c.text);
  const checks: Array<[string, boolean]> = [
    ["expectValid", result.isValid === c.expectValid],
  ];
  if (c.expectHasBrand !== undefined) checks.push(["expectHasBrand", result.hasBrand === c.expectHasBrand]);
  if (c.expectTotal !== undefined) checks.push(["expectTotal", result.total === c.expectTotal]);
  if (c.expectMinScore !== undefined) checks.push(["expectMinScore", result.score >= c.expectMinScore]);
  if (c.expectMissingAny) {
    const intersect = c.expectMissingAny.filter((m) => result.missing.includes(m));
    checks.push(["expectMissingAny", intersect.length > 0]);
  }

  const failed = checks.filter(([, ok]) => !ok);
  if (failed.length === 0) {
    pass++;
    console.log(`✓ ${c.name}`);
  } else {
    fail++;
    const detail = failed.map(([k]) => k).join(", ");
    console.log(`✗ ${c.name}`);
    console.log(`  failed: ${detail}`);
    console.log(`  score=${result.score}, hasBrand=${result.hasBrand}, total=${result.total}`);
    console.log(`  foundSignals: ${result.foundSignals.join(", ") || "(none)"}`);
    console.log(`  missing: ${result.missing.join(", ") || "(none)"}`);
    failures.push(c.name);
  }
}

console.log("");
console.log(`Constants sanity:`);
console.log(`  STRUCTURE_THRESHOLD = ${STRUCTURE_THRESHOLD}`);
console.log(`  REQUIRED_SIGNALS    = ${REQUIRED_SIGNALS.join(", ")}`);
console.log(`  CHEF_V_KEYWORDS     = ${CHEF_V_KEYWORDS.length} entries`);
console.log(`  STRUCTURE_SIGNALS   = ${STRUCTURE_SIGNALS.length} patterns`);

console.log("");
console.log(`${pass}/${pass + fail} cases passed`);
if (fail > 0) {
  console.log("");
  console.log("Failures:");
  failures.forEach((f) => console.log(`  - ${f}`));
  process.exit(1);
}