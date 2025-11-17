import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { mochaPlugins } from "@getmocha/vite-plugins";

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [...mochaPlugins(process.env as any), react(), cloudflare()],
  server: {
    allowedHosts: true,
  },
  base: "/earth-seal/",

  build: {
    chunkSizeWarningLimit: 5000,
    // GitHub Pages can publish from /docs on main branch
    outDir: "docs",
    assetsDir: "assets",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
