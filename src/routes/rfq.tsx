import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";

const search = z.object({ product: fallback(z.string(), "").default("") });

export const Route = createFileRoute("/rfq")({
  validateSearch: zodValidator(search),
  head: () => ({
    meta: [
      { title: "Request a Quote (RFQ) — Tonercart UAE" },
      { name: "description", content: "Request a bulk or corporate quote for toner cartridges and copier consumables. UAE delivery, VAT invoice, dedicated account manager." },
    ],
    links: [{ rel: "canonical", href: "/rfq" }],
  }),
  component: RFQPage,
});

function RFQPage() {
  const { product } = Route.useSearch();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="container-page py-20 text-center max-w-xl mx-auto">
        <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-secondary">Quote request received</h1>
        <p className="text-muted-foreground mt-3">Our sales team will respond with a quote within 2 working hours.</p>
        <Button asChild className="mt-6"><Link to="/shop">Continue Browsing</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-page py-12 grid lg:grid-cols-[1fr_360px] gap-10 max-w-6xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
          <FileText className="h-4 w-4" /> RFQ
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-secondary">Request a Quotation</h1>
        <p className="text-muted-foreground mt-3">Get a tailored quote for bulk orders, corporate accounts and tender requirements across the UAE.</p>

        <form
          className="mt-8 rounded-xl border border-border bg-card p-6 space-y-4"
          onSubmit={(e) => { e.preventDefault(); toast.success("Quote request submitted"); setDone(true); }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name" required name="name" />
            <Field label="Company" required name="company" />
            <Field label="Email" required type="email" name="email" />
            <Field label="Phone" required name="phone" />
          </div>
          <Field label="Cartridge code or printer model" name="product" defaultValue={product} placeholder="e.g. TK-1175, NPG-67, HP M404" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Estimated quantity" name="qty" placeholder="e.g. 50 cartridges" />
            <Field label="Required by" type="date" name="date" />
          </div>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Additional details</span>
            <textarea
              name="notes"
              rows={5}
              placeholder="Tell us about printer models, frequency, delivery location…"
              className="mt-1 w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <Button type="submit" size="lg" className="w-full sm:w-auto">Submit RFQ</Button>
        </form>
      </div>

      <aside className="rounded-xl bg-secondary text-secondary-foreground p-6 h-fit space-y-4">
        <h2 className="text-lg font-bold">Why request a quote?</h2>
        <ul className="space-y-3 text-sm text-white/80">
          {[
            "Volume discounts on bulk orders",
            "Corporate account with credit terms",
            "Dedicated account manager",
            "Scheduled / recurring delivery",
            "Tender & government pricing",
            "Full VAT-compliant invoicing",
          ].map((b) => (
            <li key={b} className="inline-flex gap-2 items-start"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> {b}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}{rest.required && " *"}</span>
      <input {...rest} className="mt-1 w-full h-11 px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}
