# Chef V — Member Management Module Specification

## Overview

A member management module for Chef V Western Food restaurant chain. Tracks members by NRIC, manages multiple branches, and auto-generates birthday vouchers redeemable for 30 days each year.

---

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **State**: React `useState` + `localStorage` (same pattern as existing app)
- **Icons**: lucide-react (already installed)
- **Architecture**: Feature-based (`src/features/members/`)
- **Persistence**: `localStorage` key `chef_v_members` (branches: `chef_v_branches`, vouchers: `chef_v_vouchers`)

---

## Data Models

### Branch
```typescript
interface Branch {
  id: string;           // UUID
  name: string;         // e.g. "Chef V PJ Section 14"
  address: string;
  phone: string;
  createdAt: string;    // ISO date
}
```

### Member
```typescript
interface Member {
  id: string;           // UUID
  name: string;
  email: string;
  phone: string;
  nric: string;         // Malaysian NRIC: YYMMDD-PB-XXX or YYMMDDPBXXX (12 chars)
  dateOfBirth: string;  // Extracted from NRIC: DD-MM-YYYY
  branchId: string;     // FK to Branch
  joinDate: string;     // ISO date
  createdAt: string;
  updatedAt: string;
}
```

### BirthdayVoucher
```typescript
interface BirthdayVoucher {
  id: string;           // UUID
  memberId: string;    // FK to Member
  issueYear: number;   // Year voucher was issued (e.g. 2026)
  issuedAt: string;    // ISO date
  redeemedAt: string | null;   // null = unredeemed
  redeemedBranchId: string | null;
  voucherCode: string; // e.g. "BDAY-2026-XXXXX"
  expiresAt: string;   // issuedAt + 30 days
  status: "active" | "redeemed" | "expired";
}
```

---

## NRIC Validation & DOB Extraction

### Malaysian NRIC Format
- 12 characters: `YYMMDD-PB-XXX` (with dash) or `YYMMDDPBXXX` (no dash)
- `YYMMDD` = birthdate in DDMMYY format (note: day is first two digits)
- `PB` = place of birth code (01-59 for West Malaysia, 60-99 for East Malaysia/Sarawak)
- `XXX` = serial number

### DOB Extraction Rules
1. Strip dashes from NRIC
2. Extract first 6 digits: `YYMMDD`
3. Parse: `DD` = day (01-31), `MM` = month (01-12), `YY` = year
4. Convert `YY` to full year: `YY >= 00 && YY <= 30` → `20YY`, else `19YY`
5. Validate: day 01-31, month 01-12
6. Reject invalid NRIC formats

---

## Business Rules

### Voucher Generation
- System checks on app load: for each member whose birth month matches current month AND no voucher exists for that year → auto-generate voucher
- Voucher valid for 30 days from issue date
- Voucher code format: `BDAY-{YEAR}-{5-char-alphanumeric}`

### Voucher Redemption
- Member presents voucher code at branch
- Staff searches voucher by code
- Voucher status changes from `active` → `redeemed`
- Redemption records: `redeemedAt`, `redeemedBranchId`

### Member Search
- Search by: name, NRIC, phone, email
- Filter by: branch, birth month

---

## UI / Pages

### Tab: "Members" (new tab alongside existing Home/Album/Spin/Shop/Admin)

#### 1. Members Dashboard (`/members`)
- Stats row: Total members | Members with birthday this month | Active vouchers | Vouchers redeemed this month
- Quick actions: Add Member button
- Recent members list (last 5)
- Members with upcoming birthdays (next 30 days)

#### 2. Members List (`/members/list`)
- Search bar (name, NRIC, phone, email)
- Filter: Branch dropdown, Birth month dropdown
- Table: Name, NRIC (masked: `XXXXXX-XX-1234`), Phone, Branch, DOB, Voucher status, Actions
- Pagination: 10 per page
- Empty state when no members

#### 3. Add/Edit Member (`/members/form`)
- Form fields: Name, Email, Phone, NRIC, Branch (select), Date of Birth (auto-filled from NRIC, editable)
- NRIC input: live validation + DOB preview as user types
- Submit creates/updates member in localStorage

#### 4. Member Detail (`/members/:id`)
- Member info card (name, NRIC, DOB, branch, join date)
- Voucher history table (all vouchers for this member)
- Edit button → goes to form
- Delete member (with confirmation)

#### 5. Voucher Management (`/members/vouchers`)
- Search by voucher code
- Filter: Status (active/redeemed/expired), Branch
- Table: Voucher code | Member name | Issued | Expires | Status | Redeemed at (if applicable)
- Redeem action: input voucher code → mark as redeemed

---

## Component Inventory

| Component | Description |
|-----------|-------------|
| `MembersDashboard` | Stats + quick actions + recent/upcoming lists |
| `MembersList` | Searchable/filterable member table |
| `MemberDetail` | Single member view + voucher history |
| `MemberForm` | Add/edit member form with NRIC validation |
| `VoucherManagement` | Voucher search + redemption |
| `VoucherStatusBadge` | Colored badge: active (green) / redeemed (blue) / expired (red) |
| `NRICInput` | Input with live validation and DOB preview |
| `BranchSelect` | Dropdown of branches |
| `StatsCard` | Reusable stat card for dashboard |
| `SearchBar` | Shared search input component |
| `ConfirmDialog` | Reusable confirmation modal |
| `Toast` | Reuse existing toast pattern from App.tsx |

---

## localStorage Keys

| Key | Data |
|-----|------|
| `chef_v_members` | `Member[]` |
| `chef_v_branches` | `Branch[]` |
| `chef_v_vouchers` | `BirthdayVoucher[]` |

---

## Default Branches (seed data)

Seeded on first load if localStorage is empty:
1. Chef V PJ Section 14
2. Chef V Subang SS15
3. Chef V Cheras
4. Chef V Kepong
5. Chef V Puchong
6. Chef V Klang
7. Chef V Shah Alam

---

## Routing / Navigation

Since the existing app uses tab-based navigation (no React Router), all member pages are rendered as conditional panels within the `currentTab === "members"` block, using an internal `membersView` state:
- `membersView: "dashboard" | "list" | "form" | "detail" | "vouchers"`
- `selectedMemberId` for detail/form editing