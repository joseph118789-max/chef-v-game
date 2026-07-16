// ============================================================
// MemberForm — Add / Edit member
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import { Branch, Member, MemberFormData } from "./types";
import { parseNRIC } from "./utils";
import NRICInput from "./components/NRICInput";
import BranchSelect from "./components/BranchSelect";

interface MemberFormProps {
  member?: Member | null;
  branches: Branch[];
  onSave: (data: MemberFormData) => { success: boolean; error?: string };
  onBack: () => void;
  t: any;

}

const EMPTY_FORM: MemberFormData = {
  name: "",
  email: "",
  phone: "",
  nric: "",
  dateOfBirth: "",
  branchId: "",
};

export default function MemberForm({ member, branches, t, onSave, onBack }: MemberFormProps) {
  const [form, setForm] = useState<MemberFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof MemberFormData, string>>>({});
  const [nricError, setNricError] = useState<string>();
  const [nricValid, setNricValid] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name,
        email: member.email,
        phone: member.phone,
        nric: member.nric,
        dateOfBirth: member.dateOfBirth,
        branchId: member.branchId,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
    setNricError(undefined);
    setNricValid(false);
  }, [member]);

  const setField = (field: keyof MemberFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof MemberFormData, string>> = {};

    if (!form.name.trim()) errs.name = "Name is required";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";

    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";

    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[\d\s\-+\(\)]{7,15}$/.test(form.phone)) errs.phone = "Invalid phone number";

    if (!form.nric.trim()) {
      errs.nric = "NRIC is required";
    } else if (!nricValid) {
      errs.nric = nricError ?? "Invalid NRIC";
    }

    if (!form.dateOfBirth) errs.dateOfBirth = "Date of birth is required";

    if (!form.branchId) errs.branchId = "Please select a branch";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setSuccessMsg("");

    // Small delay to show saving state
    await new Promise((r) => setTimeout(r, 400));

    const result = onSave(form);
    setSaving(false);

    if (result.success) {
      setSuccessMsg(member ? "Member updated successfully!" : "Member added successfully!");
      if (!member) {
        setForm(EMPTY_FORM);
        setNricValid(false);
      }
    } else {
      setErrors((prev) => ({ ...prev, name: result.error ?? "Failed to save" }));
    }
  };

  const handleNRICValid = (valid: boolean, dob: string | null) => {
    setNricValid(valid);
    if (dob) {
      setForm((prev) => ({ ...prev, dateOfBirth: dob }));
    }
    if (!valid) setNricError("Invalid NRIC format");
    else setNricError(undefined);
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl border border-pink-200 bg-white hover:bg-pink-50 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="font-extrabold text-slate-800 text-lg">
            {member ? "Edit Member" : "Add New Member"}
          </h2>
          <p className="text-slate-500 text-xs">
            {member ? "Update member information" : "Register a new restaurant member"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="e.g. Ahmad bin Abu"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${
              errors.name ? "border-red-400 bg-red-50" : "border-pink-200 focus:border-[#F24E82]"
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="ahmad@example.com"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                errors.email ? "border-red-400 bg-red-50" : "border-pink-200 focus:border-[#F24E82]"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="012-345 6789"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                errors.phone ? "border-red-400 bg-red-50" : "border-pink-200 focus:border-[#F24E82]"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* NRIC */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            NRIC / MyKad <span className="text-red-500">*</span>
          </label>
          <NRICInput
            value={form.nric}
            onChange={(v) => setField("nric", v)}
            onValidChange={handleNRICValid}
            error={errors.nric}
          />
          <p className="text-slate-400 text-[11px] mt-1.5">
            Malaysian IC format: YYMMDD-PB-XXX (e.g. 910115-01-1234). DOB is auto-extracted.
          </p>
          {errors.nric && <p className="text-red-500 text-xs mt-1">{errors.nric}</p>}
        </div>

        {/* DOB (auto-filled from NRIC, editable) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Date of Birth <span className="text-red-500">*</span>
            {nricValid && (
              <span className="ml-2 text-emerald-600 font-normal normal-case">
                ← auto-filled from NRIC
              </span>
            )}
          </label>
          <input
            type="text"
            value={form.dateOfBirth}
            onChange={(e) => setField("dateOfBirth", e.target.value)}
            placeholder="DD-MM-YYYY"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none transition-colors ${
              errors.dateOfBirth ? "border-red-400 bg-red-50" : "border-pink-200 focus:border-[#F24E82]"
            }`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
        </div>

        {/* Branch */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Registered Branch <span className="text-red-500">*</span>
          </label>
          <BranchSelect
            value={form.branchId}
            onChange={(v) => setField("branchId", v)}
            branches={branches}
          />
          {errors.branchId && <p className="text-red-500 text-xs mt-1">{errors.branchId}</p>}
        </div>

        {/* Success */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl">
            {successMsg}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-[#F24E82] hover:bg-[#E03E70] text-white font-bold text-xs py-3 rounded-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {saving ? (
              <span className="animate-pulse">{t.members?.form?.saving || "Saving..."}</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {member ? "Update Member" : "Add Member"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}