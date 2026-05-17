import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart, formatAED } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, CreditCard, Truck } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Tonercart UAE" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, vat, total, clear } = useCart();
  const [done, setDone] = useState(false);
  const [payment, setPayment] = useState<"cod" | "card">("cod");
  const delivery = subtotal >= 500 ? 0 : 35;

  if (done) {
    return (
      <div className="container-page py-20 text-center max-w-xl mx-auto">
        <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-secondary">Order received</h1>
        <p className="text-muted-foreground mt-3">Thank you — our team will confirm your order and delivery time within 1 hour during business hours. A VAT invoice will be emailed to you shortly.</p>
        <Button asChild size="lg" className="mt-6"><Link to="/">Back to Home</Link></Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold text-secondary">Your cart is empty</h1>
        <Button asChild className="mt-4"><Link to="/shop">Shop Toners</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Checkout</h1>
      <form
        className="grid lg:grid-cols-[1fr_400px] gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Order placed successfully");
          clear();
          setDone(true);
        }}
      >
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-secondary mb-4">Contact Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" required name="name" />
              <Field label="Email" required type="email" name="email" />
              <Field label="Phone (UAE)" required name="phone" placeholder="+971 5x xxx xxxx" />
              <Field label="Company (optional)" name="company" />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-secondary mb-4">Delivery Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Building / Street" required name="address" className="sm:col-span-2" />
              <Field label="Emirate" required name="emirate" placeholder="Dubai" />
              <Field label="Area" required name="area" placeholder="Business Bay" />
              <Field label="TRN (optional)" name="trn" placeholder="For VAT invoice" />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-secondary mb-4">Payment Method</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <PaymentChoice id="cod" current={payment} onChange={setPayment} icon={Truck} title="Cash on Delivery" subtitle="Pay when you receive" />
              <PaymentChoice id="card" current={payment} onChange={setPayment} icon={CreditCard} title="Card / Online" subtitle="Secure online payment" />
            </div>
          </section>
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 h-fit sticky top-32">
          <h2 className="text-lg font-bold text-secondary">Order Summary</h2>
          <ul className="mt-4 space-y-2 text-sm max-h-60 overflow-auto">
            {items.map(({ product, qty }) => (
              <li key={product.slug} className="flex justify-between gap-3">
                <span className="text-secondary flex-1 line-clamp-1">{qty} × {product.code}</span>
                <span className="font-medium">{formatAED(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 text-sm border-t border-border pt-4">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatAED(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">VAT (5%)</dt><dd>{formatAED(vat)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd className={delivery === 0 ? "text-success font-medium" : ""}>{delivery === 0 ? "FREE" : formatAED(delivery)}</dd></div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between text-base"><dt className="font-bold text-secondary">Total</dt><dd className="font-bold text-secondary">{formatAED(total + delivery)}</dd></div>
          </dl>
          <Button type="submit" size="lg" className="w-full mt-6">Place Order</Button>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, className = "", ...rest }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-medium text-muted-foreground">{label}{rest.required && " *"}</span>
      <input {...rest} className="mt-1 w-full h-11 px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}

function PaymentChoice({ id, current, onChange, icon: Icon, title, subtitle }: { id: "cod" | "card"; current: string; onChange: (v: "cod" | "card") => void; icon: typeof Truck; title: string; subtitle: string }) {
  const active = current === id;
  return (
    <button
      type="button"
      onClick={() => onChange(id)}
      className={`text-left p-4 rounded-lg border-2 transition-colors ${active ? "border-primary bg-primary/5" : "border-border bg-background hover:border-muted-foreground"}`}
    >
      <Icon className={`h-5 w-5 mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
      <div className="font-semibold text-secondary">{title}</div>
      <div className="text-xs text-muted-foreground">{subtitle}</div>
    </button>
  );
}
