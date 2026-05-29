import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-secondary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-secondary">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-secondary">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tonercart LLC — UAE's Trusted Toner Cartridge Supplier" },
      { name: "description", content: "Original & compatible toner cartridges for Canon, Kyocera, HP, Ricoh, Sharp & Triumph-Adler with fast UAE delivery. VAT invoice, COD, bulk pricing." },
      { name: "author", content: "Tonercart LLC" },
      { property: "og:title", content: "Tonercart LLC — UAE's Trusted Toner Cartridge Supplier" },
      { property: "og:description", content: "Original & compatible toner cartridges for Canon, Kyocera, HP, Ricoh, Sharp & Triumph-Adler with fast UAE delivery. VAT invoice, COD, bulk pricing." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Tonercart LLC" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tonercart LLC — UAE's Trusted Toner Cartridge Supplier" },
      { name: "twitter:description", content: "Original & compatible toner cartridges for Canon, Kyocera, HP, Ricoh, Sharp & Triumph-Adler with fast UAE delivery. VAT invoice, COD, bulk pricing." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0611ee8e-f600-4d73-a819-a118310509eb/id-preview-154e0caa--557a58a2-bb84-4920-8679-5a4dd1c586e1.lovable.app-1780071691387.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0611ee8e-f600-4d73-a819-a118310509eb/id-preview-154e0caa--557a58a2-bb84-4920-8679-5a4dd1c586e1.lovable.app-1780071691387.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Tonercart LLC",
        url: "https://tonercart.llc",
        description: "UAE's trusted supplier of original and compatible toner cartridges and copier consumables.",
        areaServed: "AE",
      }),
    }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pb-20 lg:pb-0"><Outlet /></main>
          <Footer />
          <MobileBottomNav />
          <WhatsAppFab />
        </div>
        <Toaster richColors position="top-right" />
      </CartProvider>
    </QueryClientProvider>
  );
}
