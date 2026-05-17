import { createFileRoute } from "@tanstack/react-router";
import { Building2, Globe, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tonercart LLC — UAE Toner Cartridge Supplier" },
      { name: "description", content: "Tonercart LLC is a UAE-based supplier of original and compatible toner cartridges, drums, and copier consumables for businesses across the Emirates." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="gradient-hero text-white">
        <div className="container-page py-16">
          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">A UAE supplier built for office printing reliability</h1>
          <p className="mt-4 text-white/80 max-w-2xl text-lg">Tonercart LLC keeps thousands of UAE printers running with original and certified compatible toner cartridges, fast delivery, and VAT-compliant business invoicing.</p>
        </div>
      </section>

      <section className="container-page py-16 grid md:grid-cols-4 gap-6">
        {[
          { i: Building2, n: "500+", l: "UAE businesses served" },
          { i: Globe, n: "7", l: "Emirates covered" },
          { i: ShieldCheck, n: "100%", l: "Quality guarantee" },
          { i: Users, n: "10+ yrs", l: "Industry experience" },
        ].map(({ i: Icon, n, l }) => (
          <div key={l} className="rounded-xl border border-border bg-card p-6 text-center">
            <Icon className="h-7 w-7 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-secondary">{n}</div>
            <div className="text-sm text-muted-foreground">{l}</div>
          </div>
        ))}
      </section>

      <section className="container-page pb-20 max-w-3xl">
        <h2 className="text-2xl font-bold text-secondary">Our mission</h2>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Office printing should never be the reason your day stops. We supply UAE businesses with the right toner cartridge at the right price — backed by same-day delivery in Dubai, transparent VAT-compliant invoicing, and a sales team that actually knows the printer market.
        </p>
        <h2 className="text-2xl font-bold text-secondary mt-10">What we stock</h2>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Genuine OEM and certified compatible toner cartridges, drum units, maintenance kits and copier consumables for Canon, Kyocera, HP, Ricoh, Sharp and Triumph-Adler — covering the full spectrum from home office printers to enterprise multi-function devices.
        </p>
      </section>
    </>
  );
}
