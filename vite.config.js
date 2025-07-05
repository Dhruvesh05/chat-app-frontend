import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    global: "window",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "window",
      },
    },
  },
  base: "/",
});
