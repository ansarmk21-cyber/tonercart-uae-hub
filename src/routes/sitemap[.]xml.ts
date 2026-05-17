import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BRANDS, PRODUCTS } from "@/data/products";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/shop", "/brands", "/about", "/contact", "/blog", "/rfq", "/track-order", "/delivery-policy", "/privacy", "/terms"];
        const brandPaths = BRANDS.map((b) => `/brands/${b.slug}`);
        const productPaths = PRODUCTS.map((p) => `/product/${p.slug}`);
        const urls = [...staticPaths, ...brandPaths, ...productPaths]
          .map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`)
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
