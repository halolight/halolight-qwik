import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";
import { cloudflarePagesAdapter } from "@builder.io/qwik-city/adapters/cloudflare-pages/vite";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.cloudflare-pages.tsx", "@qwik-city-plan"],
      },
    },
    plugins: [
      cloudflarePagesAdapter({
        ssg: {
          include: ["/*"],
          origin: "https://halolight-qwik.h7ml.cn",
        },
      }),
    ],
  };
});
