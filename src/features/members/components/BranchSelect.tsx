// ============================================================
// BranchSelect — Dropdown of branches
// ============================================================
import { Branch } from "../types";

interface BranchSelectProps {
  value: string;
  onChange: (branchId: string) => void;
  branches: Branch[];
  placeholder?: string;
}

export default function BranchSelect({
  value,
  onChange,
  branches,
  placeholder = "Select a branch",
}: BranchSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-pink-200 rounded-xl px-4 py-2.5 text-sm bg-white text-slate-800 focus:outline-[#F24E82] focus:border-[#F24E82]"
    >
      <option value="">{placeholder}</option>
      {branches.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))}
    </select>
  );
}