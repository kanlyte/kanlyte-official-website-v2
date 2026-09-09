export const fontRegistry = {
  geist: { label: "Geist", variable: "--font-geist", family: "Geist, sans-serif" },
  inter: { label: "Inter", variable: "--font-inter", family: "Inter, sans-serif" },
  notoSans: { label: "Noto Sans", variable: "--font-noto-sans", family: "'Noto Sans', sans-serif" },
  nunitoSans: { label: "Nunito Sans", variable: "--font-nunito-sans", family: "'Nunito Sans', sans-serif" },
  figtree: { label: "Figtree", variable: "--font-figtree", family: "Figtree, sans-serif" },
  roboto: { label: "Roboto", variable: "--font-roboto", family: "Roboto, sans-serif" },
  raleway: { label: "Raleway", variable: "--font-raleway", family: "Raleway, sans-serif" },
  dmSans: { label: "DM Sans", variable: "--font-dm-sans", family: "'DM Sans', sans-serif" },
  publicSans: { label: "Public Sans", variable: "--font-public-sans", family: "'Public Sans', sans-serif" },
  outfit: { label: "Outfit", variable: "--font-outfit", family: "Outfit, sans-serif" },
  geistMono: { label: "Geist Mono", variable: "--font-geist-mono", family: "'Geist Mono', monospace" },
  jetBrainsMono: { label: "JetBrains Mono", variable: "--font-jetbrains-mono", family: "'JetBrains Mono', monospace" },
  notoSerif: { label: "Noto Serif", variable: "--font-noto-serif", family: "'Noto Serif', serif" },
  robotoSlab: { label: "Roboto Slab", variable: "--font-roboto-slab", family: "'Roboto Slab', serif" },
  merriweather: { label: "Merriweather", variable: "--font-merriweather", family: "Merriweather, serif" },
  lora: { label: "Lora", variable: "--font-lora", family: "Lora, serif" },
  playfairDisplay: { label: "Playfair Display", variable: "--font-playfair-display", family: "'Playfair Display', serif" },
} as const;

export type FontKey = keyof typeof fontRegistry;

export const fontVars = "";

export const fontOptions = (Object.entries(fontRegistry) as Array<[FontKey, (typeof fontRegistry)[FontKey]]>).map(
  ([key, f]) => ({ key, label: f.label, variable: f.variable }),
);
