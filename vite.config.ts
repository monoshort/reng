import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Zet VITE_BASE_PATH=/jouw-repo/ voor GitHub Pages project sites. */
const base = process.env.VITE_BASE_PATH?.trim() || "/";
const normalizedBase =
  base === "/" ? "/" : base.startsWith("/") ? base : `/${base}`;
const baseWithSlash =
  normalizedBase === "/"
    ? "/"
    : normalizedBase.endsWith("/")
      ? normalizedBase
      : `${normalizedBase}/`;

export default defineConfig({
  base: baseWithSlash,
  plugins: [react()],
});
