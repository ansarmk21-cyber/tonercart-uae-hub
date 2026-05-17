import { Link } from "@tanstack/react-router";
import { Home, ShoppingBag, FileText, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
  { to: "/rfq", label: "Quote", icon: FileText },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/login", label: "Account", icon: User },
] as const;

export function MobileBottomNav() {
  const { count } = useCart();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-card border-t border-border">
      <div className="grid grid-cols-5">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              activeOptions={{ exact: it.to === "/" }}
              className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] text-muted-foreground hover:text-primary relative"
              activeProps={{ className: "flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] text-primary relative" }}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{it.label}</span>
              {it.to === "/cart" && count > 0 && (
                <span className="absolute top-1 right-[calc(50%-18px)] bg-accent text-accent-foreground text-[9px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
