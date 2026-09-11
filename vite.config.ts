import { remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    remix({
      appDirectory: ".",
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "root.tsx");
        });
      },
    }),
  ],
});
