import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms & Conditions — Tonercart" }, { name: "description", content: "Terms of sale for Tonercart LLC." }],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <article className="container-page py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary">Terms & Conditions</h1>
      <div className="prose prose-sm mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>By placing an order with Tonercart LLC you agree to the following terms.</p>
        <h2 className="text-lg font-semibold text-secondary">Pricing & VAT</h2>
        <p>All prices are in AED and exclude 5% UAE VAT unless stated otherwise. VAT is shown at checkout and included on your invoice.</p>
        <h2 className="text-lg font-semibold text-secondary">Returns</h2>
        <p>Defective cartridges may be returned within 7 days for replacement or refund, subject to inspection.</p>
        <h2 className="text-lg font-semibold text-secondary">Warranty</h2>
        <p>OEM cartridges carry manufacturer warranty. Compatible cartridges carry a Tonercart quality guarantee against manufacturing defects.</p>
        <h2 className="text-lg font-semibold text-secondary">Liability</h2>
        <p>Our liability is limited to the value of the goods supplied.</p>
      </div>
    </article>
  ),
});
