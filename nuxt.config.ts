// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  app: {
    head: {
      viewport: "width=device-width, initial-scale=1",
      title: "自種自售",
      meta: [
        { name: "description", content: "上架自家農產品的店商網頁(展示用)" },
        {
          name: "title",
          content: "自種自售"
        },
        {
          property: "og:title",
          content: "自種自售"
        },
        {
          property: "og:description",
          content: "上架自家農產品的店商網頁(展示用)"
        },
        {
          property: "og:url",
          content: `https://${process.env.NUXT_PUBLIC_FRONTEND_URL}`
        },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "zh_TW" },
        {
          property: "og:image",
          content: `https://${process.env.NUXT_PUBLIC_FRONTEND_URL}/og-image.jpg`
        },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    }
  },
  compatibilityDate: "2024-04-03",
  runtimeConfig: {
    public: {
      baseApiUrl: "",
      baseApiPath: "",
      baseApiNew: "",
      baseApiVersion: "",
      frontendUrl: "",
      baseEnv: ""
    }
  },
  devtools: { enabled: true },
  imports: {
    dirs: ["stores", "utils"]
  },
  typescript: {
    strict: true
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"]
      }
    ],
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt"
  ],
  vite: {
    define: {
      "process.env": process.env
    },
    plugins: []
  },
  devServer: {
    https: {
      key: "./https/localhost+3-key.pem",
      cert: "./https/localhost+3.pem"
    }
  }
});
