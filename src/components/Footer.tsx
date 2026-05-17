import { Link } from "@tanstack/react-router";
import { BrandMark } from "./BrandMark";
import { BRANDS } from "@/data/products";
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE } from "@/lib/whatsapp";
import { Mail, MapPin, Phone, ShieldCheck, Truck, CreditCard, BadgeCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      {/* trust badges */}
      <div className="border-b border-white/10">
        <div className="container-page py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { i: Truck, t: "UAE-wide Delivery", s: "Same-day in Dubai" },
            { i: ShieldCheck, t: "100% Genuine", s: "OEM & certified compatible" },
            { i: CreditCard, t: "COD & Online Pay", s: "VAT invoice included" },
            { i: BadgeCheck, t: "Trusted by 500+ Offices", s: "Across the Emirates" },
          ].map(({ i: Icon, t, s }) => (
            <div key={t} className="flex items-start gap-3">
              <Icon className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-sm">{t}</div>
                <div className="text-xs text-white/60">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="bg-white inline-block rounded p-2 mb-4"><BrandMark /></div>
          <p className="text-sm text-white/70 leading-relaxed">
            UAE's trusted supplier of original and compatible toner cartridges, drums and copier consumables.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/shop" className="hover:text-accent">All Products</Link></li>
            <li><Link to="/brands" className="hover:text-accent">All Brands</Link></li>
            <li><Link to="/rfq" className="hover:text-accent">Request a Quote</Link></li>
            <li><Link to="/track-order" className="hover:text-accent">Track Order</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Brands</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {BRANDS.map((b) => (
              <li key={b.slug}>
                <Link to="/brands/$slug" params={{ slug: b.slug }} className="hover:text-accent">
                  {b.name} Toners
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
            <li><Link to="/delivery-policy" className="hover:text-accent">UAE Delivery Policy</Link></li>
            <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-accent">Terms & Conditions</Link></li>
          </ul>
          <div className="mt-6 space-y-2 text-sm text-white/70">
            <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> {COMPANY_ADDRESS}</div>
            <div><a href={`tel:${COMPANY_PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-accent"><Phone className="h-4 w-4 text-accent" /> {COMPANY_PHONE}</a></div>
            <div><a href={`mailto:${COMPANY_EMAIL}`} className="inline-flex items-center gap-2 hover:text-accent"><Mail className="h-4 w-4 text-accent" /> {COMPANY_EMAIL}</a></div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 text-xs text-white/60 flex flex-wrap items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Tonercart LLC — tonercart.llc. All rights reserved.</div>
          <div>VAT Registered • UAE</div>
        </div>
      </div>
    </footer>
  );
}
