import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/delivery-policy")({
  head: () => ({
    meta: [
      { title: "UAE Delivery Policy — Tonercart" },
      { name: "description", content: "Delivery timelines, charges and coverage for toner cartridge orders across the UAE." },
    ],
    links: [{ rel: "canonical", href: "/delivery-policy" }],
  }),
  component: () => (
    <article className="container-page py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary">UAE Delivery Policy</h1>
      <div className="prose prose-sm mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p><strong className="text-secondary">Coverage:</strong> We deliver across all seven Emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah.</p>
        <p><strong className="text-secondary">Timelines:</strong> Same-day delivery within Dubai for orders placed before 2:00 PM. Next-day delivery to all other Emirates.</p>
        <p><strong className="text-secondary">Charges:</strong> AED 35 flat. <strong className="text-success">FREE</strong> on orders above AED 500 (excl. VAT).</p>
        <p><strong className="text-secondary">VAT:</strong> All prices exclude 5% VAT. A UAE VAT-compliant invoice is included with every order.</p>
        <p><strong className="text-secondary">Cash on Delivery:</strong> Available across the UAE for orders up to AED 5,000.</p>
        <p><strong className="text-secondary">Bulk / corporate orders:</strong> Scheduled delivery and dedicated logistics available — please request via our <a className="text-primary" href="/rfq">RFQ form</a>.</p>
      </div>
    </article>
  ),
});
