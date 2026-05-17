import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getBrand, productsByBrand, BRANDS, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/brands/$slug")({
  loader: ({ params }) => {
    const brand = getBrand(params.slug);
    if (!brand) throw notFound();
    return { brand, products: productsByBrand(params.slug) };
  },
  head: ({ params, loaderData }) => ({
    meta: [
      { title: `${loaderData?.brand.name ?? params.slug} Toner Cartridges UAE — Tonercart LLC` },
      { name: "description", content: `Buy ${loaderData?.brand.name ?? ""} original and compatible toner cartridges in the UAE. Fast delivery, VAT invoice, bulk pricing.` },
      { property: "og:title", content: `${loaderData?.brand.name ?? ""} Toners — Tonercart UAE` },
      { property: "og:description", content: loaderData?.brand.description ?? "" },
    ],
    links: [{ rel: "canonical", href: `/brands/${params.slug}` }],
  }),
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="text-2xl font-bold">Brand not found</h1>
      <Link to="/brands" className="text-primary mt-4 inline-block">Back to brands</Link>
    </div>
  ),
  component: BrandPage,
});

function BrandPage() {
  const { brand, products } = Route.useLoaderData();
  const bestsellers = (products as Product[]).filter((p) => p.bestseller);

  return (
    <>
      {/* Banner */}
      <section className="gradient-hero text-white">
        <div className="container-page py-14 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Authorised brand</div>
            <h1 className="text-4xl md:text-5xl font-bold">{brand.name} Toner Cartridges</h1>
            <p className="mt-3 text-white/80 text-lg max-w-2xl">{brand.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {brand.popularSeries.map((s: string) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> {s}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white text-secondary rounded-xl px-8 py-6 text-center">
            <div className="text-5xl font-bold">{brand.name}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Toners</div>
          </div>
        </div>
      </section>

      <div className="container-page py-12">
        {bestsellers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary mb-6">Best-Selling {brand.name} Cartridges</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {bestsellers.map((p: Product) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold text-secondary mb-6">All {brand.name} Products</h2>
          {products.length === 0 ? (
            <div className="text-muted-foreground">No products yet. Contact us for a quote.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {(products as Product[]).map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </section>

        {/* SEO content */}
        <section className="mt-16 prose-sm max-w-3xl">
          <h2 className="text-2xl font-bold text-secondary mb-4">About {brand.name} Toners in the UAE</h2>
          <p className="text-muted-foreground leading-relaxed">
            Tonercart LLC is a leading UAE supplier of {brand.name} toner cartridges, drum units and consumables.
            We stock both genuine OEM and high-quality certified compatible cartridges, with same-day delivery in Dubai and next-day delivery across all Emirates.
            All orders include a UAE VAT invoice and our quality guarantee.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Whether you operate a single {brand.name} device or manage a fleet of office copiers,
            our team helps you identify the right cartridge and offers bulk pricing for offices, schools and government entities.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild><Link to="/rfq">Request a Quote</Link></Button>
            <Button asChild variant="outline"><Link to="/contact">Talk to Sales</Link></Button>
          </div>
        </section>

        <section className="mt-16">
          <h3 className="text-lg font-semibold text-secondary mb-4">Explore other brands</h3>
          <div className="flex flex-wrap gap-2">
            {BRANDS.filter((b) => b.slug !== brand.slug).map((b) => (
              <Link
                key={b.slug}
                to="/brands/$slug"
                params={{ slug: b.slug }}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
              >
                {b.name} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
