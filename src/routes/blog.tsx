import { createFileRoute, Link } from "@tanstack/react-router";

const POSTS = [
  { slug: "choosing-right-toner", title: "How to choose the right toner for your office printer", excerpt: "A practical guide to identifying cartridge codes, OEM vs compatible, and yield per page.", date: "May 2026" },
  { slug: "oem-vs-compatible", title: "OEM vs Compatible toner cartridges: what UAE businesses should know", excerpt: "Quality, warranty implications, and when compatible cartridges make sense.", date: "Apr 2026" },
  { slug: "extend-toner-life", title: "5 ways to extend the life of your toner cartridge", excerpt: "Simple operational tips that save your office printing budget over the year.", date: "Mar 2026" },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Tonercart UAE" },
      { name: "description", content: "Practical guides for office printing in the UAE: toner selection, cost savings and printer maintenance." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="container-page py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary">Blog & Guides</h1>
      <p className="text-muted-foreground mt-3">Practical knowledge for UAE office printing.</p>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {POSTS.map((p) => (
          <article key={p.slug} className="rounded-xl border border-border bg-card p-6 card-hover">
            <div className="text-xs text-muted-foreground">{p.date}</div>
            <h2 className="font-bold text-secondary text-lg mt-2">{p.title}</h2>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{p.excerpt}</p>
            <Link to="/contact" className="text-primary text-sm font-semibold mt-3 inline-block">Read more →</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
