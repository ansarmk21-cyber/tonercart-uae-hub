import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart, formatAED } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Tonercart UAE" }, { name: "description", content: "Review your toner cartridge order." }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, vat, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-secondary">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Browse our catalog to find the right cartridge for your printer.</p>
        <Button asChild size="lg" className="mt-6"><Link to="/shop">Shop Toners</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-3">
          {items.map(({ product, qty }) => (
            <div key={product.slug} className="flex gap-4 rounded-xl border border-border bg-card p-4">
              <div className="h-24 w-24 rounded-md bg-muted flex items-center justify-center shrink-0">
                <div className="h-14 w-20 rounded bg-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono uppercase text-muted-foreground">{product.code}</div>
                <Link to="/product/$slug" params={{ slug: product.slug }} className="font-semibold text-secondary hover:text-primary line-clamp-1">{product.name}</Link>
                <div className="text-xs text-muted-foreground mt-0.5">{product.color} · {product.oem}</div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center border border-border rounded-md">
                    <button onClick={() => setQty(product.slug, qty - 1)} className="h-9 w-9 inline-flex items-center justify-center hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                    <button onClick={() => setQty(product.slug, qty + 1)} className="h-9 w-9 inline-flex items-center justify-center hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-secondary">{formatAED(product.price * qty)}</div>
                    <button onClick={() => remove(product.slug)} className="text-xs text-destructive hover:underline inline-flex items-center gap-1 mt-1">
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 h-fit sticky top-32">
          <h2 className="text-lg font-bold text-secondary">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-medium">{formatAED(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">VAT (5%)</dt><dd className="font-medium">{formatAED(vat)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd className="font-medium text-success">{subtotal >= 500 ? "FREE" : formatAED(35)}</dd></div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between text-base">
              <dt className="font-bold text-secondary">Total</dt>
              <dd className="font-bold text-secondary">{formatAED(total + (subtotal >= 500 ? 0 : 35))}</dd>
            </div>
          </dl>
          <Button asChild size="lg" className="w-full mt-6">
            <Link to="/checkout">Checkout <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">VAT invoice included with every order</p>
        </aside>
      </div>
    </div>
  );
}
