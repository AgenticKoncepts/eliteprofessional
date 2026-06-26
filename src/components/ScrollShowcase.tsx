import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function ScrollShowcase() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // marquee
      const marquee = root.current?.querySelector(".ss-marquee-track");
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          ease: "none",
          duration: 30,
          repeat: -1,
        });
      }
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-black text-white">
      {/* marquee ribbon */}
      <div className="relative overflow-hidden border-y border-white/10 py-5">
        <div className="ss-marquee-track flex whitespace-nowrap will-change-transform">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {[
                "EDITORIAL",
                "KYO",
                "FREELIMIX",
                "LOGEVY",
                "3ME",
                "PROFESSIONAL",
                "MADE IN ITALY",
                "ELITE",
                "PERFORMANCE",
                "REFINED",
              ].map((t, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center font-display text-3xl md:text-5xl tracking-tight"
                >
                  <span className="px-8">{t}</span>
                  <span className="text-[oklch(0.78_0.13_85)]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {panels.map((p, i) => (
        <section
          key={i}
          className="ss-panel relative min-h-[110vh] overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="ss-overlay absolute inset-0">
              <img
                src={p.img}
                alt={p.title}
                className="ss-img absolute inset-0 h-[124%] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/40" />
            </div>
          </div>

          <div className="container-elite relative z-10 flex min-h-[110vh] items-center">
            <div className={`max-w-2xl ${i % 2 ? "md:ml-auto md:text-right" : ""}`}>
              <div
                className="ss-meta mb-6 text-[10px] tracking-[0.5em]"
                style={{ color: p.tint }}
              >
                {p.eyebrow}
              </div>

              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
                <span className="block overflow-hidden">
                  <span className="ss-word inline-block">{p.title}</span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className="ss-word inline-block italic"
                    style={{ color: p.tint }}
                  >
                    {p.italic}
                  </span>
                </span>
              </h2>

              <p className="ss-meta mt-7 max-w-lg text-base md:text-lg text-white/75 leading-relaxed">
                {p.body}
              </p>

              <div className="ss-meta mt-9">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 border-b border-white/40 pb-2 text-[11px] tracking-[0.3em] hover:border-[oklch(0.78_0.13_85)]"
                >
                  EXPLORE THE EDIT
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
