import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { BRANDS, PRODUCTS, type CartridgeColor, type CartridgeType, type OEMType } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLORS: CartridgeColor[] = ["Black", "Cyan", "Magenta", "Yellow", "Tri-Color"];
const TYPES: CartridgeType[] = ["Toner", "Drum", "Maintenance Kit", "Ink"];
const OEMS: OEMType[] = ["OEM", "Compatible"];

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  brand: fallback(z.string(), "").default(""),
  color: fallback(z.string(), "").default(""),
  type: fallback(z.string(), "").default(""),
  oem: fallback(z.string(), "").default(""),
  inStock: fallback(z.boolean(), false).default(false),
});

export const Route = createFileRoute("/shop")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Shop Toner Cartridges — Tonercart LLC UAE" },
      { name: "description", content: "Browse our full catalog of original and compatible toner cartridges, drums and maintenance kits for all major printer brands in the UAE." },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const filtered = useMemo(() => {
    const q = search.q.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (q) {
        const hay = [p.name, p.code, p.brand, ...p.compatibility].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (search.brand && p.brand !== search.brand) return false;
      if (search.color && p.color !== search.color) return false;
      if (search.type && p.type !== search.type) return false;
      if (search.oem && p.oem !== search.oem) return false;
      if (search.inStock && p.stock <= 0) return false;
      return true;
    });
  }, [search]);

  const update = (patch: Partial<typeof search>) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });

  const activeCount = [search.brand, search.color, search.type, search.oem].filter(Boolean).length + (search.inStock ? 1 : 0);

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary">Toner Cartridge Shop</h1>
        <p className="text-muted-foreground mt-2">{filtered.length} products available</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Filters */}
        <aside className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search cartridge or printer…"
              className="w-full h-10 pl-10 pr-4 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>

          {activeCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => navigate({ search: { q: search.q, brand: "", color: "", type: "", oem: "", inStock: false } })}
            >
              <X className="h-3.5 w-3.5" /> Clear {activeCount} filter{activeCount > 1 ? "s" : ""}
            </Button>
          )}

          <FilterGroup title="Brand">
            {BRANDS.map((b) => (
              <FilterRadio
                key={b.slug}
                name="brand"
                checked={search.brand === b.slug}
                onChange={() => update({ brand: search.brand === b.slug ? "" : b.slug })}
                label={b.name}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Type">
            {TYPES.map((t) => (
              <FilterRadio
                key={t}
                name="type"
                checked={search.type === t}
                onChange={() => update({ type: search.type === t ? "" : t })}
                label={t}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Color">
            {COLORS.map((c) => (
              <FilterRadio
                key={c}
                name="color"
                checked={search.color === c}
                onChange={() => update({ color: search.color === c ? "" : c })}
                label={c}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="OEM / Compatible">
            {OEMS.map((o) => (
              <FilterRadio
                key={o}
                name="oem"
                checked={search.oem === o}
                onChange={() => update({ oem: search.oem === o ? "" : o })}
                label={o}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Availability">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={search.inStock}
                onChange={(e) => update({ inStock: e.target.checked })}
                className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
              />
              <span>In stock only</span>
            </label>
          </FilterGroup>
        </aside>

        {/* Grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-xl">
              <h3 className="text-lg font-semibold text-secondary">No products match your filters</h3>
              <p className="text-muted-foreground mt-2">Try clearing filters or contact us for a custom quote.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterRadio({ name, checked, onChange, label }: { name: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 border-border text-primary focus:ring-ring"
      />
      <span className={checked ? "text-primary font-medium" : "text-secondary"}>{label}</span>
    </label>
  );
}
