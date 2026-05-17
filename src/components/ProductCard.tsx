import { Link } from "@tanstack/react-router";
import { ShoppingCart, MessageCircle, FileText, Check, X } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart, formatAED } from "@/lib/cart";
import { whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const colorSwatch: Record<string, string> = {
  Black: "bg-secondary",
  Cyan: "bg-cyan-500",
  Magenta: "bg-pink-500",
  Yellow: "bg-yellow-400",
  "Tri-Color": "bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-400",
};

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const inStock = product.stock > 0;

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden card-hover">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="aspect-square bg-muted relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className={`h-32 w-44 rounded-md ${colorSwatch[product.color] ?? "bg-secondary"} shadow-lg flex items-end p-3`}>
              <span className="text-[10px] font-mono text-white/90 uppercase">{product.code}</span>
            </div>
          </div>
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className={`text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wide ${product.oem === "OEM" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {product.oem}
            </span>
            {product.bestseller && (
              <span className="text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wide bg-accent text-accent-foreground">
                Bestseller
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="text-[11px] text-muted-foreground font-mono uppercase">{product.code}</div>
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="font-semibold text-secondary leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-1">
          Fits: {product.compatibility.slice(0, 2).join(", ")}
        </p>

        <div className="flex items-center gap-2 text-xs">
          {inStock ? (
            <span className="inline-flex items-center gap-1 text-success font-medium">
              <Check className="h-3.5 w-3.5" /> In Stock ({product.stock})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-destructive font-medium">
              <X className="h-3.5 w-3.5" /> Out of Stock
            </span>
          )}
        </div>

        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-xl font-bold text-secondary">{formatAED(product.price)}</span>
          <span className="text-[11px] text-muted-foreground">excl. VAT</span>
        </div>

        <div className="mt-auto pt-3 flex flex-col gap-2">
          <Button
            className="w-full"
            disabled={!inStock}
            onClick={() => {
              add(product);
              toast.success(`${product.name} added to cart`);
            }}
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappUrl(`Hi, I'm interested in ${product.name} (${product.code}). Is it available?`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1 rounded-md border border-border bg-background text-xs font-medium py-2 hover:border-primary hover:text-primary transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
            <Link
              to="/rfq"
              search={{ product: product.code }}
              className="inline-flex items-center justify-center gap-1 rounded-md border border-border bg-background text-xs font-medium py-2 hover:border-primary hover:text-primary transition-colors"
            >
              <FileText className="h-3.5 w-3.5" /> Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
