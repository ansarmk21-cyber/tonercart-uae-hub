import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — Tonercart" }, { name: "description", content: "How Tonercart LLC handles your data." }],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <article className="container-page py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary">Privacy Policy</h1>
      <div className="prose prose-sm mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>Tonercart LLC ("we", "us") values your privacy. This policy summarises how we collect and use information from customers in the UAE.</p>
        <h2 className="text-lg font-semibold text-secondary">Information we collect</h2>
        <p>Contact details (name, email, phone, address) and order information necessary to fulfil purchases and issue VAT invoices.</p>
        <h2 className="text-lg font-semibold text-secondary">How we use it</h2>
        <p>To process orders, provide customer support, manage corporate accounts, and improve our services. We never sell your data.</p>
        <h2 className="text-lg font-semibold text-secondary">Contact</h2>
        <p>For privacy requests email sales@tonercart.llc.</p>
      </div>
    </article>
  ),
});
