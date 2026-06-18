import { Filter, X } from "lucide-react";
import { useState } from "react";
import { FilterPanel } from "./FilterPanel";

export function FilterSheetButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="grid h-10 w-10 place-items-center rounded-full bg-leaf-50 text-leaf-600 lg:hidden" aria-label="Open filters">
        <Filter size={19} aria-hidden="true" />
      </button>
      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-ink/40 p-4 lg:hidden" role="dialog" aria-modal="true">
          <div className="ml-auto mt-20 max-w-sm">
            <div className="mb-3 flex justify-end">
              <button onClick={() => setIsOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Close filters">
                <X size={19} aria-hidden="true" />
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>
      ) : null}
    </>
  );
}
