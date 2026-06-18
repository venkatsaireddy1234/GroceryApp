import { ArrowLeft } from "lucide-react";

export function BackLink() {
  return (
    <button onClick={() => window.history.back()} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-bold shadow-sm">
      <ArrowLeft size={17} aria-hidden="true" />
      Back
    </button>
  );
}
