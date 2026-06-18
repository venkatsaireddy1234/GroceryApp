interface SummaryRowProps {
  label: string;
  value: string;
  strong?: boolean;
}

export function SummaryRow({ label, value, strong = false }: SummaryRowProps) {
  return (
    <div className={`mt-5 flex items-center justify-between border-t border-zinc-100 pt-5 ${strong ? "text-lg font-bold" : "text-sm font-semibold text-muted"}`}>
      <span>{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}
