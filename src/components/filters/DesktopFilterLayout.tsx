import { ReactNode } from "react";
import { FilterPanel } from "./FilterPanel";

interface DesktopFilterLayoutProps {
  children: ReactNode;
}

export function DesktopFilterLayout({ children }: DesktopFilterLayoutProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="hidden lg:block">
        <FilterPanel />
      </aside>
      {children}
    </div>
  );
}
