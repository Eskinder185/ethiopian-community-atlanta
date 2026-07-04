export const BACKGROUND_THEMES = [
  { value: "warm", labelEn: "Warm Cream", labelAm: "ሞቃት ክሬም", className: "bg-[#FAF7EF]" },
  { value: "soft_green", labelEn: "Soft Green", labelAm: "ለስላሳ አረንጓዴ", className: "bg-[#EEF7F2]" },
  { value: "white", labelEn: "Clean White", labelAm: "ንጹህ ነጭ", className: "bg-white" },
  {
    value: "deep_green",
    labelEn: "Deep Green",
    labelAm: "ጥልቅ አረንጓዴ",
    className: "bg-[#0B3D2E] text-ecaa-cream",
  },
  {
    value: "gold_accent",
    labelEn: "Gold Accent",
    labelAm: "የወርቅ አክሰንት",
    className: "bg-[#FFFDF7]",
  },
];

export const ACCENT_THEMES = [
  { value: "green", labelEn: "Green", labelAm: "አረንጓዴ", buttonClass: "bg-ecaa-green-800 hover:bg-ecaa-green-900 text-white" },
  {
    value: "gold",
    labelEn: "Gold",
    labelAm: "ወርቅ",
    buttonClass: "bg-[#8B6914] hover:bg-[#6F5410] text-white",
  },
  {
    value: "red",
    labelEn: "Red Accent",
    labelAm: "ቀይ አክሰንት",
    buttonClass: "bg-ecaa-red-700 hover:bg-ecaa-red-800 text-white",
  },
  {
    value: "neutral",
    labelEn: "Neutral",
    labelAm: "ገላጭ",
    buttonClass: "bg-slate-700 hover:bg-slate-800 text-white",
  },
];

export const LAYOUT_STYLES = [
  { value: "standard", labelEn: "Standard", labelAm: "መደበኛ" },
  { value: "card", labelEn: "Card Layout", labelAm: "የካርድ አቀማመጥ" },
  { value: "split_hero", labelEn: "Image + Form Split", labelAm: "ምስል + ቅጽ ተከፋፍሎ" },
  { value: "simple", labelEn: "Simple", labelAm: "ቀለል ያለ" },
];

export function getBackgroundTheme(value = "warm") {
  return BACKGROUND_THEMES.find((item) => item.value === value) || BACKGROUND_THEMES[0];
}

export function getAccentTheme(value = "green") {
  return ACCENT_THEMES.find((item) => item.value === value) || ACCENT_THEMES[0];
}

export function getLayoutStyle(value = "standard") {
  return LAYOUT_STYLES.find((item) => item.value === value) || LAYOUT_STYLES[0];
}

export function getFormCardClass(backgroundTheme) {
  if (backgroundTheme === "deep_green") {
    return "bg-ecaa-cream/98 text-ecaa-ink border-ecaa-cream/40";
  }
  return "bg-ecaa-white border-ecaa-border/80 text-ecaa-ink";
}
