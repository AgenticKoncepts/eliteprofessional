import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export interface BrandTileData {
  brand: string;
  brandSlug: string;
  count: number;
  heroImage: string | null;
}

export function BrandTile({
  data,
  onSelect,
  index,
}: {
  data: BrandTileData;
  onSelect: (slug: string) => void;
  index: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 22 });
  const ry = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 200, damping: 22 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onSelect(data.brandSlug)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.04 * (index % 6) }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="group relative block w-full aspect-[4/5] sm:aspect-[5/6] text-left overflow-hidden border border-border/60 bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background [transform-style:preserve-3d] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] transition-shadow duration-500"
    >
      {/* Backdrop image with parallax depth */}
      {data.heroImage ? (
        <motion.div
          className="absolute inset-0"
          style={{ translateZ: -40 }}
        >
          <img
            src={data.heroImage}
            alt=""
            aria-hidden
            loading="lazy"
            className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-[1.4s] ease-out"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50" />
      )}

      {/* Dark veil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

      {/* Gold glare on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${glareX.get()} ${glareY.get()}, color-mix(in oklab, var(--gold) 35%, transparent), transparent 60%)`,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.4em] text-gold/90">
            HOUSE · {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-[0.3em] text-white/70">
            {data.count} {data.count === 1 ? "PIECE" : "PIECES"}
          </span>
        </div>

        <div>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-[1.05] mb-3 break-words">
            {data.brand}
          </h3>
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-white/90 group-hover:text-gold transition-colors">
            ENTER THE WORLD
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Edge glow */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-gold/30 transition-colors duration-500" />
    </motion.button>
  );
}
