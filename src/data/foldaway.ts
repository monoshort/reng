/** Foldaway-configurator — prijzen en opties overgenomen van prijzentrappen.nl (indicatief, demo). */
const PRODUCT_URL =
  "https://www.prijzentrappen.nl/product/opvouwbare-trap-foldaway/";

export const foldawayProductUrl = PRODUCT_URL;

/** Actieprijs op de productpagina (incl. btw), april 2026 */
const BASE_EURO = 1950;

export type WoodFinishId = "untreated" | "natural-oil" | "chocolat" | "walnut";
export type HeightRangeId = "h210-234" | "h235-260" | "h261-286";
export type WidthId = "w50" | "w55" | "w60";
export type MountSideId = "left" | "right";
export type AntislipId = "no" | "yes";

export type FoldawayConfig = {
  wood: WoodFinishId;
  height: HeightRangeId;
  width: WidthId;
  side: MountSideId;
  antislip: AntislipId;
};

const woodDelta: Record<WoodFinishId, number> = {
  untreated: 0,
  "natural-oil": 450,
  chocolat: 450,
  walnut: 450,
};

const heightDelta: Record<HeightRangeId, number> = {
  "h210-234": 0,
  "h235-260": 115,
  "h261-286": 230,
};

const widthDelta: Record<WidthId, number> = {
  w50: 0,
  w55: 70,
  w60: 140,
};

const antislipDelta: Record<AntislipId, number> = {
  no: 0,
  yes: 135,
};

export function calculateFoldawayPrice(c: FoldawayConfig): number {
  const total =
    BASE_EURO +
    woodDelta[c.wood] +
    heightDelta[c.height] +
    widthDelta[c.width] +
    antislipDelta[c.antislip];
  return Math.round(total * 100) / 100;
}

export const woodInfo: Record<WoodFinishId, { label: string; note?: string }> = {
  untreated: {
    label: "Onbehandeld multiplex berken",
    note: "Zelf afwerken mogelijk.",
  },
  "natural-oil": {
    label: "Rubio Monocoat Oil Plus 2C — Natural",
  },
  chocolat: {
    label: "Rubio Monocoat Oil Plus 2C — Chocolat",
  },
  walnut: {
    label: "Rubio Monocoat Oil Plus 2C — Walnut",
  },
};

export const heightInfo: Record<HeightRangeId, { label: string }> = {
  "h210-234": { label: "Vloer–vloer 210 – 234 cm" },
  "h235-260": { label: "Vloer–vloer 235 – 260 cm" },
  "h261-286": { label: "Vloer–vloer 261 – 286 cm" },
};

export const widthInfo: Record<WidthId, { label: string }> = {
  w50: { label: "50 cm breed" },
  w55: { label: "55 cm breed" },
  w60: { label: "60 cm breed (standaard)" },
};

export const sideInfo: Record<MountSideId, { label: string }> = {
  left: { label: "Montage linkerzijde (bij oplopen)" },
  right: { label: "Montage rechterzijde (bij oplopen)" },
};

export const antislipInfo: Record<AntislipId, { label: string }> = {
  no: { label: "Geen antislip-strip" },
  yes: { label: "Antislip: enkele zwarte slijtstrip per trede" },
};

const IMG = {
  hero: "https://www.prijzentrappen.nl/wp-content/uploads/vouwtrap-Foldaway-woonkamer-uitgeklapt-verdieping.jpg",
  untreated:
    "https://www.prijzentrappen.nl/wp-content/uploads/vouwtrap-Foldaway-woonkamer-uitgeklapt-verdieping.jpg",
  naturalOil:
    "https://www.prijzentrappen.nl/wp-content/uploads/vouwtrap-Foldaway-uitgeklapt-woonkamer2.jpg",
  chocolat:
    "https://www.prijzentrappen.nl/wp-content/uploads/vouwtrap-Foldaway-in-tiny-house-chocolat-600px.jpg",
  walnut:
    "https://www.prijzentrappen.nl/wp-content/uploads/vouwtrap-Foldaway-in-tiny-house-walnut-600px.jpg",
  ingeklapt:
    "https://www.prijzentrappen.nl/wp-content/uploads/Foldaway-onbehandeld-ingeklapt-in-Tiny-House.jpg",
  antislipDetail:
    "https://www.prijzentrappen.nl/wp-content/uploads/vouwtrap-Foldaway-bovenkant-trede-detail.jpg",
  gallery1:
    "https://www.prijzentrappen.nl/wp-content/uploads/vouwtrap-Foldaway-in-tiny-house-uitgeklapt-600x800px.jpg",
  gallery2:
    "https://www.prijzentrappen.nl/wp-content/uploads/vouwtrap-Foldaway-woonkamer-ingeklapt-vide.jpg",
  gallery3:
    "https://www.prijzentrappen.nl/wp-content/uploads/vouwtrap-Foldaway-kleuren-detail.jpg",
} as const;

export const foldawayImages = IMG;

export function getFoldawayPreviewUrl(c: FoldawayConfig): string {
  if (c.antislip === "yes") return IMG.antislipDetail;
  switch (c.wood) {
    case "untreated":
      return IMG.untreated;
    case "natural-oil":
      return IMG.naturalOil;
    case "chocolat":
      return IMG.chocolat;
    case "walnut":
      return IMG.walnut;
  }
}

export function getFoldawayThumbUrl(wood: WoodFinishId): string {
  const full = getFoldawayPreviewUrl({
    wood,
    height: "h210-234",
    width: "w50",
    side: "left",
    antislip: "no",
  });
  if (full.includes("uploads/")) {
    const base = full.replace(/\.jpg$/i, "");
    return `${base}-280x280.jpg`;
  }
  return full;
}
