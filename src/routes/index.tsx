import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, ShieldCheck, Truck, Headphones, Building2, Sparkles, MessageCircle, Star } from "lucide-react";
import heroImg from "@/assets/hero-toners.jpg";
import { BRANDS, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { BrandPill } from "@/components/BrandPill";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tonercart LLC — Toner Cartridges & Copier Consumables UAE" },
      { name: "description", content: "Buy original & compatible toner cartridges for Canon, Kyocera, HP, Ricoh, Sharp & Triumph-Adler. Fast UAE delivery, VAT invoice, COD & bulk pricing." },
      { property: "og:title", content: "Tonercart LLC — Toner Cartridges UAE" },
      { property: "og:description", content: "Original & compatible toner cartridges with fast UAE delivery." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero text-white">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24 relative">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-3 py-1 text-xs font-medium mb-5">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Trusted by 500+ UAE businesses
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              UAE's Trusted Supplier for{" "}
              <span className="text-accent">Toner Cartridges</span> & Copier Consumables
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
              Original & compatible toners for Canon, Kyocera, HP, Ricoh, Sharp & Triumph-Adler — with fast UAE delivery, VAT invoicing and bulk pricing.
            </p>

            {/* Smart search */}
            <form action="/shop" className="mt-7 flex items-center bg-white rounded-lg p-1.5 max-w-lg shadow-card">
              <Search className="h-5 w-5 text-muted-foreground ml-3" />
              <input
                name="q"
                placeholder="Search by printer model or cartridge code…"
                className="flex-1 px-3 py-2.5 bg-transparent text-secondary placeholder:text-muted-foreground focus:outline-none text-sm"
              />
              <Button type="submit" className="rounded-md">Search</Button>
            </form>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="bg-accent hover:bg-accent-hover text-accent-foreground">
                <Link to="/shop">Shop Now <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
                <Link to="/rfq">Request Bulk Quote</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5"><Truck className="h-4 w-4 text-accent" /> Free delivery over AED 500</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /> 100% genuine guarantee</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full" />
            <img
              src={heroImg}
              alt="Premium printer toner cartridges for office copiers"
              width={1536}
              height={1024}
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Brand logos strip */}
      <section className="border-b border-border bg-card">
        <div className="container-page py-8">
          <div className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
            Authorised supplier for leading brands
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {BRANDS.map((b) => (
              <Link
                key={b.slug}
                to="/brands/$slug"
                params={{ slug: b.slug }}
                className="flex items-center justify-center h-14 rounded-lg border border-border text-secondary font-bold text-lg hover:border-primary hover:text-primary transition-colors"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Brand */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Shop by Brand</h2>
            <p className="text-muted-foreground mt-2">Find your printer's brand and explore compatible toners.</p>
          </div>
          <Link to="/brands" className="hidden sm:inline-flex text-sm font-semibold text-primary hover:text-primary-hover items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRANDS.map((b) => <BrandPill key={b.slug} brand={b} />)}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-card border-y border-border">
        <div className="container-page py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Featured</div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">Featured Toner Cartridges</h2>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex text-sm font-semibold text-primary hover:text-primary-hover items-center gap-1">
              All products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* Office printing solutions */}
      <section className="container-page py-16">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl gradient-hero text-white p-10 relative overflow-hidden">
            <Building2 className="h-10 w-10 text-accent mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold">Office Printing Solutions</h3>
            <p className="mt-3 text-white/80 max-w-md">
              Managed toner supply for SMEs and enterprises — predictable pricing, scheduled delivery, and a dedicated account manager.
            </p>
            <Button asChild size="lg" className="mt-6 bg-accent hover:bg-accent-hover text-accent-foreground">
              <Link to="/contact">Open a Corporate Account</Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-10 relative overflow-hidden">
            <Headphones className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-secondary">Need help finding your toner?</h3>
            <p className="mt-3 text-muted-foreground max-w-md">
              Tell us your printer model and we'll match the exact cartridge — original or compatible — in minutes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/rfq">Get Help</Link></Button>
              <a
                href={whatsappUrl("Hi Tonercart, I need help finding the right toner for my printer.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-whatsapp text-white font-medium hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container-page pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Top Sellers</div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Best Selling Cartridges</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-card border-y border-border">
        <div className="container-page py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Why Choose Tonercart</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Built for UAE businesses that can't afford printing downtime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { i: ShieldCheck, t: "Genuine & Certified", d: "Only OEM and rigorously tested compatible cartridges. Every order quality-checked." },
              { i: Truck, t: "Fast UAE Delivery", d: "Same-day in Dubai, next-day to all Emirates. Free over AED 500." },
              { i: Building2, t: "Business Pricing", d: "VAT invoices, bulk discounts, corporate accounts and managed reordering." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="p-7 rounded-xl border border-border bg-background text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-lg text-secondary">{t}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-12">What UAE Offices Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { q: "Switched our entire fleet to Tonercart. Faster delivery and 30% cheaper than our previous supplier.", a: "Procurement Manager, DIFC" },
            { q: "Their team identified the right cartridge in minutes when our copier went down. Lifesavers.", a: "Office Admin, Abu Dhabi" },
            { q: "Reliable, professional invoicing, and the compatible toners are indistinguishable from OEM.", a: "Finance Director, Sharjah" },
          ].map((t) => (
            <div key={t.a} className="p-7 rounded-xl border border-border bg-card">
              <div className="flex gap-0.5 text-accent mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-secondary leading-relaxed">"{t.q}"</p>
              <div className="mt-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA banner */}
      <section className="container-page pb-16">
        <div className="rounded-2xl bg-whatsapp text-white p-10 md:p-14 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Quick orders on WhatsApp</h3>
            <p className="mt-2 text-white/90 max-w-lg">Send us your cartridge code or printer model — we'll confirm stock and price within minutes.</p>
          </div>
          <a
            href={whatsappUrl("Hi Tonercart, I'd like to place a quick order.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-white text-whatsapp font-semibold hover:bg-white/90"
          >
            <MessageCircle className="h-5 w-5" /> Chat Now
          </a>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-card border-t border-border">
        <div className="container-page py-12 text-center">
          <h3 className="text-2xl font-bold text-secondary">Get UAE printing deals & stock alerts</h3>
          <p className="text-muted-foreground mt-2">Monthly. No spam. Unsubscribe anytime.</p>
          <form className="mt-6 max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@company.ae"
              className="flex-1 h-11 px-4 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" size="lg">Subscribe</Button>
          </form>
        </div>
      </section>
    </>
  );
}
