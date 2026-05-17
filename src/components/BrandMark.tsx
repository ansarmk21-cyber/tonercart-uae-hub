import { Link } from "@tanstack/react-router";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
        TC
      </div>
      <div className="leading-tight">
        <div className="font-bold text-secondary text-lg tracking-tight">Tonercart</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">tonercart.llc</div>
      </div>
    </Link>
  );
}
