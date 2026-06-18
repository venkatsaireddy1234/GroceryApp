import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";

export function AppShell() {
  return (
    <main className="min-h-screen bg-cream pb-24 lg:pb-0">
      <TopBar />
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <BottomNav />
    </main>
  );
}
