import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroVideo() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const play = () => v.play().catch(() => undefined);
    play();
    document.addEventListener("visibilitychange", play);
    return () => document.removeEventListener("visibilitychange", play);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hv-eyebrow", { y: 24, opacity: 0, duration: 1.0 })
        .from(".hv-word", { y: 80, opacity: 0, duration: 1.2, stagger: 0.08 }, "-=0.7")
        .from(".hv-sub", { y: 20, opacity: 0, duration: 0.9 }, "-=0.8")
        .from(".hv-cta", { y: 16, opacity: 0, duration: 0.8 }, "-=0.7")
        .from(".hv-meta", { opacity: 0, duration: 1.0, stagger: 0.1 }, "-=0.7");

      gsap.to(".hv-rule", {
        scaleX: 1,
        duration: 2.4,
        ease: "power3.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "left center",
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black text-white"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      {/* cinematic overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />

      {/* film bars */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0.35 }}
        transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
        className="absolute top-0 left-0 right-0 h-[14vh] origin-top bg-black"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0.35 }}
        transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 h-[14vh] origin-bottom bg-black"
      />

      {/* content */}
      <div className="container-elite relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32">
        <div className="hv-eyebrow mb-5 flex items-center gap-3 text-[10px] tracking-[0.5em] text-[oklch(0.78_0.13_85)]">
          <span className="hv-rule inline-block h-px w-16 origin-left bg-[oklch(0.78_0.13_85)]" style={{ transform: "scaleX(0)" }} />
          ELITE PROFESSIONAL — UAE · SINCE 2001
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-[8.5rem] leading-[0.95] tracking-tight overflow-hidden">
          <span className="block">
            <span className="hv-word inline-block mr-4">Performance.</span>
          </span>
          <span className="block">
            <span className="hv-word inline-block mr-4 italic text-[oklch(0.78_0.13_85)]">
              Refined.
            </span>
          </span>
        </h1>

        <p className="hv-sub mt-6 max-w-xl text-base md:text-lg text-white/75 leading-relaxed">
          Salon-grade hair care, color, electronics and tools — curated for the Emirates' most
          discerning professionals. Delivered free across the UAE.
        </p>

        <div className="hv-cta mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 bg-white px-8 py-4 text-[11px] tracking-[0.3em] font-medium text-black transition-all hover:bg-[oklch(0.78_0.13_85)] hover:text-black"
          >
            ENTER THE SHOP
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 border border-white/30 px-8 py-4 text-[11px] tracking-[0.3em] text-white/90 backdrop-blur-sm transition-colors hover:border-white hover:bg-white/5"
          >
            OUR HERITAGE
          </Link>
        </div>

        <div className="hv-meta mt-12 grid grid-cols-3 max-w-xl gap-8 border-t border-white/15 pt-6">
          {[
            ["24+", "YEARS"],
            ["800+", "PRODUCTS"],
            ["FREE", "UAE DELIVERY"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-2xl md:text-3xl">{n}</div>
              <div className="mt-1 text-[10px] tracking-[0.3em] text-white/55">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-[9px] tracking-[0.5em] text-white/60"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          SCROLL
        </motion.div>
      </motion.div>
    </section>
  );
}
