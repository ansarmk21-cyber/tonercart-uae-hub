import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Package, Truck, CheckCircle2, Search } from "lucide-react";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track Your Order — Tonercart UAE" },
      { name: "description", content: "Track your toner cartridge delivery across the UAE." },
    ],
    links: [{ rel: "canonical", href: "/track-order" }],
  }),
  component: TrackPage,
});

function TrackPage() {
  const [searched, setSearched] = useState(false);

  return (
    <div className="container-page py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary">Track Your Order</h1>
      <p className="text-muted-foreground mt-3">Enter your order reference and email to see live delivery status.</p>

      <form className="mt-8 flex gap-2" onSubmit={(e) => { e.preventDefault(); setSearched(true); }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input required placeholder="Order # (e.g. TC-12345)" className="w-full h-12 pl-10 pr-4 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <Button type="submit" size="lg">Track</Button>
      </form>

      {searched && (
        <div className="mt-10 rounded-xl border border-border bg-card p-6 animate-fade-up">
          <div className="text-sm text-muted-foreground">Order TC-12345</div>
          <h2 className="text-xl font-bold text-secondary mt-1">Out for delivery</h2>
          <div className="mt-6 space-y-4">
            {[
              { i: CheckCircle2, t: "Order confirmed", s: "Today, 09:14", done: true },
              { i: Package, t: "Packed & dispatched", s: "Today, 11:30", done: true },
              { i: Truck, t: "Out for delivery", s: "ETA 16:00 - 18:00", done: true },
              { i: CheckCircle2, t: "Delivered", s: "Pending", done: false },
            ].map(({ i: Icon, t, s, done }) => (
              <div key={t} className="flex gap-3">
                <Icon className={`h-6 w-6 ${done ? "text-success" : "text-muted-foreground"}`} />
                <div>
                  <div className={`font-semibold ${done ? "text-secondary" : "text-muted-foreground"}`}>{t}</div>
                  <div className="text-xs text-muted-foreground">{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
