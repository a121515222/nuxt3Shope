// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
const isDev = process.env.NUXT_PUBLIC_BASE_ENV === 'dev'
export default defineNuxtConfig({
  app: {
    head: {
      viewport: "width=device-width, initial-scale=1",
      title: "自種自售",
      meta: [
        { name: "description", content: "上架自家農產品的店商網頁" },
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
          content: "上架自家農產品的店商網頁"
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
    "@vueuse/nuxt",
    [
      '@nuxtjs/sitemap',
      {
        siteUrl:isDev? "https://localhost:3000":`https://${process.env.NUXT_PUBLIC_FRONTEND_URL}` , // ← 你的網站網址（必要）
        trailingSlash: false, // 根據你是否使用結尾斜線調整
        // routes: async () => {
        //   // 靜態路由自動處理，你只需處理動態的
        //   return [
        //     '/product/abc',
        //     '/blog/123',
        //   ];
        // },
      }
    ]
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
