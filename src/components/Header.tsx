import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, User, Menu, Phone, Truck, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "./BrandMark";
import { BRANDS } from "@/data/products";
import { useCart } from "@/lib/cart";
import { COMPANY_PHONE } from "@/lib/whatsapp";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/brands", label: "Brands" },
  { to: "/rfq", label: "Request Quote" },
  { to: "/track-order", label: "Track Order" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border">
      {/* Top utility bar */}
      <div className="bg-secondary text-secondary-foreground text-xs">
        <div className="container-page flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Fast UAE-wide delivery</span>
            <span className="hidden md:inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Genuine & certified compatible</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${COMPANY_PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-accent">
              <Phone className="h-3.5 w-3.5" /> {COMPANY_PHONE}
            </a>
            <Link to="/login" className="hidden sm:inline hover:text-accent">Sign in</Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-page flex items-center gap-4 py-4">
        <button
          className="lg:hidden p-2 -ml-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-secondary" />
        </button>
        <BrandMark />

        {/* Search */}
        <form
          action="/shop"
          className="hidden md:flex flex-1 max-w-2xl mx-4 relative"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            name="q"
            placeholder="Search by printer model, cartridge code or brand…"
            className="w-full h-11 pl-10 pr-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
          />
        </form>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/login" className="hidden md:inline-flex h-10 px-3 items-center gap-2 rounded-md hover:bg-muted text-secondary text-sm">
            <User className="h-5 w-5" /> Account
          </Link>
          <Link to="/cart" className="relative inline-flex h-10 px-3 items-center gap-2 rounded-md hover:bg-muted text-secondary text-sm">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden container-page pb-3">
        <form action="/shop" className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            name="q"
            placeholder="Search cartridge or printer…"
            className="w-full h-10 pl-10 pr-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </form>
      </div>

      {/* Nav */}
      <nav className="hidden lg:block border-t border-border">
        <div className="container-page flex items-center gap-1 h-12">
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button className="h-12 px-4 inline-flex items-center gap-2 font-semibold text-secondary hover:text-primary">
              Shop by Brand
            </button>
            {megaOpen && (
              <div className="absolute top-full left-0 w-[640px] bg-card border border-border rounded-b-lg shadow-card-hover p-6 grid grid-cols-3 gap-4 animate-fade-up">
                {BRANDS.map((b) => (
                  <Link
                    key={b.slug}
                    to="/brands/$slug"
                    params={{ slug: b.slug }}
                    className="block p-3 rounded-md hover:bg-muted group"
                  >
                    <div className="font-semibold text-secondary group-hover:text-primary">{b.name}</div>
                    <div className="text-xs text-muted-foreground">{b.tagline}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="h-12 px-4 inline-flex items-center font-medium text-sm text-secondary hover:text-primary"
              activeProps={{ className: "h-12 px-4 inline-flex items-center font-medium text-sm text-primary border-b-2 border-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-card p-5 overflow-y-auto animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <BrandMark />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 rounded-md hover:bg-muted font-medium text-secondary"
                >
                  {n.label}
                </Link>
              ))}
              <div className="h-px bg-border my-3" />
              <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Brands</div>
              {BRANDS.map((b) => (
                <Link
                  key={b.slug}
                  to="/brands/$slug"
                  params={{ slug: b.slug }}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-muted text-sm text-secondary"
                >
                  {b.name} Toners
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
