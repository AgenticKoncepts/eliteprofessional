import { BRANDS } from "@/data/products";

export function BrandStrip() {
  const items = [...BRANDS, ...BRANDS];
  return (
    <div className="overflow-hidden border-y border-border py-8 bg-secondary/30">
      <div className="flex marquee gap-12 md:gap-20 whitespace-nowrap">
        {items.map((b, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-3xl text-muted-foreground/70 hover:text-gold transition-colors px-6"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
