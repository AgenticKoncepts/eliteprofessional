import kyo from "@/assets/brands/kyo-cover.png.asset.json";
import freelimix from "@/assets/brands/freelimix-cover.jpg.asset.json";
import threeMe from "@/assets/brands/3me-cover.png.asset.json";
import elite from "@/assets/brands/elite-cover.png.asset.json";
import logevy from "@/assets/brands/logevy-cover.png.asset.json";

// Map brand slugs (and common variations) to a curated cover image.
const COVERS: Record<string, string> = {
  kyo: kyo.url,
  "kyo-professional": kyo.url,
  freelimix: freelimix.url,
  "free-limix": freelimix.url,
  "3me": threeMe.url,
  "3me-maestri": threeMe.url,
  "3-me-maestri": threeMe.url,
  maestri: threeMe.url,
  elite: elite.url,
  "elite-professional": elite.url,
  logevy: logevy.url,
  "logevy-firenze": logevy.url,
};

export function getBrandCover(brandSlug?: string | null): string | null {
  if (!brandSlug) return null;
  const key = brandSlug.toLowerCase();
  if (COVERS[key]) return COVERS[key];
  // Try fuzzy contains match (e.g. "3me-maestri-italy")
  for (const k of Object.keys(COVERS)) {
    if (key.includes(k)) return COVERS[k];
  }
  return null;
}
