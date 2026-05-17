import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, getBrand, productsByBrand, type Product } from "@/data/products";
import { useCart, formatAED } from "@/lib/cart";
import { whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Check, X, Minus, Plus, ShoppingCart, MessageCircle, FileText, Truck, ShieldCheck, RotateCw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    const brand = getBrand(product.brand)!;
    const related = productsByBrand(product.brand).filter((p) => p.slug !== product.slug).slice(0, 4);
    return { product, brand, related };
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? params.slug} — Tonercart UAE` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:title", content: loaderData?.product.name ?? "" },
      { property: "og:description", content: loaderData?.product.description ?? "" },
      { property: "og:type", content: "product" },
    ],
    links: [{ rel: "canonical", href: `/product/${params.slug}` }],
    scripts: loaderData ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: loaderData.product.name,
        sku: loaderData.product.code,
        brand: { "@type": "Brand", name: loaderData.brand.name },
        description: loaderData.product.description,
        offers: {
          "@type": "Offer",
          priceCurrency: "AED",
          price: loaderData.product.price,
          availability: loaderData.product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
      }),
    }] : [],
  }),
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Link to="/shop" className="text-primary mt-4 inline-block">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

const colorSwatch: Record<string, string> = {
  Black: "bg-secondary",
  Cyan: "bg-cyan-500",
  Magenta: "bg-pink-500",
  Yellow: "bg-yellow-400",
  "Tri-Color": "bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-400",
};

function ProductPage() {
  const { product, brand, related } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const inStock = product.stock > 0;

  return (
    <div className="container-page py-8">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        <Link to="/brands/$slug" params={{ slug: brand.slug }} className="hover:text-primary">{brand.name}</Link> /{" "}
        <span className="text-secondary">{product.code}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Visual */}
        <div className="rounded-2xl bg-card border border-border p-10 aspect-square flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded uppercase tracking-wide ${product.oem === "OEM" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {product.oem}
            </span>
            {product.bestseller && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded uppercase tracking-wide bg-accent text-accent-foreground">Bestseller</span>
            )}
          </div>
          <div className={`h-56 w-80 rounded-md ${colorSwatch[product.color] ?? "bg-secondary"} shadow-2xl flex items-end p-5`}>
            <span className="text-xs font-mono text-white/90 uppercase">{product.code}</span>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-sm text-muted-foreground font-mono uppercase mb-1">{product.code} · {brand.name}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary leading-tight">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3 text-sm">
            {inStock ? (
              <span className="inline-flex items-center gap-1 text-success font-medium">
                <Check className="h-4 w-4" /> In Stock — {product.stock} units available
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-destructive font-medium">
                <X className="h-4 w-4" /> Out of Stock
              </span>
            )}
          </div>

          <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="text-xs text-muted-foreground">Type</div>
              <div className="font-semibold text-secondary">{product.type}</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="text-xs text-muted-foreground">Color</div>
              <div className="font-semibold text-secondary">{product.color}</div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-card p-4">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Compatible Printers</div>
            <div className="flex flex-wrap gap-1.5">
              {product.compatibility.map((m: string) => (
                <span key={m} className="inline-block bg-muted text-secondary text-xs px-2 py-1 rounded">{m}</span>
              ))}
            </div>
          </div>

          {/* Price + actions */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-secondary">{formatAED(product.price)}</span>
              <span className="text-sm text-muted-foreground">excl. VAT (5%)</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">{formatAED(product.price * 1.05)} incl. VAT</div>

            <div className="mt-5 flex items-center gap-3">
              <div className="inline-flex items-center border border-border rounded-md">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 inline-flex items-center justify-center hover:bg-muted" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="w-14 h-11 text-center bg-transparent focus:outline-none font-semibold"
                />
                <button onClick={() => setQty((q) => q + 1)} className="h-11 w-11 inline-flex items-center justify-center hover:bg-muted" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1"
                disabled={!inStock}
                onClick={() => {
                  add(product, qty);
                  toast.success(`${qty} × ${product.code} added to cart`);
                }}
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={whatsappUrl(`Hi, I'm interested in ${product.name} (${product.code}). Qty: ${qty}.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 rounded-md bg-whatsapp text-white text-sm font-medium hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Order
              </a>
              <Link
                to="/rfq"
                search={{ product: product.code }}
                className="inline-flex items-center justify-center gap-2 h-11 rounded-md border border-border text-sm font-medium hover:border-primary hover:text-primary"
              >
                <FileText className="h-4 w-4" /> Request Quote
              </Link>
            </div>
          </div>

          {/* Trust */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
            {[
              { i: Truck, t: "UAE-wide delivery" },
              { i: ShieldCheck, t: "Quality guarantee" },
              { i: RotateCw, t: "Easy returns" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="flex flex-col items-center text-center gap-1 p-3 rounded-md border border-border bg-card">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-secondary font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-secondary mb-6">More from {brand.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {(related as Product[]).map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
