// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  runtimeConfig: {
    public: {
      baseApiUrl: "",
      baseApiPath: "",
      baseApiNew: ""
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
    plugins: [],
    server: {
      proxy: {}
    }
  },
  devServer: {
    https: {
      key: "./https/localhost+3-key.pem",
      cert: "./https/localhost+3.pem"
    }
  }
});
