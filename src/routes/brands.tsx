import { createFileRoute } from "@tanstack/react-router";
import { BRANDS } from "@/data/products";
import { BrandPill } from "@/components/BrandPill";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "All Brands — Tonercart LLC" },
      { name: "description", content: "Explore toner cartridges by brand: Canon, Kyocera, HP, Ricoh, Sharp, Triumph-Adler." },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <div className="container-page py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary">Shop by Brand</h1>
        <p className="text-muted-foreground mt-3">Choose your printer or copier brand to find genuine and compatible toner cartridges.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {BRANDS.map((b) => (
          <div key={b.slug} className="rounded-xl border border-border bg-card p-6 card-hover">
            <BrandPill brand={b} />
            <p className="text-sm text-muted-foreground mt-4">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
