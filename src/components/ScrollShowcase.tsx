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

    </div>
  );
}
