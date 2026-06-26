import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

import s1 from "@/assets/hero-haircare.jpg";
import s2 from "@/assets/hero-haircolor.jpg";
import s3 from "@/assets/hero-electronics.jpg";
import s4 from "@/assets/hero-skincare.jpg";
import s5 from "@/assets/hero-tools.jpg";

const slides = [
  { image: s1, key: "haircare", alt: "Professional hair care products — shampoos, conditioners and treatments for salon use" },
  { image: s2, key: "haircolor", alt: "Permanent hair color and salon coloring systems for professional stylists" },
  { image: s3, key: "electronics", alt: "Professional salon electronics — hair dryers, clippers and styling tools for UAE barbers and stylists" },
  { image: s4, key: "skincare", alt: "Professional skincare and body care products for spas and beauty clinics" },
  { image: s5, key: "tools", alt: "Salon tools and accessories — brushes, scissors and styling instruments for professional use" },
];

export function HeroSlider() {
  const { t } = useI18n();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5500, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative flex-[0_0_100%] h-[60vh] min-h-[460px] md:h-[78vh] md:min-h-[600px]"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div
                className="absolute inset-0"
                style={{ background: "var(--gradient-hero)" }}
              />
              <div className="relative h-full container-elite flex items-end pb-20 md:pb-32">
                <AnimatePresence mode="wait">
                  {selected === i && (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                      className="max-w-2xl text-white"
                    >
                      <div className="text-xs tracking-[0.4em] mb-4 text-gold">
                        {t(`hero_${slide.key}_eyebrow`)}
                      </div>
                      <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-5">
                        {t(`hero_${slide.key}_title`)}
                      </h1>
                      <p className="text-base md:text-lg text-white/85 max-w-xl mb-8 leading-relaxed">
                        {t(`hero_${slide.key}_text`)}
                      </p>
                      <Link
                        to="/shop"
                        className="inline-flex items-center px-8 py-3.5 bg-white text-primary text-xs tracking-[0.25em] font-medium hover:bg-gold hover:text-gold-foreground transition-colors"
                      >
                        {t("go_to_shop")}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              selected === i ? "bg-white w-10" : "bg-white/50 w-5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
