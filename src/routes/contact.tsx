import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tonercart LLC — UAE Toner Cartridges" },
      { name: "description", content: "Get in touch with Tonercart LLC for sales, support, or corporate accounts in the UAE." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container-page py-12 grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-secondary">Talk to our team</h1>
        <p className="text-muted-foreground mt-3 max-w-md">Sales, support, bulk orders or corporate accounts — we respond within one business hour.</p>

        <div className="mt-8 space-y-4">
          <ContactItem icon={Phone} label="Call us" value={COMPANY_PHONE} href={`tel:${COMPANY_PHONE.replace(/\s/g, "")}`} />
          <ContactItem icon={Mail} label="Email" value={COMPANY_EMAIL} href={`mailto:${COMPANY_EMAIL}`} />
          <ContactItem icon={MapPin} label="Office" value={COMPANY_ADDRESS} />
          <a href={whatsappUrl("Hi Tonercart, I'd like to talk to sales.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-whatsapp text-white font-medium hover:opacity-90">
            <MessageCircle className="h-4 w-4" /> WhatsApp Sales
          </a>
        </div>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); toast.success("Message sent"); setSent(true); }}
        className="rounded-xl border border-border bg-card p-6 space-y-4 h-fit"
      >
        {sent ? (
          <div className="text-center py-8">
            <h2 className="text-xl font-bold text-secondary">Thank you</h2>
            <p className="text-muted-foreground mt-2">We'll respond shortly.</p>
          </div>
        ) : (
          <>
            <Field label="Name" required name="name" />
            <Field label="Email" required type="email" name="email" />
            <Field label="Phone" name="phone" />
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Message *</span>
              <textarea required name="message" rows={5} className="mt-1 w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <Button type="submit" size="lg" className="w-full">Send Message</Button>
          </>
        )}
      </form>
    </div>
  );
}

function ContactItem({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex gap-3 items-start">
      <div className="h-10 w-10 rounded-md bg-primary/10 text-primary inline-flex items-center justify-center"><Icon className="h-5 w-5" /></div>
      <div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
        <div className="text-secondary font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-80">{content}</a> : content;
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}{rest.required && " *"}</span>
      <input {...rest} className="mt-1 w-full h-11 px-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}
