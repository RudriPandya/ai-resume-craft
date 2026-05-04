import { ColorScheme, FontSize } from "@/lib/resume-types";

export const accentHex = (c: ColorScheme): string => ({
  terracotta: "#c45a3a",
  ink: "#23201c",
  olive: "#5d6f3a",
  navy: "#2c3e60",
  plum: "#6b3a52",
}[c]);

export const sizeMap: Record<FontSize, { base: string; h1: string; h2: string; h3: string; small: string; line: string }> = {
  sm: { base: "10px", h1: "22px", h2: "13px", h3: "11px", small: "9px", line: "1.45" },
  md: { base: "11px", h1: "26px", h2: "14px", h3: "12px", small: "10px", line: "1.5" },
  lg: { base: "12px", h1: "30px", h2: "16px", h3: "13px", small: "11px", line: "1.55" },
};

export const formatDateRange = (start: string, end: string, current: boolean) => {
  const e = current ? "Present" : end;
  return [start, e].filter(Boolean).join(" — ");
};
