import { MapPin, ShoppingBag, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";

export function TopBar() {
  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/home" className="flex items-center gap-3 font-bold text-ink">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-leaf-500 text-white">
            <ShoppingBag size={21} aria-hidden="true" />
          </span>
          <span className="hidden text-lg sm:block">Grocer</span>
        </Link>
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-muted">
          <MapPin size={17} className="shrink-0 text-leaf-600" aria-hidden="true" />
          <span className="truncate">{user?.location ?? "Bengaluru, Karnataka"}</span>
        </div>
        <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full bg-cream" aria-label="Cart">
          <ShoppingCart size={20} aria-hidden="true" />
          {count > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-leaf-500 px-1 text-xs font-bold text-white">
              {count}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
