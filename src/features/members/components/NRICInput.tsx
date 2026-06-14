// ============================================================
// NRICInput — NRIC field with live validation + DOB preview
// ============================================================
import { useState } from "react";
import { parseNRIC } from "../utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface NRICInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidChange?: (valid: boolean, dateOfBirth: string | null) => void;
  error?: string;
}

export default function NRICInput({
  value,
  onChange,
  onValidChange,
  error: externalError,
}: NRICInputProps) {
  const [touched, setTouched] = useState(false);

  const internalError = touched ? externalError : undefined;
  const parsed = value.trim().length >= 12 ? parseNRIC(value) : null;
  const showSuccess = touched && parsed?.valid && !externalError;
  const showError = touched && (!!internalError || (parsed !== null && !parsed.valid));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.toUpperCase();
    onChange(v);
    if (v.replace(/[-\s]/g, "").length >= 12 && onValidChange) {
      const result = parseNRIC(v);
      onValidChange(result.valid, result.dateOfBirth);
    } else if (onValidChange) {
      onValidChange(false, null);
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder="910115-01-1234"
          maxLength={14}
          className={`w-full border rounded-xl px-4 py-2.5 text-sm font-mono tracking-wider focus:outline-none transition-colors ${
            showError
              ? "border-red-400 bg-red-50 focus:border-red-500"
              : showSuccess
              ? "border-emerald-400 bg-emerald-50 focus:border-emerald-500"
              : "border-pink-200 bg-white focus:border-[#F24E82]"
          }`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {showSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          {showError && <AlertCircle className="w-4 h-4 text-red-500" />}
        </div>
      </div>

      {/* Inline feedback */}
      {showError && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {parsed && !parsed.valid ? parsed.error : externalError}
        </p>
      )}

      {/* DOB preview */}
      {showSuccess && parsed?.dateOfBirth && (
        <p className="text-emerald-600 text-xs mt-1 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          DOB: <strong>{parsed.dateOfBirth}</strong>
        </p>
      )}
    </div>
  );
}