import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      // Folosim fișierele direct din directorul curent
      appDirectory: ".",
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "root.tsx", () => {
            // Poți adăuga rute suplimentare aici dacă ai nevoie
          });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
