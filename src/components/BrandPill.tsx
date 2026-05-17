import { Link } from "@tanstack/react-router";
import type { Brand } from "@/data/products";

export function BrandPill({ brand }: { brand: Brand }) {
  return (
    <Link
      to="/brands/$slug"
      params={{ slug: brand.slug }}
      className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-6 card-hover"
    >
      <div className="text-2xl font-bold text-secondary group-hover:text-primary tracking-tight">
        {brand.name}
      </div>
      <div className="text-[11px] text-muted-foreground uppercase tracking-widest">Toners</div>
    </Link>
  );
}
