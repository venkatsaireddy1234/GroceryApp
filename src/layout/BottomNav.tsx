import { Heart, Home, Search, ShoppingCart, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/favorites", label: "Fav", icon: Heart },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/location", label: "Account", icon: UserRound },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white px-3 py-2 lg:hidden" aria-label="Primary">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold ${isActive ? "text-leaf-600" : "text-muted"}`
            }
          >
            <Icon size={21} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
