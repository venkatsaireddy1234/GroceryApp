interface LabelledInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  maxLength?: number;
}

export function LabelledInput({ label, value, onChange, autoComplete, inputMode, maxLength }: LabelledInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-muted">{label}</span>
      <input
        className="mt-2 h-14 w-full border-b border-zinc-200 bg-transparent text-base font-medium text-ink"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
      />
    </label>
  );
}
